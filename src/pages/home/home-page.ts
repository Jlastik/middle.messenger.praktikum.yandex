import "./home.css";
import { ChatList } from "src/components/chat-item";
import { MessageList } from "../../components/message";
import { CHAT_LIST, MESSAGE_LIST } from "./const.ts";

const chatListContainer = document.getElementById("chat_list");
if (chatListContainer) {
  chatListContainer.innerHTML = ChatList(CHAT_LIST);
}

const messagesListContainer = document.getElementById("messages_container");

if (messagesListContainer) {
  messagesListContainer.innerHTML = MessageList(MESSAGE_LIST);
}

const chatsHeaderUser = document.getElementById("chats_header_user");
if (chatsHeaderUser) {
  chatsHeaderUser.addEventListener("click", () =>
    window.open("/profile", "_self"),
  );
}
