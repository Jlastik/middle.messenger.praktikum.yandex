import "./auth-page.pcss";
import Block from "src/utils/block.ts";
import Button from "src/components/button";
import AuthForm, { FormProps } from "src/components/auth-form";
import { Input, InputGroup } from "src/components/input";
import { Router } from "../../utils/router.ts";
import { signIn } from "../../utils/api.ts";

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
        click: () => Router.getInstance("#app").go("/sign-up"),
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
      class: "auth_form",
      inputs: [loginInputGroup, passInputGroup],
      buttons: [AuthBtn, NoAccBtn],
      formState: {
        login: "",
        password: "",
      },
      events: {
        submit: (e) => this.onSubmit(e),
      },
    });

    super({ form });

    this.log = loginInputGroup;
    this.pass = passInputGroup;
    this.form = form;
  }

  onSubmit(e: Event) {
    e.preventDefault();
    let hasError = false;
    const data = (this.form.props as FormProps).formState;

    Object.entries(data).forEach(([name, value]) => {
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
      if (name === "password") {
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
    });

    if (!hasError) {
      signIn({
        login: data.login,
        password: data.password,
      }).then((r) => {
        if (r) {
          Router.getInstance("#app").go("/messenger");
        }
      });
    } else {
      console.log("Поля заполнены неверно");
    }
  }

  onChange(e: Event, name: string) {
    const input = e.target as HTMLInputElement;
    const formState = this.form.props.formState as Record<string, string>;
    this.form.setProps({
      formState: {
        ...formState,
        [name]: input.value,
      },
    });
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
