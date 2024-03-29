import Block from "src/utils/block.ts";

export class Message extends Block {
  constructor() {
    super();
  }

  render() {
    return `
        <div class="message {{#if this.is_right}}message_right{{/if}} ">
            <p class="message_text">{{this.text}}</p>
            <p class="message_time">{{this.date_send}}</p>
        </div>
      `;
  }
}
