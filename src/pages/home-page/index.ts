import "./home.pcss";
import Block, { BlockPropsType } from "src/utils/block.ts";
import { ChatHeader } from "src/components/chat-header";
import { SearchInputForm } from "src/components/search-input-form";
import { ChatItem } from "src/components/chat-item";
import { Message } from "src/components/message";
import { MessagesHeader } from "src/components/messages-header";
import { MessageInput } from "src/components/message-input";
import {
  ChatType,
  getChats,
  getChatToken,
  getChatUsers,
  getUser,
  MessageType,
  UserType,
} from "../../utils/api.ts";
import store from "../../utils/store.ts";
import { ChatMenu } from "../../components/chat-menu";
import { isArray } from "../../utils/utils.ts";

type HomePageProps = { chatList: ChatItem[]; messageList: Message[] };

class HomePage extends Block {
  messagesHeader;
  socket: null | WebSocket;
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
    const messagesHeader = new MessagesHeader();
    const messageInput = new MessageInput({ onSend: (v) => this.onSend(v) });

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
    this.socket = null;

    store.subscribe((s) => {
      const chat = s.selectedChat as ChatType;
      const user = s.user as UserType;
      const chats = s.chatList as ChatType[];

      const chatList = chats.map((el) => {
        let data = el;
        if (el.last_message) {
          data = {
            ...data,
            last_message: {
              ...data.last_message,
              time: new Date(data.last_message.time).toLocaleString(),
            },
          };
        }
        return new ChatItem({
          ...data,
          events: {
            click: async () => {
              const res = await getChatUsers({ id: el.id });
              if (res) {
                store.dispatch({ type: "SET_PARTICIPANT_LIST", payload: res });
              }
              const { token } = await getChatToken(el.id);
              store.dispatch({
                type: "SELECT_CHAT",
                payload: { ...el, token: token },
              });
            },
          },
        });
      });

      this.setProps({
        chatList: chatList,
      });
      if (chat && user) {
        this.socket = new WebSocket(
          `wss://ya-praktikum.tech/ws/chats/${user.id}/${chat.id}/${chat.token}`,
        );

        this.socket.addEventListener("open", () => {
          console.log("Соединение установлено");

          this.socket?.send(
            JSON.stringify({
              content: "0",
              type: "get old",
            }),
          );
        });

        this.socket.addEventListener("message", (e) => {
          console.log(e);
          if (e.type === "message") {
            try {
              const messages = JSON.parse(e.data);
              if (isArray(messages)) {
                const messagesComp = (messages as MessageType[]).map((mes) => {
                  return new Message({
                    text: mes.content,
                    date_send: new Date(mes.time).toLocaleString(),
                    is_right: false,
                  });
                });
                this.setProps({
                  messageList: messagesComp,
                });
              } else {
                this.setProps({
                  messageList: [
                    new Message({
                      text: messages.content,
                      date_send: new Date(messages.time).toLocaleString(),
                      is_right: false,
                    }),
                    ...this.lists.messageList,
                  ],
                });
              }
            } catch (e) {
              console.log(e);
            }
          }
        });
      }
    });
  }
  onSend(v: string) {
    this.socket?.send(
      JSON.stringify({
        content: v,
        type: "message",
      }),
    );
  }
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
      store.dispatch({ type: "SET_CHAT_LIST", payload: chats });
    }

    this.messagesHeader.setProps({
      avatar: currentUser.avatar,
      name: currentUser.first_name,
    });
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
