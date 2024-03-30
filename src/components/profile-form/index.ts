import Block, { BlockPropsType } from "src/utils/block.ts";
import { PROFILE_DATA } from "./const.ts";
import { ProfileFormItem } from "../profile-form-item";
import { validateByName } from "src/utils/inputValidation.ts";

export class ProfileForm extends Block {
  inputs: ProfileFormItem[];
  constructor(props: BlockPropsType) {
    const inputs = PROFILE_DATA.map(
      (el) =>
        new ProfileFormItem({
          ...el,
          onBlur: (value, name) => this.onBlur(value, name),
        }),
    );
    super({
      ...props,
      inputs: inputs,
    });
    this.inputs = inputs;
  }

  onBlur(value: string, name: string) {
    if (!validateByName(value, name)) {
      console.log("Неправильный формат данных");
    }
  }

  render() {
    //Формба без сабмита, данные изменяются при изменении поля. Валидация по блюру
    return `<form id="profile_data" class="profile_data">{{{ this.inputs }}}</form>`;
  }
}
