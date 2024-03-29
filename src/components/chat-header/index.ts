import Block from "src/utils/block.ts";

export class ChatHeader extends Block {
  constructor() {
    super();
  }

  render() {
    return `
        <div id="chats_header_user" class="chats_header">
          <img class="user_avatar" src="/img/avatar.jpg" alt="avatar" />
          <p>Андрей</p>
        </div>
      `;
  }
}
