import "./home.pcss";
import Block, { BlockPropsType } from "src/utils/block.ts";
import { ChatHeader } from "src/components/chat-header";
import { SearchInputForm } from "src/components/search-input-form";
import { ChatItem } from "src/components/chat-item";
import { Message } from "src/components/message";
import { MessagesHeader } from "src/components/messages-header";
import { MessageInput } from "src/components/message-input";
import { CHAT_LIST, MESSAGE_LIST } from "./const.ts";

type HomePageProps = { chatList: ChatItem[]; messageList: Message[] };

class HomePage extends Block {
  constructor(props: BlockPropsType & HomePageProps) {
    const chatHeader = new ChatHeader({
      userImage: "/img/avatar.jpg",
    });
    const searchInput = new SearchInputForm();
    const messagesHeader = new MessagesHeader({
      avatar: "/img/avatar.jpg",
      name: "Ибрагим",
    });
    const messageInput = new MessageInput();

    super({
      chatHeader: chatHeader,
      searchInput: searchInput,
      messagesHeader: messagesHeader,
      messageInput: messageInput,
      ...props,
    });
  }

  ChatList = CHAT_LIST.map((el) => new ChatItem(el));
  MessageList = MESSAGE_LIST.map((el) => new Message(el));

  componentDidMount() {
    setTimeout(() => {
      this.setProps({
        chatList: this.ChatList,
        messageList: this.MessageList,
      });
    }, 1500);
  }

  render() {
    return `
        <main class="home_container">
          <section class="chats_container">
            {{{ chatHeader }}}
            {{{ searchInput }}}
            <div id="chat_list" class="chats_list_container">
              {{{ chatList }}}
            </div>
          </section>
          <section class="messages_container">
            {{{ messagesHeader }}}
            <div id="messages_container" class="messages_main">
                {{{ messageList }}}
            </div>
            {{{ messageInput }}}
          </section>
        </main>
      `;
  }
}

export default new HomePage({ chatList: [], messageList: [] });
