import "./profile.pcss";
import Block, { BlockPropsType } from "src/utils/block.ts";
import { ProfileAvatar } from "src/components/profile-avatar";
import { ProfileForm } from "src/components/profile-form";
import Button from "src/components/button";
import { ProfileBackBtn } from "../../components/profile-back-btn";
import store from "../../utils/store.ts";
import { getUser, logOut, UserType } from "../../utils/api.ts";
import { Router } from "../../utils/router.ts";

type ProfilePageProps = {
  name: string;
};

class ProfilePage extends Block {
  constructor(props: BlockPropsType & ProfilePageProps) {
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
        click: () => this.onChangeEditStatus(false),
      },
    });

    const backBtn = new ProfileBackBtn();

    const form = new ProfileForm({
      events: {
        submit: (e: Event) => this.onSubmit(e),
      },
    });

    super({
      avatar: avatar,
      changePwdBtn: changePwdBtn,
      exitBtn: exitBtn,
      saveBtn: saveBtn,
      form: form,
      isEdit: false,
      backBtn: backBtn,
      ...props,
    });
  }

  async handleLogout() {
    const res = await logOut();
    if (res) {
      Router.getInstance("#app").go("/");
    }
  }

  onChangeEditStatus(state: boolean) {
    this.setProps({
      isEdit: state,
    });
  }

  onSubmit(e: Event) {
    console.log(e);
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
                <div>Pass</div>
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
