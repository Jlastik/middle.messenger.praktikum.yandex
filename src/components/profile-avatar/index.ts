import Block from "../../utils/block.ts";
import { updateUserAvatar, UserType } from "../../utils/api.ts";
import store from "../../utils/store.ts";

export class ProfileAvatar extends Block {
  constructor() {
    super({ avatar: null, events: { click: () => this.handleChangeAvatar() } });

    store.subscribe((s) => {
      const user = s.user as UserType | null;
      if (user) {
        this.setProps({
          avatar: user.avatar,
        });
      }
    });
  }

  handleChangeAvatar() {
    const input = document.createElement("input");
    input.type = "file";
    input.addEventListener("change", async (e) => {
      const files = (e.target as HTMLInputElement).files;
      if (files?.length) {
        const formData = new FormData();
        formData.append("avatar", files[0]);
        const user = await updateUserAvatar(formData);
        if (user) {
          store.dispatch({
            type: "SET_USER",
            payload: user,
          });
        }
      }
    });
    input.click();
  }

  render() {
    return `
      <div class="profile_avatar_container">
        <img
            class="profile_avatar"
            src="{{#if this.avatar}}https://ya-praktikum.tech/api/v2/resources{{this.avatar}}{{else}}/img/no-image.png{{/if}}"
            alt="avatar" 
        />
        <div class="avatar_backdrop">
          <p>Изменить</p>
        </div>
      </div>
    `;
  }
}
