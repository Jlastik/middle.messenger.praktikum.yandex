import "./reg-page.pcss";
import Block from "src/utils/block.ts";
import AuthForm from "src/components/auth-form";
import {
  emailValidation,
  FORM_ERRORS,
  loginValidation,
  nameValidation,
  passwordValidation,
  phonedValidation,
} from "../../utils/inputValidation.ts";
import {
  Email,
  FirstName,
  Login,
  Password,
  Phone,
  REG_BUTTONS,
  SecondName,
} from "./const.ts";

class RegPage extends Block {
  form: AuthForm;
  nameInput;
  secondNameInput;
  loginInput;
  passInput;
  phoneInput;
  emailInput;

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
      inputs: [first_name, second_name, login, email, password, phone],
      buttons: [signUp, signIn],
      formState: {},
      events: {
        submit: (e) => this.onSubmit(e),
      },
    });
    super({ form });

    this.form = form;

    this.nameInput = first_name;
    this.secondNameInput = second_name;
    this.loginInput = login;
    this.passInput = password;
    this.phoneInput = phone;
    this.emailInput = email;
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
      this.nameInput.setProps({
        error: true,
        errorText: FORM_ERRORS.first_name,
      });
    } else {
      this.nameInput.setProps({ error: false, errorText: "" });
    }
    if (!nameValidation(second_name)) {
      hasErrors = true;
      this.secondNameInput.setProps({
        error: true,
        errorText: FORM_ERRORS.second_name,
      });
    } else {
      this.secondNameInput.setProps({ error: false, errorText: "" });
    }
    if (!loginValidation(login)) {
      hasErrors = true;
      this.loginInput.setProps({ error: true, errorText: FORM_ERRORS.login });
    } else {
      this.loginInput.setProps({ error: false, errorText: "" });
    }
    if (!emailValidation(email)) {
      hasErrors = true;
      this.emailInput.setProps({ error: true, errorText: FORM_ERRORS.email });
    } else {
      this.emailInput.setProps({ error: false, errorText: "" });
    }
    if (!passwordValidation(password)) {
      hasErrors = true;
      this.passInput.setProps({ error: true, errorText: FORM_ERRORS.password });
    } else {
      this.passInput.setProps({ error: false, errorText: "" });
    }
    if (!phonedValidation(phone)) {
      hasErrors = true;
      this.phoneInput.setProps({ error: true, errorText: FORM_ERRORS.phone });
    } else {
      this.phoneInput.setProps({ error: false, errorText: "" });
    }

    if (hasErrors) {
      console.log("Поля заполнены неверно");
    } else {
      console.log(this.form.props.formState);
    }
  }

  validate(value: string, name: string) {
    switch (name) {
      case "first_name":
        nameValidation(value)
          ? this.nameInput.setProps({ error: false, errorText: "" })
          : this.nameInput.setProps({
              error: true,
              errorText: FORM_ERRORS.first_name,
            });
        return;
      case "second_name":
        nameValidation(value)
          ? this.secondNameInput.setProps({ error: false, errorText: "" })
          : this.secondNameInput.setProps({
              error: true,
              errorText: FORM_ERRORS.second_name,
            });
        return;
      case "login":
        loginValidation(value)
          ? this.loginInput.setProps({ error: false, errorText: "" })
          : this.loginInput.setProps({
              error: true,
              errorText: FORM_ERRORS.login,
            });
        return;
      case "password":
        passwordValidation(value)
          ? this.passInput.setProps({ error: false, errorText: "" })
          : this.passInput.setProps({
              error: true,
              errorText: FORM_ERRORS.password,
            });
        return;
      case "phone":
        console.log(value, this.phoneInput.props);
        phonedValidation(value)
          ? this.phoneInput.setProps({ error: false, errorText: "" })
          : this.phoneInput.setProps({
              error: true,
              errorText: FORM_ERRORS.phone,
            });
        return;
      case "email":
        emailValidation(value)
          ? this.emailInput.setProps({ error: false, errorText: "" })
          : this.emailInput.setProps({
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
