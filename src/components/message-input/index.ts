import "./style.pcss";
import Block from "src/utils/block.ts";
import { Input } from "../input";

export class MessageInput extends Block {
  messageInput: Input;
  onSend;
  value;
  constructor({ onSend }: { onSend: (v: string) => void }) {
    const messageInput = new Input({
      id: "",
      name: "",
      placeholder: "Cообщение",
      class: "search_input",
      events: {
        input: (e) => this.onChange((e.target as HTMLInputElement).value),
      },
    });
    super({
      messageInput: messageInput,
      events: { submit: (e) => this.onSubmit(e) },
    });
    this.messageInput = messageInput;
    this.onSend = onSend;
    this.value = "";
  }

  onChange(value: string) {
    // this.value = value;
    (this.messageInput.getContent() as HTMLInputElement).value = value;
  }
  onSubmit(e: Event) {
    e.preventDefault();
    const val = (this.messageInput.getContent() as HTMLInputElement).value;
    const reg = /.*\S.*/;
    if (val && val.match(reg)) {
      this.onSend(val);
      (this.messageInput.getContent() as HTMLInputElement).value = "";
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
