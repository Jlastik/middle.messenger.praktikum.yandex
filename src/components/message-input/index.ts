import "./style.pcss";
import Block from "src/utils/block.ts";
import { Input } from "../input";

export class MessageInput extends Block {
  messageInput: Input;
  constructor() {
    const messageInput = new Input({
      id: "",
      name: "",
      placeholder: "Cообщение",
      class: "search_input",
      events: {
        change: (e) => this.onChange((e.target as HTMLInputElement).value),
      },
    });
    super({
      messageInput: messageInput,
      events: { submit: (e) => this.onSubmit(e) },
    });
    this.messageInput = messageInput;
  }

  onChange(value: string) {
    this.messageInput.setProps({
      value: value,
    });
  }
  onSubmit(e: Event) {
    e.preventDefault();
    const val = this.messageInput.props.value as string;
    const reg = /.*\S.*/;
    if (val && val.match(reg)) {
      console.log("Сообщение отправлено");
    } else {
      console.log("Сообщение не может быть пустым");
    }
  }

  render() {
    return `
        <form class="messages_controls">
          <img src="/img/attach-btn.png" alt="attach" />
          <label class="message_input">
            {{{ this.messageInput }}}
          </label>
          <img src="/icons/send-msg-btn.svg" alt="send-msg" />
        </form>
    `;
  }
}
