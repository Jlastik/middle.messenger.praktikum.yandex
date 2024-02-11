import buttonTmpl from "./button.hbs?raw";
import Handlebars from "handlebars";

export const Button = (params: {
  id: string;
  type: "submit" | "reset" | "button";
  class: string;
  label: string;
}) => {
  return Handlebars.compile(buttonTmpl)(params);
};
