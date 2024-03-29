import Block, { BlockPropsType } from "../../utils/block.ts";
import "./style.pcss";

export type FormProps = {
  formId: string;
  formLabel: string;
  inputs: Block[];
  buttons: Block[];
  formState: Record<string, string>;
  class?: string;
};

export default class AuthForm extends Block {
  constructor(props: BlockPropsType & FormProps) {
    super(props);
  }

  render() {
    return `
        <form class="{{#if this.class}} {{this.class}} {{/if}}" id="{{formId}}">
          <p>{{formLabel}}</p>
            {{{ inputs }}}
          <div class="auth_form_buttons">{{{ buttons }}}</div>
        </form>
    `;
  }
}
