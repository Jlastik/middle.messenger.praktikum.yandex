import "./home.pcss";
import Block, { BlockPropsType } from "src/utils/block.ts";
import { ChatHeader } from "src/components/chat-header";
import { SearchInputForm } from "src/components/search-input-form";
import { ChatItem } from "src/components/chat-item";
import { Message } from "src/components/message";
import { MessagesHeader } from "src/components/messages-header";
import { MessageInput } from "src/components/message-input";
import { MESSAGE_LIST } from "./const.ts";
import { getChats, getChatToken, getUser, UserType } from "../../utils/api.ts";
import store from "../../utils/store.ts";
import { ChatMenu } from "../../components/chat-menu";

type HomePageProps = { chatList: ChatItem[]; messageList: Message[] };

class HomePage extends Block {
  messagesHeader;
  constructor(props: BlockPropsType & HomePageProps) {
    const chatHeader = new ChatHeader({
      userImage: "/img/avatar.jpg",
    });
    const searchInput = new SearchInputForm({
      handleChange: (v) => {
        console.log(v);
      },
      handleSubmit: (v) => {
        console.log(v);
      },
    });
    const messagesHeader = new MessagesHeader({
      avatar: "/img/avatar.jpg",
      name: "Ибрагим",
    });
    const messageInput = new MessageInput();

    const chatMenu = new ChatMenu();
    super({
      chatHeader: chatHeader,
      searchInput: searchInput,
      messagesHeader: messagesHeader,
      messageInput: messageInput,
      chatMenu: chatMenu,
      ...props,
    });

    this.messagesHeader = messagesHeader;
  }

  MessageList = MESSAGE_LIST.map((el) => new Message(el));

  async componentDidMount() {
    let currentUser = store.getState().user as UserType;

    if (!currentUser) {
      const user = await getUser();
      if (user) {
        currentUser = user;
        store.dispatch({
          type: "SET_USER",
          payload: user,
        });
      }
    }
    const chats = await getChats();
    if (chats) {
      const chatList = chats.map(
        (el) =>
          new ChatItem({
            ...el,
            events: {
              click: async () => {
                const { token } = await getChatToken(el.id);
                store.dispatch({
                  type: "SELECT_CHAT",
                  payload: { ...el, token: token },
                });
              },
            },
          }),
      );

      this.setProps({
        chatList: chatList,
        // messageList: this.MessageList,
      });
    }

    this.messagesHeader.setProps({
      avatar: currentUser.avatar,
      name: currentUser.first_name,
    });
  }

  componentDidUpdate() {
    console.log(this.props);
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
          {{{chatMenu}}}
        </main>
      `;
  }
}

export default new HomePage({ chatList: [], messageList: [] });
