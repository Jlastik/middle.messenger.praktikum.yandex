import Block, { BlockPropsType } from "../../utils/block.ts";
import Button from "../button";
import { Input, InputGroup } from "../input";
import { createChat, getChats } from "../../utils/api.ts";
import store from "../../utils/store.ts";

export class AddGroupDialog extends Block {
  title;
  groupNameInputGroup;
  constructor(props: BlockPropsType) {
    const closeBtn = new Button({
      type: "button",
      class: "outlined",
      label: "Закрыть",
      events: {
        click: () => this.closeModal(),
      },
    });
    const submitBtn = new Button({
      type: "submit",
      class: "solid",
      label: "Создать",
      events: {
        click: (e) => this.createGroup(e),
      },
    });

    const groupNameInput = new Input({
      id: "title",
      name: "title",
      placeholder: "Название группы",
      events: {
        input: (e) => this.onChange((e.target as HTMLInputElement).value),
        blur: (e) => this.onBlur((e.target as HTMLInputElement).value),
      },
    });
    const groupNameInputGroup = new InputGroup({
      name: "title",
      label: "",
      error: false,
      errorText: "",
      input: groupNameInput,
    });

    super({
      closeBtn: closeBtn,
      submitBtn: submitBtn,
      groupNameInputGroup: groupNameInputGroup,
      isCreateGroupOpen: props.isCreateGroupOpen,
    });

    this.title = "";
    this.groupNameInputGroup = groupNameInputGroup;
  }

  closeModal() {
    this.setProps({ isCreateGroupOpen: false });
  }

  onChange(value: string) {
    this.title = value;
  }
  onBlur(value: string) {
    this.groupNameInputGroup.setProps({
      error: !value,
      errorText: value ? "" : "Поле не может быть пустым",
    });
  }

  async createGroup(e: Event) {
    e.preventDefault();

    if (!this.title) {
      this.groupNameInputGroup.setProps({
        error: true,
        errorText: "Поле не может быть пустым",
      });
      return;
    }

    const newChat = await createChat({ title: this.title });

    if (newChat?.id) {
      this.setProps({ isCreateGroupOpen: false });
      const chats = await getChats();
      if (chats) {
        store.dispatch({ type: "SET_CHAT_LIST", payload: chats });
      }
    }
  }

  render() {
    return `
      <div class="add_group_wrapper{{#if isCreateGroupOpen}} create_open{{/if}}">
        <form class="add_group_container">
        <input id="test">
          <p class="dialog_title">Создание новой группы</p>
          {{{groupNameInputGroup}}}
          {{{submitBtn}}}
          {{{closeBtn}}}
        </form>
      </div>
    `;
  }
}
