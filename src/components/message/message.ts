import messageListTmpl from "./message.hbs?raw";
import Handlebars from "handlebars";
import "./message.css";

type MessageType = {
  text: string;
  date_send: string;
  is_right: boolean;
};

export const MessageList = (messageList: MessageType[]) => {
  return Handlebars.compile(messageListTmpl)({ messageList: messageList });
};
