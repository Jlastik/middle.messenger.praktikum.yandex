import "./style.pcss";
import Block, { BlockPropsType } from "src/utils/block.ts";
import store from "../../utils/store.ts";
import { ChatType } from "../../utils/api.ts";

type MessagesHeaderProps = {
  avatar: string;
  name: string;
};

class ChatSettings extends Block {
  constructor(props: BlockPropsType) {
    super(props);
  }

  render() {
    return `<img class="messages_header_menu" src="/icons/menu-icon.svg" width="15" height="15" alt="menu" />`;
  }
}

export class MessagesHeader extends Block {
  constructor(props: BlockPropsType & MessagesHeaderProps) {
    const chatSettings = new ChatSettings({
      events: { click: () => this.handleClickMenu() },
    });
    super({
      ...props,
      chat: null,
      isMenuOpen: false,
      chatSettings: chatSettings,
    });

    store.subscribe((s) => {
      const chat = s.selectedChat as ChatType;
      this.setProps({
        chat: chat,
      });
    });
  }

  handleClickMenu() {
    store.dispatch({ type: "TOGGLE_CHAT_MENU" });
  }
  render() {
    return `
        <div class="messages_header">
          <div class="messages_header_name">
            <img 
              class="chat_avatar"
              src="{{#if this.chat.avatar}} this.chat.avatar {{else}} /img/no-image.png {{/if}}" 
              alt="avatar" 
            />
            <p>{{this.chat.title}}</p>
          </div>
          {{{chatSettings}}}
        </div>
    `;
  }
}
