import { EventBus } from "./event-bus.ts";
import Handlebars from "handlebars";

interface IBlock {}

export type BlockPropsType = {
  events?: Record<string, (e: Event) => void>;
} & Record<string, unknown>;

class Block implements IBlock {
  props: BlockPropsType;
  children: Record<string, Block>;
  eventBus: () => EventBus;

  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_UPDATE: "flow:component-did-update",
    FLOW_RENDER: "flow:render",
  };

  _element: HTMLElement | null = null;
  _id = Math.floor(100000 + Math.random() * 900000);

  constructor(propsWithChildren: BlockPropsType = {}) {
    const eventBus = new EventBus();
    const { props, children } =
      this._getChildrenPropsAndProps(propsWithChildren);

    this.children = children;
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
    const children: Record<string, Block> = {};
    const props: BlockPropsType = {};
    // const lists = {};

    Object.entries(propsWithChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
        // } else if (Array.isArray(value)) {
        //   lists[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { children, props };
  }

  dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  _componentDidUpdate(
    oldProps: Record<string, unknown>,
    newProps: Record<string, unknown>,
  ) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (response) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  // Может переопределять пользователь, необязательно трогать
  componentDidUpdate(
    oldProps: Record<string, unknown>,
    newProps: Record<string, unknown>,
  ) {
    console.log("componentDidUpdate: ", oldProps, newProps);
    return true;
  }

  setProps = (nextProps: Record<string, unknown>) => {
    if (!nextProps) {
      return;
    }
    Object.assign(this.props, nextProps);
  };

  get element() {
    return this._element;
  }

  _render() {
    const props = { ...this.props };
    const stubs: Record<string, string> = {};

    // Object.entries(this.lists).forEach(([key, child]) => {
    //   console.log(`${child._id}`);
    //   props[key] = `<div data-id="__l_${_tmpId}"></div>`;
    // });

    //Создание в текущем компоненте заглушки для рендера дочерних компонентов
    Object.entries(this.children).forEach(([key, child]) => {
      stubs[key] = `<div data-id="${child._id}"></div>`;
    });

    //Создаем заглушку компонента и формируем с помощью шаблонизатора html
    const fragment = this._createDocumentElement(
      "template",
    ) as HTMLTemplateElement;
    fragment.innerHTML = Handlebars.compile(this.render())({
      ...props,
      ...stubs,
    });

    console.log("Fragment HTML: ", fragment.innerHTML);

    Object.values(this.children).forEach((child) => {
      //Получаем элемент из заглушки
      const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
      //Достаем содержимое дочернего элемента и меняем заглушку на него
      const childHtml = child.getContent();
      childHtml && stub && stub.replaceWith(childHtml);
    });

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

  show() {
    const el = this.getContent();
    if (el) {
      el.style.display = "block";
    }
  }

  hide() {
    const el = this.getContent();
    if (el) {
      el.style.display = "none";
    }
  }
}

export default Block;
