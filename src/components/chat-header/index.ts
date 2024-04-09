import "./style.pcss";
import Block, { BlockPropsType } from "src/utils/block.ts";

export class ChatHeader extends Block {
  constructor(props: BlockPropsType & { userImage: string }) {
    super({
      ...props,
      events: {
        ...props.events,
        click: () => window.open("/profile", "_self"),
      },
    });
  }

  render() {
    return `
        <div id="chats_header_user" class="chats_header">
          <img class="user_avatar" src="{{this.userImage}}" alt="avatar" />
          <p>Андрей</p>
        </div>
      `;
  }
}
