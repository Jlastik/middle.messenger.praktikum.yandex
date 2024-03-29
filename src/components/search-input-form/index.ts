import Block from "../../utils/block.ts";
import { Input } from "../input";

export class SearchInputForm extends Block {
  searchInput = new Input({
    id: "search-input",
    name: "",
    placeholder: "",
    class: "search_input",
  });

  constructor() {
    super();
  }

  render() {
    return `
        <form class="search_input_container">
          <label>  
            {{{ this.searchInput }}}
          </label>
          <img src="/icons/search-icon.svg" alt="My Happy SVG" />
        </form>
    `;
  }
}
