import Block, { BlockPropsType } from "src/utils/block.ts";
import { PROFILE_DATA } from "./const.ts";
import { ProfileFormItem } from "../profile-form-item";

export class ProfileForm extends Block {
  inputs: ProfileFormItem[];
  constructor(props: BlockPropsType) {
    const inputs = PROFILE_DATA.map((el) => new ProfileFormItem({ ...el }));
    super({ ...props, inputs: inputs });

    this.inputs = inputs;
  }

  render() {
    return `<form id="profile_data" class="profile_data">{{{ this.inputs }}}</form>`;
  }
}
