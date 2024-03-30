import "./style.pcss";
import Block, { BlockPropsType } from "src/utils/block.ts";

type MessagesHeaderProps = {
  avatar: string;
  name: string;
};
export class MessagesHeader extends Block {
  constructor(props: BlockPropsType & MessagesHeaderProps) {
    super(props);
  }

  render() {
    return `
        <div class="messages_header">
          <div class="messages_header_name">
            <img class="chat_avatar" src="{{this.avatar}}" alt="avatar" />
            <p>{{this.name}}</p>
          </div>
          <div class="messages_header_menu">
            <img src="/icons/menu-icon.svg" width="15" height="15" alt="menu" />
          </div>
        </div>
    `;
  }
}
