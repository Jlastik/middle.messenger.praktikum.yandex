import formTmpl from "./auth-form.hbs?raw";
import Handlebars from "handlebars";
import "./auth-form.css";

export type AuthFormProps = {
  formId: string;
  formLabel: string;
  inputs: string[];
  buttons: string;
};

export const AuthForm = (params: AuthFormProps) => {
  return Handlebars.compile(formTmpl)(params);
};
