import "./profile.pcss";
import Block, { BlockPropsType } from "src/utils/block.ts";
import { ProfileAvatar } from "src/components/profile-avatar";
import { ProfileForm } from "src/components/profile-form";
import Button from "src/components/button";

type ProfilePageProps = {
  name: string;
};

class ProfilePage extends Block {
  name: string;
  form: ProfileForm;

  editBtn;
  changePwdBtn;
  exitBtn;
  saveBtn;

  isEdit: boolean;

  constructor(props: BlockPropsType & ProfilePageProps) {
    const avatar = new ProfileAvatar();
    const editBtn = new Button({
      id: "profile_edit_btn",
      type: "button",
      class: "solid",
      label: "Редактировать",
    });
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
    const form = new ProfileForm({
      events: {
        submit: (e: Event) => this.onSubmit(e),
      },
    });

    super({
      avatar: avatar,
      editBtn: editBtn,
      changePwdBtn: changePwdBtn,
      exitBtn: exitBtn,
      saveBtn: saveBtn,
      form: form,
      isEdit: false,
      ...props,
    });

    this.name = props.name;
    this.form = form;
    this.editBtn = editBtn;
    this.changePwdBtn = changePwdBtn;
    this.exitBtn = exitBtn;
    this.saveBtn = saveBtn;
    this.isEdit = false;
  }

  onChangeEditStatus(state: boolean) {
    console.log(state);
    console.log(this.props);
    this.setProps({
      isEdit: state,
    });
  }

  onSubmit(e: Event) {
    console.log(e);
  }

  render() {
    return `
        <main class="profile_container">
          <section id="profile_back_container" class="profile_back_container">
            <img src="/img/back-btn.png" alt="back" />
          </section>
          <section class="profile_content_container">
            <div class="profile_content">
              {{{ avatar }}}
              <p class="profile_name">{{this.name}}</p>
              {{{ form }}}
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
