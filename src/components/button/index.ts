import Block, { BlockPropsType } from "src/utils/block.ts";

type ButtonProps = {
  id?: string;
  type: "submit" | "reset" | "button";
  class: "solid" | "outlined" | "error" | "light";
  label: string;
};
export default class Button extends Block {
  constructor(props: BlockPropsType & ButtonProps) {
    super(props);
  }
  render() {
    return `<button id="{{#if id}}id{{/if}}" type="{{type}}" class="{{class}}">{{{label}}}</button>`;
  }
}
