import "./auth-page.pcss";
import { createForm } from "./utils.ts";
import {
  AUTH_FORM_DATA,
  AUTH_FORM_ID,
  NO_ACC_BTN_ID,
  REG_FORM_DATA,
} from "./const.ts";

createForm({ root: "auth_form_container", formData: AUTH_FORM_DATA });
createForm({ root: "reg_form_container", formData: REG_FORM_DATA });

const noAccBtn = document.getElementById(NO_ACC_BTN_ID);
if (noAccBtn) {
  noAccBtn.addEventListener("click", () => window.open("/register", "_self"));
}

const authForm = document.getElementById(AUTH_FORM_ID) as HTMLFormElement;
if (authForm) {
  authForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(authForm);
    let hasErrors = false;
    const removeErrors = () => {
      const errors = document.getElementsByClassName("input_group_error");
      Array.from(errors).map((el) => {
        el.remove();
      });
    };
    removeErrors();

    const createError = (text: string) => {
      const errorHint = document.createElement("p");
      errorHint.className = "input_group_error";
      errorHint.textContent = text;
      return errorHint;
    };

    const loginInput = document.getElementById("login");
    const passwordInput = document.getElementById("password");

    for (const [name, value] of data) {
      if (name === "login" && !value) {
        hasErrors = true;
        loginInput?.after(createError("Логин не может быть пустым"));
      }
      if (name === "password" && !value) {
        hasErrors = true;
        passwordInput?.after(createError("Пароль не может быть пустым"));
      }
    }
    !hasErrors && window.open("/home", "_self");
  });
}
