import Block, { BlockPropsType } from "src/utils/block.ts";

type ButtonProps = {
  id: string;
  type: "submit" | "reset" | "button";
  class: "solid" | "outlined" | "error";
  label: string;
};
export default class Button extends Block {
  constructor(props: BlockPropsType & ButtonProps) {
    super(props);
  }
  render() {
    return `<button id="{{id}}" type="{{type}}" class="{{class}}">{{label}}</button>`;
  }
}
