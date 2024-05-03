import "./style.pcss";
import Block from "src/utils/block.ts";
import { Input } from "../input";

type SearchInputFormProps = {
  handleChange: (value: string) => void;
  handleSubmit: (value: string) => void;
};

export class SearchInputForm extends Block {
  handleChange;
  handleSubmit;
  value;
  constructor({ handleChange, handleSubmit }: SearchInputFormProps) {
    const searchInput = new Input({
      id: "search-input",
      name: "",
      placeholder: "",
      class: "search_input",
      events: {
        input: (e) => this.onChange((e.target as HTMLInputElement).value),
      },
    });
    super({
      searchInput: searchInput,
      value: "",
      events: { submit: (e) => this.onSubmit(e) },
    });

    this.handleChange = handleChange;
    this.handleSubmit = handleSubmit;
    this.value = "";
  }

  onChange(value: string) {
    this.value = value;
    this.handleChange(value);
  }
  onSubmit(e: Event) {
    e.preventDefault();
    this.handleSubmit(this.value);
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
