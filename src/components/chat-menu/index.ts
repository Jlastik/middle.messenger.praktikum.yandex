import "./style.pcss";
import Block from "../../utils/block.ts";
import store from "../../utils/store.ts";
import { SearchInputForm } from "../search-input-form";
import {
  addUsersToChat,
  ChatType,
  deleteUserFromChat,
  getChatUsers,
  searchUser,
  UserType,
} from "../../utils/api.ts";

export class User extends Block {
  constructor(props: { user: UserType; isParticipant: boolean }) {
    super({
      user: props.user,
      isParticipant: props.isParticipant,
      events: {
        click: () => {
          if (props.isParticipant) {
            this.deleteUser();
          } else {
            this.addUser();
          }
        },
      },
    });
  }

  addUser() {
    const chat = store.getState().selectedChat as ChatType;
    const user = this.props.user as UserType;
    if (chat && user) {
      addUsersToChat({ users: [user.id], chatId: chat.id }).then(async () => {
        const res = await getChatUsers({ id: chat.id });
        if (res) {
          store.dispatch({ type: "SET_PARTICIPANT_LIST", payload: res });
        }
      });
    }
  }

  deleteUser() {
    const chat = store.getState().selectedChat as ChatType;
    const user = this.props.user as UserType;
    if (chat && user) {
      deleteUserFromChat({ users: [user.id], chatId: chat.id }).then(
        async () => {
          const res = await getChatUsers({ id: chat.id });
          if (res) {
            store.dispatch({ type: "SET_PARTICIPANT_LIST", payload: res });
          }
        },
      );
    }
  }

  render() {
    return `
        <div class="user_item">
            <img
              class="user_item_avatar" 
              src="{{#if this.avatar}}https://ya-praktikum.tech/api/v2/resources{{this.user.avatar}} {{else}} /img/no-image.png {{/if}}" 
              alt="avatar" 
            />
            <div class="user_item_info">
              <p>{{this.user.first_name}} {{this.user.second_name}}</p>
              <p>{{this.user.login}}</p>
            </div>
            {{#if this.isParticipant}}
            <svg class="user_item_delete_icon" width="25px" height="25px" viewBox="0 0 24 24">
                <path
                  d="M6 12L18 12"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
            </svg>
            {{else}}
            <svg class="user_item_add_icon" width="25px" height="25px" viewBox="0 0 24 24">
                <path 
                    d="M6 12H12M12 12H18M12 12V18M12 12V6" 
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
            </svg>
            {{/if}}
        </div>
    `;
  }
}

export class TabSearch extends Block {
  constructor() {
    super({
      isActive: false,
      events: { click: () => store.dispatch({ type: "SET_MENU_SEARCH" }) },
    });
    store.subscribe((s) => {
      this.setProps({ isMenuSearch: s.isMenuSearch });
    });
  }
  render() {
    return `<p class="{{#if this.isMenuSearch}}active{{/if}}">Поиск</p>`;
  }
}

export class TabList extends Block {
  constructor() {
    super({
      isActive: true,
      events: {
        click: async () => {
          store.dispatch({ type: "SET_MENU_LIST" });
        },
      },
    });
    store.subscribe((s) => {
      this.setProps({ isMenuSearch: s.isMenuSearch });
    });
  }

  render() {
    return `<p class="{{#unless this.isMenuSearch}}active{{/unless}}">Участники</p>`;
  }
}

export class ChatMenu extends Block {
  searchTab;
  listTab;
  constructor() {
    const searchInput = new SearchInputForm({
      handleChange: (v) => {
        console.log(v);
      },
      handleSubmit: async (v) => this.handleSearchUsers(v),
    });

    const searchTab = new TabSearch();
    const listTab = new TabList();

    super({
      isOpen: false,
      searchInput: searchInput,
      participantList: [],
      searchRes: [],
      isMenuSearch: false,
      searchTab: searchTab,
      listTab: listTab,
    });

    store.subscribe((s) => {
      const participants = s.participants as UserType[];
      const participIds = participants.map((el) => el.id);
      const searchList = (s.searchList as UserType[]).filter((el) => {
        return !participIds.includes(el.id);
      });
      this.setProps({
        isOpen: s.isChatMenuOpen,
        isMenuSearch: s.isMenuSearch,
      });
      this.setProps({
        participantList: participants.map(
          (el) => new User({ user: el, isParticipant: true }),
        ),
        searchRes: searchList.map(
          (el) => new User({ user: el, isParticipant: false }),
        ),
      });
    });

    this.searchTab = searchTab;
    this.listTab = listTab;
  }

  async handleSearchUsers(v: string) {
    const res = await searchUser({ login: v });
    if (res) {
      store.dispatch({ type: "SET_SEARCH_LIST", payload: res });
    }
  }

  render() {
    return `
        <section class="chat_menu_container{{#if this.isOpen}} open{{/if}}">
            <div class="chat_menu_tabs">
              {{{this.listTab}}}
              {{{this.searchTab}}}
            </div>
            {{#if isMenuSearch}}
              <div class="search_tab">
                {{{searchInput}}}
                <div class="users_search_result_container">
                {{{searchRes}}}
                </div>
              </div>
            {{/if}}
            {{#unless isMenuSearch}}
              <div class="user_list_tab">
                {{{participantList}}}
              </div>
            {{/unless}}
        </section>
    `;
  }
}
