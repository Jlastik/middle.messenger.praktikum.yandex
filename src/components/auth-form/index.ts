import Block, { BlockPropsType } from "../../utils/block.ts";
import "./style.pcss";

export type InputType = {
  id: string;
  name: string;
  placeholder: string;
};

export type FormProps = {
  formId: string;
  formLabel: string;
  inputs: InputType[];
  authBtn: Block;
  noAccBtn: Block;
};

export default class AuthForm extends Block {
  constructor(props: BlockPropsType & Partial<FormProps>) {
    super({
      formId: "auth_form",
      formLabel: "Авторизация",
      inputs: [
        { id: "login", name: "login", placeholder: "Логин" },
        { id: "password", name: "password", placeholder: "Пароль" },
      ],
      ...props,
    });
  }
  render() {
    return `
        <form class="auth_form" id="{{formId}}">
          <p>{{formLabel}}</p>
          {{#each inputs}}
            <div class="input_group">
              <label for="{{this.name}}">Логин</label>
              <input
                placeholder="{{this.placeholder}}"
                name="{{this.name}}"
                id="{{this.id}}"
              />
            </div>
          {{/each}}
          <div class="auth_form_buttons">{{{ authBtn }}} {{{ noAccBtn }}}</div>
        </form>
    `;
  }
}
