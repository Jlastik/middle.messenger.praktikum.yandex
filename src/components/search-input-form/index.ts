import "./style.pcss";
import Block from "src/utils/block.ts";
import { Input } from "../input";

export class SearchInputForm extends Block {
  constructor() {
    const searchInput = new Input({
      id: "search-input",
      name: "",
      placeholder: "",
      class: "search_input",
      events: {
        change: (e) => this.onChange((e.target as HTMLInputElement).value),
      },
    });
    super({
      searchInput: searchInput,
      events: { submit: (e) => this.onSubmit(e) },
    });
  }

  onChange(value: string) {
    console.log(value);
  }
  onSubmit(e: Event) {
    e.preventDefault();
    console.log("Search chat");
  }

  render() {
    return `
        <form class="search_input_container">
          <label>  
            {{{ searchInput }}}
          </label>
          <img src="/icons/search-icon.svg" alt="My Happy SVG" />
        </form>
    `;
  }
}
