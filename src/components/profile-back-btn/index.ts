import Block from "src/utils/block.ts";
import { Router } from "../../utils/router.ts";

export class ProfileBackBtn extends Block {
  constructor() {
    super({
      events: { click: () => Router.getInstance("#app").back() },
    });
  }

  render() {
    return `
        <section id="profile_back_container" class="profile_back_container">
            <img src="/img/back-btn.png" alt="back" />
        </section>
    `;
  }
}
