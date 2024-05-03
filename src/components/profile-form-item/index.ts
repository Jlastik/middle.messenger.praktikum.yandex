import "./style.pcss";
import Block, { BlockPropsType } from "src/utils/block.ts";
import { Input } from "../input";

type ProfileFormItemProps = {
  label: string;
  name: string;
  value: string;
  disabled: boolean;
  onBlur: (value: string, name: string) => void;
};
export class ProfileFormItem extends Block {
  rowInput;
  constructor(props: BlockPropsType & ProfileFormItemProps) {
    const rowInput = new Input({
      value: props.value,
      name: props.name,
      placeholder: "",
      disabled: props.disabled,
      events: {
        blur: (e) =>
          props.onBlur((e.target as HTMLInputElement).value, props.name),
      },
    });

    super({ ...props, rowInput: rowInput });

    this.rowInput = rowInput;
  }

  render() {
    return `
        <div class="profile_data_row">
            <label>{{label}}</label>
           {{{ this.rowInput }}}
        </div>
    `;
  }
}
