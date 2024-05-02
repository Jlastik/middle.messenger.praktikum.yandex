import "./profile.pcss";
import Block, { BlockPropsType } from "src/utils/block.ts";
import { ProfileAvatar } from "src/components/profile-avatar";
import { ProfileForm } from "src/components/profile-form";
import Button from "src/components/button";
import { ProfileBackBtn } from "../../components/profile-back-btn";
import store from "../../utils/store.ts";
import {
  changeUserPassword,
  getUser,
  logOut,
  UserType,
} from "../../utils/api.ts";
import { Router } from "../../utils/router.ts";
import { Input, InputGroup } from "../../components/input";

class ProfilePage extends Block {
  oldPassword;
  newPassword;
  newPwdGroup;

  constructor(props: BlockPropsType) {
    const avatar = new ProfileAvatar();
    const changePwdBtn = new Button({
      id: "",
      type: "button",
      class: "outlined",
      label: "Изменить пароль",
      events: {
        click: () => this.onChangeEditStatus(true),
      },
    });
    const exitBtn = new Button({
      id: "profile_exit_btn",
      type: "button",
      class: "error",
      label: "Выйти",
      events: {
        click: () => this.handleLogout(),
      },
    });
    const saveBtn = new Button({
      id: "profile_save_btn",
      type: "submit",
      class: "solid",
      label: "Сохранить",
      events: {
        click: () => this.changePwd(),
      },
    });
    const oldPwd = new Input({
      name: "oldPassword",
      placeholder: "Текущий пароль",
      class: "",
      events: {
        input: (e) => (this.oldPassword = (e.target as HTMLInputElement).value),
      },
    });
    const oldPwdGroup = new InputGroup({
      name: "oldPassword",
      label: "",
      error: false,
      errorText: "",
      input: oldPwd,
    });
    const newPwd = new Input({
      name: "newPassword",
      placeholder: "Новый пароль",
      events: {
        input: (e) => (this.newPassword = (e.target as HTMLInputElement).value),
      },
    });
    const newPwdGroup = new InputGroup({
      name: "newPassword",
      label: "",
      error: false,
      errorText: "",
      input: newPwd,
    });
    const backBtn = new ProfileBackBtn();
    const form = new ProfileForm();

    super({
      avatar: avatar,
      changePwdBtn: changePwdBtn,
      exitBtn: exitBtn,
      saveBtn: saveBtn,
      form: form,
      isEdit: false,
      backBtn: backBtn,
      oldPwd: oldPwdGroup,
      newPwd: newPwdGroup,
      ...props,
    });

    store.subscribe((s) => {
      const user = s.user as UserType | null;
      if (user) {
        this.setProps({
          name: user.first_name,
        });
      }
    });

    this.oldPassword = "";
    this.newPassword = "";
    this.newPwdGroup = newPwdGroup;
  }

  async handleLogout() {
    const res = await logOut();
    if (res) {
      Router.getInstance("#app").go("/");
    }
  }

  async changePwd() {
    const res = await changeUserPassword({
      oldPassword: this.oldPassword,
      newPassword: this.newPassword,
    });
    if (typeof res === "string") {
      this.newPwdGroup.setProps({
        error: false,
        errorText: "",
      });
      this.onChangeEditStatus(false);
    } else if (res && res.reason) {
      this.newPwdGroup.setProps({
        error: true,
        errorText: res.reason,
      });
    }
  }
  onChangeEditStatus(state: boolean) {
    this.setProps({
      isEdit: state,
    });
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
  }

  render() {
    return `
        <main class="profile_container">
          {{{ this.backBtn }}}
          <section class="profile_content_container">
            <div class="profile_content">
              {{{ avatar }}}
              <p class="profile_name">{{this.name}}</p>
              {{#if this.isEdit}}
                <div>
                  {{{oldPwd}}}
                  {{{newPwd}}}
                </div>
              {{else}}
                {{{ form }}}
              {{/if}}   
              <div id="profile_controllers" class="profile_controllers">
                {{#if this.isEdit}}
                    {{{ this.editBtn }}}
                    {{{ this.saveBtn }}}
                {{else}}
                    {{{ this.changePwdBtn }}}
                    {{{ this.exitBtn }}}
                {{/if}}       
              </div>
            </div>
          </section>
        </main>
    `;
  }
}

export default new ProfilePage({ name: "Андрей" });
