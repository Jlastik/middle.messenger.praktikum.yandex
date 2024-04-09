import Block from "../../utils/block.ts";

export class ProfileAvatar extends Block {
  constructor() {
    super({ events: { click: () => console.log("Change avatar") } });
  }

  render() {
    return `
      <div class="profile_avatar_container">
        <img class="profile_avatar" src="/img/avatar.jpg" alt="avatar" />
        <div class="avatar_backdrop">
          <p>Изменить</p>
        </div>
      </div>
    `;
  }
}
