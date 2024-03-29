import "./style.pcss";
import Block, { BlockPropsType } from "src/utils/block.ts";

type MessageProps = {
  text: string;
  date_send: string;
  is_right: boolean;
};
export class Message extends Block {
  constructor(props: BlockPropsType & MessageProps) {
    super(props);
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
