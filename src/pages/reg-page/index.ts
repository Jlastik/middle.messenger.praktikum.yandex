import "./reg-page.pcss";
import Block from "src/utils/block.ts";
import AuthForm, { FormProps } from "src/components/auth-form";
import {
  emailValidation,
  FORM_ERRORS,
  loginValidation,
  nameValidation,
  passwordValidation,
  phonedValidation,
} from "src/utils/inputValidation.ts";
import {
  Email,
  FirstName,
  Login,
  Password,
  Phone,
  REG_BUTTONS,
  SecondName,
} from "./const.ts";
import { Router } from "../../utils/router.ts";
import { signUp } from "../../utils/api.ts";

class RegPage extends Block {
  signInBtn;
  signUpBtn;
  first_name;
  second_name;
  login;
  email;
  password;
  phone;
  form;
  constructor() {
    const { signUp, signIn } = REG_BUTTONS;
    const first_name = FirstName({
      change: (e) => this.onChange(e, "first_name"),
      blur: (e) =>
        this.validate((e.target as HTMLInputElement).value, "first_name"),
    });
    const second_name = SecondName({
      change: (e) => this.onChange(e, "second_name"),
      blur: (e) =>
        this.validate((e.target as HTMLInputElement).value, "second_name"),
    });
    const login = Login({
      change: (e) => this.onChange(e, "login"),
      blur: (e) => this.validate((e.target as HTMLInputElement).value, "login"),
    });
    const email = Email({
      change: (e) => this.onChange(e, "email"),
      blur: (e) => this.validate((e.target as HTMLInputElement).value, "email"),
    });
    const password = Password({
      change: (e) => this.onChange(e, "password"),
      blur: (e) =>
        this.validate((e.target as HTMLInputElement).value, "password"),
    });
    const phone = Phone({
      change: (e) => this.onChange(e, "phone"),
      blur: (e) => this.validate((e.target as HTMLInputElement).value, "phone"),
    });

    const form = new AuthForm({
      formId: "reg_form",
      formLabel: "Регистрация",
      class: "auth_form",
      inputs: [first_name, second_name, login, email, password, phone],
      buttons: [signUp, signIn],
      formState: {},
      events: {
        submit: (e) => this.onSubmit(e),
      },
    });

    super({ form });

    this.signInBtn = signIn;
    this.signUpBtn = signUp;
    this.first_name = first_name;
    this.second_name = second_name;
    this.login = login;
    this.email = email;
    this.password = password;
    this.phone = phone;
    this.form = form;
  }

  onSubmit(e: Event) {
    e.preventDefault();

    const {
      first_name = "",
      second_name = "",
      login = "",
      email = "",
      phone = "",
      password = "",
    } = this.form.props.formState as Record<string, string>;
    let hasErrors = false;

    if (!nameValidation(first_name)) {
      hasErrors = true;
      this.first_name.setProps({
        error: true,
        errorText: FORM_ERRORS.first_name,
      });
    } else {
      this.first_name.setProps({ error: false, errorText: "" });
    }
    if (!nameValidation(second_name)) {
      hasErrors = true;
      this.second_name.setProps({
        error: true,
        errorText: FORM_ERRORS.second_name,
      });
    } else {
      this.second_name.setProps({ error: false, errorText: "" });
    }
    if (!loginValidation(login)) {
      hasErrors = true;
      this.login.setProps({ error: true, errorText: FORM_ERRORS.login });
    } else {
      this.login.setProps({ error: false, errorText: "" });
    }
    if (!emailValidation(email)) {
      hasErrors = true;
      this.email.setProps({ error: true, errorText: FORM_ERRORS.email });
    } else {
      this.email.setProps({ error: false, errorText: "" });
    }
    if (!passwordValidation(password)) {
      hasErrors = true;
      this.password.setProps({ error: true, errorText: FORM_ERRORS.password });
    } else {
      this.password.setProps({ error: false, errorText: "" });
    }
    if (!phonedValidation(phone)) {
      hasErrors = true;
      this.phone.setProps({ error: true, errorText: FORM_ERRORS.phone });
    } else {
      this.phone.setProps({ error: false, errorText: "" });
    }

    if (!hasErrors) {
      signUp((this.form.props as FormProps).formState).then((r) => {
        if (r) {
          Router.getInstance("#app").go("/messenger");
        }
      });
    }
  }

  validate(value: string, name: string) {
    switch (name) {
      case "first_name":
        nameValidation(value)
          ? this.first_name.setProps({ error: false, errorText: "" })
          : this.first_name.setProps({
              error: true,
              errorText: FORM_ERRORS.first_name,
            });
        return;
      case "second_name":
        nameValidation(value)
          ? this.second_name.setProps({ error: false, errorText: "" })
          : this.second_name.setProps({
              error: true,
              errorText: FORM_ERRORS.second_name,
            });
        return;
      case "login":
        loginValidation(value)
          ? this.login.setProps({ error: false, errorText: "" })
          : this.login.setProps({
              error: true,
              errorText: FORM_ERRORS.login,
            });
        return;
      case "password":
        passwordValidation(value)
          ? this.password.setProps({ error: false, errorText: "" })
          : this.password.setProps({
              error: true,
              errorText: FORM_ERRORS.password,
            });
        return;
      case "phone":
        console.log(value, this.phone.props);
        phonedValidation(value)
          ? this.phone.setProps({ error: false, errorText: "" })
          : this.phone.setProps({
              error: true,
              errorText: FORM_ERRORS.phone,
            });
        return;
      case "email":
        emailValidation(value)
          ? this.email.setProps({ error: false, errorText: "" })
          : this.email.setProps({
              error: true,
              errorText: FORM_ERRORS.email,
            });
        return;
      default:
        return;
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
            <div id="reg_form_container">{{{ form }}}</div>
        </div>
    `;
  }
}

export default new RegPage();
