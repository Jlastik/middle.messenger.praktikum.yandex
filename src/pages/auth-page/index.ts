import Block, { BlockPropsType } from "../../utils/block.ts";
import "./auth-page.pcss";
import Button from "src/components/button";
import AuthForm from "src/components/auth-form";

const AuthBtn = new Button({
  id: "auth_btn",
  type: "submit",
  class: "solid",
  label: "Войти",
});

const NoAccBtn = new Button({
  id: "no_acc_btn",
  type: "button",
  class: "outlined",
  label: "Нет аккаунта?",
});

const Form = new AuthForm({
  authBtn: AuthBtn,
  noAccBtn: NoAccBtn,
});

class AuthPage extends Block {
  constructor(props: BlockPropsType) {
    super(props);
  }
  render() {
    return `
        <div class="auth_wrapper">
            <div id="auth_form_container">{{{ form }}}</div>
        </div>
    `;
  }
}

export default new AuthPage({
  form: Form,
});
