import { Button } from "src/components/button";
import { Input } from "../../components/input/input.ts";

export const AUTH_FORM_ID = "auth_form";
export const REG_FORM_ID = "register_form";
export const NO_ACC_BTN_ID = "no_acc_btn";
export const AUTH_BTN_ID = "auth_btn";

export const REG_BTN_ID = "reg_btn";
export const LOGIN_BTN_ID = "login_btn";

const authBtn = Button({
  id: AUTH_BTN_ID,
  type: "submit",
  class: "solid",
  label: "Войти",
});
const noAccBtn = Button({
  id: NO_ACC_BTN_ID,
  type: "button",
  class: "outlined",
  label: "Нет аккаунта?",
});

export const AUTH_FORM_DATA = {
  formId: AUTH_FORM_ID,
  formLabel: "Авторизация",
  inputs: [
    Input({ id: "login", name: "login", label: "Логин", placeholder: "Логин" }),
    Input({
      id: "password",
      name: "password",
      label: "Пароль",
      placeholder: "Пароль",
    }),
  ],
  buttons: `${authBtn}${noAccBtn}`,
};

export const regBtn = Button({
  id: REG_BTN_ID,
  type: "submit",
  class: "solid",
  label: "Зарегистрироваться",
});
export const loginBtn = Button({
  id: LOGIN_BTN_ID,
  type: "button",
  class: "outlined",
  label: "Войти",
});

export const REG_FORM_DATA = {
  formId: REG_FORM_ID,
  formLabel: "Регистрация",
  inputs: [
    Input({
      id: "first_name",
      name: "first_name",
      label: "Имя",
      placeholder: "Имя",
    }),
    Input({
      id: "second_name",
      name: "second_name",
      label: "Фамилия",
      placeholder: "Фамилия",
    }),
    Input({
      id: "login",
      name: "login",
      label: "Никнейм",
      placeholder: "Никнейм",
    }),
    Input({ id: "email", name: "email", label: "Почта", placeholder: "Почта" }),
    Input({
      id: "password",
      name: "password",
      label: "Пароль",
      placeholder: "Пароль",
    }),
    Input({
      id: "phone",
      name: "phone",
      label: "Телефон",
      placeholder: "Телефон",
    }),
  ],
  buttons: `${regBtn}${loginBtn}`,
};
