import inputTmpl from "./input.hbs?raw";
import Handlebars from "handlebars";

type InputProps = {
  id: string;
  name: string;
  label: string;
  placeholder: string;
};
export const Input = (params: InputProps) => {
  return Handlebars.compile(inputTmpl)(params);
};
