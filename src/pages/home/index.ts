import "./home.pcss";
import Block from "src/utils/block.ts";

class HomePage extends Block {
  constructor() {
    super();
  }

  render() {
    return `
        <main class="home_container">
          <section class="chats_container">
            <div id="chats_header_user" class="chats_header">
              <img class="user_avatar" src="/img/avatar.jpg" alt="avatar" />
              <p>Андрей</p>
            </div>
            <form class="search_input_container">
              <label><input class="search_input" placeholder="Поиск" /></label>
              <img src="/icons/search-icon.svg" alt="My Happy SVG" />
            </form>
            <div id="chat_list" class="chats_list_container"></div>
          </section>
          <section class="messages_container">
            <div class="messages_header">
              <div class="messages_header_name">
                <img class="chat_avatar" src="/img/avatar.jpg" alt="avatar" />
                <p>Станислав</p>
              </div>
              <div class="messages_header_menu">
                <img src="/icons/menu-icon.svg" width="15" height="15" alt="menu" />
              </div>
            </div>
    
            <div id="messages_container" class="messages_main"></div>
    
            <form class="messages_controls">
              <img src="/img/attach-btn.png" alt="attach" />
              <label class="message_input">
                <input placeholder="Сообщение" />
              </label>
              <img src="/icons/send-msg-btn.svg" alt="send-msg" />
            </form>
          </section>
        </main>
      `;
  }
}

export default new HomePage();
