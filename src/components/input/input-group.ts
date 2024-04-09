import Block, { BlockPropsType } from "src/utils/block.ts";
import "./style.pcss";

type InputGroupProps = {
  name: string;
  label: string;
  input: Block;
  error: boolean;
  errorText: string;
};

export class InputGroup extends Block {
  constructor(props: BlockPropsType & InputGroupProps) {
    super(props);
  }

  render() {
    return `
        <div class="input_group">
            <label for="{{this.name}}">{{ this.label }}</label>
            {{{ this.input }}}
            {{#if error}}<p class="input_group_error">{{this.errorText}}</p>{{/if}}
        </div>
    `;
  }
}
