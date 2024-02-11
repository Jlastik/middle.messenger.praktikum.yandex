import chatListTmpl from "./chat-item.hbs?raw";
import Handlebars from "handlebars";
import "./chat-item.css";

type ChatType = {
  avatar: string;
  first_name: string;
  date_send: string;
  message: string;
  unread_count: number;
};

export const ChatList = (chatList: ChatType[]) => {
  return Handlebars.compile(chatListTmpl)({ chatList: chatList });
};
