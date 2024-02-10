import { Button } from "src/components/button";

export const PROFILE_DATA = [
  { label: "Почта", name: "email", value: "pochta@yandex.ru", disabled: true },
  { label: "Логин", name: "login", value: "ivanivanov", disabled: true },
  { label: "Имя", name: "first_name", value: "Андрей", disabled: true },
  { label: "Фамилия", name: "second_name", value: "Иванов", disabled: true },
  {
    label: "Имя в чате",
    name: "display_name",
    value: "Андрей",
    disabled: false,
  },
  {
    label: "Телефон",
    name: "phone",
    value: "8 (999) 523-43-43",
    disabled: false,
  },
];

export const EDIT_BTN_TMPL = Button({
  id: "profile_edit_btn",
  type: "button",
  class: "solid",
  label: "Редактировать",
});
export const CHANGE_PWD_BTN_TMPL = Button({
  id: "",
  type: "button",
  class: "outlined",
  label: "Изменить пароль",
});
export const EXIT_BTN_TMPL = Button({
  id: "profile_exit_btn",
  type: "button",
  class: "error",
  label: "Выйти",
});
export const SAVE_BTN_TMPL = Button({
  id: "profile_save_btn",
  type: "button",
  class: "solid",
  label: "Сохранить",
});
