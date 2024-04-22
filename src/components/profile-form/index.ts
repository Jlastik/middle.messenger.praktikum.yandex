import Block, { BlockPropsType } from "src/utils/block.ts";
import { PROFILE_DATA } from "./const.ts";
import { ProfileFormItem } from "../profile-form-item";
import { validateByName } from "src/utils/inputValidation.ts";
import store from "../../utils/store.ts";
import { editUser, UserType } from "../../utils/api.ts";

export class ProfileForm extends Block {
  constructor(props: BlockPropsType) {
    super({
      ...props,
      inputs: [],
    });

    store.subscribe((s) => {
      if (s.user) {
        const data = PROFILE_DATA.map((el) => {
          const val = (s.user as UserType)[el.name] as string;
          return new ProfileFormItem({
            label: el.label,
            name: el.name,
            value: val,
            disabled: el.disabled,
            onBlur: (value, name) => this.onBlur(value, name),
          });
        });
        this.setProps({ inputs: data });
      }
    });
  }

  async onBlur(value: string, name: string) {
    if (!validateByName(value, name)) {
      console.log("Неправильный формат данных");
    } else {
      const res = await editUser({ value: value, key: name });
      console.log(res);
    }
  }

  render() {
    //Формба без сабмита, данные изменяются при изменении поля. Валидация по блюру
    return `<form id="profile_data" class="profile_data">{{{ this.inputs }}}</form>`;
  }
}
