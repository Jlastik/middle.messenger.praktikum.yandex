import "./style.pcss";
import Block, { BlockPropsType } from "src/utils/block.ts";

type ProfileFormItemProps = {
  label: string;
  name: string;
  value: string;
  disabled: boolean;
};
export class ProfileFormItem extends Block {
  constructor(props: BlockPropsType & ProfileFormItemProps) {
    super({ ...props });
  }

  render() {
    return `
        <p class="profile_data_row">
            <label>{{label}}</label>
            <input {{#if disabled}}disabled{{/if}} name="{{name}}" value="{{value}}" />
        </p>
    `;
  }
}
