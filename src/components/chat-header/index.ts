import "./style.pcss";
import Block, { BlockPropsType } from "src/utils/block.ts";
import { Router } from "../../utils/router.ts";
import Button from "../button";
import CloseBtn from "../close-btn";
import { AddGroupDialog } from "./add-group-dialog.ts";
import { logOut } from "../../utils/api.ts";

class Settings extends Block {
  addGroupDialog;
  constructor() {
    const closeBtn = new CloseBtn({
      events: {
        click: () => this.toggleMenu(),
      },
    });
    const settingsBtn = new Button({
      id: "settings_btn",
      type: "button",
      class: "light",
      label: `<img width="20" height="20" src="/icons/settings.svg"  alt="menu"/>`,
      events: {
        click: () => this.toggleMenu(),
      },
    });
    const logoutBtn = new Button({
      type: "button",
      class: "error",
      label: "Выйти",
      events: {
        click: () => this.handleLogout(),
      },
    });
    const createGroupBtn = new Button({
      id: "create_group_btn",
      type: "button",
      class: "outlined",
      label: "Создать группу",
      events: {
        click: () => this.createGroup(),
      },
    });
    const addGroupDialog = new AddGroupDialog({ isCreateGroupOpen: false });

    super({
      closeBtn: closeBtn,
      logoutBtn: logoutBtn,
      createGroupBtn: createGroupBtn,
      settingsBtn: settingsBtn,
      addGroupDialog: addGroupDialog,
      isOpen: false,
    });

    this.addGroupDialog = addGroupDialog;
  }

  toggleMenu() {
    this.setProps({ isOpen: !this.props.isOpen });
  }

  createGroup() {
    this.setProps({ isOpen: false });
    this.addGroupDialog.setProps({ isCreateGroupOpen: true });
  }

  async handleLogout() {
    const res = await logOut();
    if (res) {
      Router.getInstance("#app").go("/");
    }
  }

  render() {
    return `
      <div>
        {{{addGroupDialog}}}
        <div class="settings_menu{{#if this.isOpen}} open{{/if}}">
          <div class="settings_menu_container">
            {{{closeBtn}}}
            <div class="settings_menu_list">
              {{{createGroupBtn}}}
              <button class="outlined">Создать канал</button>
              {{{logoutBtn}}}
            </div>
          </div>
        </div>
        {{{settingsBtn}}}
      </div>
    `;
  }
}

class Profile extends Block {
  constructor(props: { userImage: string }) {
    super({
      ...props,
      events: { click: () => Router.getInstance("#app").go("/settings") },
    });
  }

  render() {
    return `
      <div id="chats_header_user" class="chats_header"> 
        <img class="user_avatar" src="{{this.userImage}}" alt="avatar" />
        <p>Андрей</p>
      </div>
    `;
  }
}

export class ChatHeader extends Block {
  constructor(props: BlockPropsType & { userImage: string }) {
    const settings = new Settings();
    const profile = new Profile({ userImage: props.userImage });
    super({
      ...props,
      settings: settings,
      profile: profile,
      events: {
        ...props.events,
      },
    });
  }

  render() {
    return `
        <div class="chats_header_container">
          {{{settings}}}
          {{{profile}}}
        </div>
      `;
  }
}
