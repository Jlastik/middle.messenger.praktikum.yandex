import { Input, InputGroup } from "../../components/input";
import Button from "../../components/button";
import { EventType } from "../../utils/block.ts";

export const FirstName = (e: EventType) =>
  new InputGroup({
    name: "first_name",
    label: "Имя",
    error: false,
    errorText: "",
    input: new Input({
      id: "first_name",
      name: "first_name",
      placeholder: "Имя",
      events: e,
    }),
  });
export const SecondName = (e: EventType) =>
  new InputGroup({
    name: "second_name",
    label: "Фамилия",
    error: false,
    errorText: "",
    input: new Input({
      id: "second_name",
      name: "second_name",
      placeholder: "Фамилия",
      events: e,
    }),
  });
export const Login = (e: EventType) =>
  new InputGroup({
    name: "login",
    label: "Логин",
    error: false,
    errorText: "",
    input: new Input({
      id: "login",
      name: "login",
      placeholder: "Логин",
      events: e,
    }),
  });
export const Email = (e: EventType) =>
  new InputGroup({
    name: "email",
    label: "Почта",
    error: false,
    errorText: "",
    input: new Input({
      id: "email",
      name: "email",
      placeholder: "kulebyaka@mail.com",
      events: e,
    }),
  });
export const Password = (e: EventType) =>
  new InputGroup({
    name: "password",
    label: "Пароль",
    error: false,
    errorText: "",
    input: new Input({
      id: "password",
      name: "password",
      placeholder: "******",
      events: e,
    }),
  });
export const Phone = (e: EventType) =>
  new InputGroup({
    name: "phone",
    label: "Телефон",
    error: false,
    errorText: "",
    input: new Input({
      id: "phone",
      name: "phone",
      placeholder: "Телефон",
      events: e,
    }),
  });

export const REG_BUTTONS = {
  signUp: new Button({
    id: "reg_btn",
    type: "submit",
    class: "solid",
    label: "Зарегистрироваться",
  }),
  signIn: new Button({
    id: "login_btn",
    type: "button",
    class: "outlined",
    label: "Войти",
    events: {
      click: () => window.open("/", "_self"),
    },
  }),
};
