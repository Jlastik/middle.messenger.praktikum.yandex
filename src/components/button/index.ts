import Block, { BlockPropsType } from "../../utils/block.ts";

type ButtonProps = {
  id: string;
  type: "submit" | "reset" | "button";
  class: "solid" | "outlined";
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
