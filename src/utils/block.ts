import { EventBus } from "./event-bus.ts";
import Handlebars from "handlebars";
import { deepCompare } from "./utils.ts";

export type EventType = Record<string, (e: Event) => void>;
export type BlockPropsType = {
  [x: string]: unknown;
  events?: EventType;
};

abstract class Block {
  props;
  lists;
  children;
  eventBus: () => EventBus;

  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_UPDATE: "flow:component-did-update",
    FLOW_RENDER: "flow:render",
  };

  _element: HTMLElement | null = null;
  _id = Math.floor(100000 + Math.random() * 900000);

  protected constructor(propsWithChildren: BlockPropsType = {}) {
    const eventBus = new EventBus();
    const { props, children, lists } =
      this._getChildrenPropsAndProps(propsWithChildren);
    this.children = children;
    this.lists = lists;
    this.props = this._makePropsProxy({ ...props });
    this.eventBus = () => eventBus;
    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  _addEvents() {
    const { events = {} } = this.props;
    Object.keys(events).forEach((eventName) => {
      if (this._element) {
        this._element.addEventListener(eventName, events[eventName]);
      }
    });
  }

  _removeEvents() {
    const { events = {} } = this.props;

    if (typeof events === "object" && events !== null) {
      Object.entries(events).forEach(([key, value]) => {
        if (this._element) {
          this._element.removeEventListener(key, value);
        }
      });
    }
  }

  _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    eventBus.on(Block.EVENTS.FLOW_UPDATE, this._componentDidUpdate.bind(this));
  }

  init() {
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  _componentDidMount() {
    this.componentDidMount();
  }

  componentDidMount() {}

  _getChildrenPropsAndProps(propsWithChildren: BlockPropsType) {
    const children: { [x: string]: Block } = {};
    const props: BlockPropsType = {};
    const lists: { [x: string]: Block[] } = {};

    Object.entries(propsWithChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else if (Array.isArray(value)) {
        lists[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { children, props, lists };
  }

  dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  _componentDidUpdate(
    oldProps: Record<string, unknown>,
    newProps: Record<string, unknown>,
  ) {
    const response = this.__componentDidUpdate(oldProps, newProps);
    if (response) {
      this.componentDidUpdate();
      const { props, children, lists } = this._getChildrenPropsAndProps({
        ...this.props,
        ...this.lists,
        ...this.children,
        ...newProps,
      });
      this.props = this._makePropsProxy({ ...props });
      this.children = children;
      this.lists = lists;
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  // Может переопределять пользователь, необязательно трогать
  __componentDidUpdate(oldProps: BlockPropsType, newProps: BlockPropsType) {
    return !deepCompare(oldProps, newProps);
  }

  componentDidUpdate() {}

  setProps = (nextProps: BlockPropsType) => {
    if (!nextProps) {
      return;
    }
    Object.assign(this.props, nextProps);
  };

  get element() {
    return this._element;
  }

  _createStubsInComponent(id: number) {
    const stubs: Record<string, string> = {};

    Object.entries(this.lists).forEach(([key]) => {
      stubs[key] = `<div data-id="__l_${id}"></div>`;
    });
    Object.entries(this.children).forEach(([key, child]) => {
      stubs[key] = `<div data-id="${(child as Block)._id}"></div>`;
    });

    return stubs;
  }
  _replaceStubs(fragment: HTMLTemplateElement, id: number) {
    //Заменяем заглушки на html
    Object.values(this.children).forEach((child) => {
      //Получаем элемент из заглушки
      const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
      //Достаем содержимое дочернего элемента и меняем заглушку на него
      const childHtml = child.getContent();
      childHtml && stub && stub.replaceWith(childHtml);
    });

    //Заменяем заглушки списков отрендереными компонентами
    Object.entries(this.lists).forEach((item) => {
      const listCont = this._createDocumentElement(
        "template",
      ) as HTMLTemplateElement;

      item[1].forEach((listItem) => {
        if (listItem instanceof Block) {
          const el = listItem.getContent();
          el && listCont.content.append(el);
        } else {
          listCont.content.append(`${listItem}`);
        }
      });
      const stub = fragment.content.querySelector(`[data-id="__l_${id}"]`);
      stub && stub.replaceWith(listCont.content);
    });
  }
  _render() {
    const props = { ...this.props };
    const _tmpId = Math.floor(100000 + Math.random() * 900000);
    const stubs = this._createStubsInComponent(_tmpId);

    this._removeEvents();

    //Создаем фрагмент компонента с заглушками и формируем с помощью шаблонизатора
    const fragment = this._createDocumentElement(
      "template",
    ) as HTMLTemplateElement;
    fragment.innerHTML = Handlebars.compile(this.render())({
      ...props,
      ...stubs,
    });

    this._replaceStubs(fragment, _tmpId);

    //Получаем весь компонент
    const newElement = fragment.content.firstElementChild as HTMLElement;
    if (this._element && newElement) {
      this._element.replaceWith(newElement);
    }
    this._element = newElement;
    //Добавляем обработчики
    this._addEvents();
  }

  render() {}

  getContent() {
    return this.element;
  }

  _makePropsProxy(props: BlockPropsType) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;
    return new Proxy(props, {
      get(target, prop) {
        const value = target[prop as string];
        return typeof value === "function" ? value.bind(target) : value;
      },
      set(target, prop, value) {
        const oldProps = { ...target };
        target[prop as string] = value;
        self.eventBus().emit(Block.EVENTS.FLOW_UPDATE, oldProps, target);
        return true;
      },
      deleteProperty() {
        throw new Error("No access");
      },
    });
  }

  _createDocumentElement(tagName: string) {
    // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
    return document.createElement(tagName);
  }
}

export default Block;
