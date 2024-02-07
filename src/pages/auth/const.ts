import { Button } from "src/components/button";

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
    { id: "login", name: "login", placeholder: "Логин" },
    { id: "password", name: "password", placeholder: "Пароль" },
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
    { id: "first_name", name: "first_name", placeholder: "Имя" },
    { id: "second_name", name: "second_name", placeholder: "Фамилия" },
    { id: "login", name: "login", placeholder: "Никнейм" },
    { id: "email", name: "email", placeholder: "Почта" },
    { id: "password", name: "password", placeholder: "Пароль" },
    { id: "phone", name: "phone", placeholder: "Телефон" },
  ],
  buttons: `${regBtn}${loginBtn}`,
};
