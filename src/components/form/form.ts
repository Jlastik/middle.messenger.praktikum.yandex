import formTmpl from "./form.hbs?raw";
import Handlebars from "handlebars";

export type InputType = {
  id: string;
  name: string;
  placeholder: string;
};

export type FormProps = {
  formId: string;
  formLabel: string;
  inputs: InputType[];
  buttons: string;
};

export const Form = (params: FormProps) => {
  return Handlebars.compile(formTmpl)(params);
};
