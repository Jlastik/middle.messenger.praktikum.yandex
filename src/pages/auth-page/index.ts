import "./auth-page.pcss";
import Block from "src/utils/block.ts";
import Button from "src/components/button";
import AuthForm from "src/components/auth-form";
import { Input, InputGroup } from "src/components/input";

class AuthPage extends Block {
  log: Input;
  pass: Input;
  form: AuthForm;

  constructor() {
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
      events: {
        click: () => window.open("/registration", "_self"),
      },
    });
    const loginInput = new Input({
      id: "login",
      name: "login",
      placeholder: "kulebyaka",
      events: {
        change: (e) => this.onChange(e, "login"),
      },
    });
    const passInput = new Input({
      id: "password",
      name: "password",
      placeholder: "******",
      events: {
        change: (e) => this.onChange(e, "password"),
      },
    });
    const loginInputGroup = new InputGroup({
      name: "login",
      label: "Логин",
      error: false,
      errorText: "",
      input: loginInput,
    });
    const passInputGroup = new InputGroup({
      name: "password",
      label: "Пароль",
      error: false,
      errorText: "",
      input: passInput,
    });
    const form = new AuthForm({
      formId: "auth_form",
      formLabel: "Авторизация",
      inputs: [loginInputGroup, passInputGroup],
      buttons: [AuthBtn, NoAccBtn],
      formState: {},
      events: {
        submit: (e) => this.onSubmit(e),
      },
    });

    super({ form });

    this.log = loginInput;
    this.pass = passInput;
    this.form = form;
  }

  onSubmit(e: Event) {
    e.preventDefault();

    console.log(this.form.props.login);
    let hasError = false;

    const form = e.target as HTMLFormElement;
    if (form) {
      const data = new FormData(form);
      for (const [name, value] of data) {
        if (name === "login") {
          if (!value) {
            hasError = true;
            this.log.setProps({
              error: true,
              errorText: "Логин не может быть пустым",
            });
          } else {
            this.log.setProps({
              error: false,
              errorText: "",
            });
          }
        }
        if (name === "password" && !value) {
          if (!value) {
            hasError = true;
            this.pass.setProps({
              error: true,
              errorText: "Пароль не может быть пустым",
            });
          } else {
            this.pass.setProps({
              error: false,
              errorText: "",
            });
          }
        }
      }

      !hasError && window.open("/home", "_self");
    }
  }

  onChange(e: Event, name: string) {
    const input = e.target as HTMLInputElement;
    this.form.setProps({ [name]: input.value });
  }
  render() {
    return `
        <div class="auth_wrapper">
            <div id="auth_form_container">{{{ form }}}</div>
        </div>
    `;
  }
}

export default new AuthPage();
