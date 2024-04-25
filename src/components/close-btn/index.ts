import "./style.pcss";
import Block, { BlockPropsType } from "../../utils/block.ts";

class CloseBtn extends Block {
  constructor(props: BlockPropsType) {
    super(props);
  }
  render() {
    return `<img class="close_btn" alt="Х" src="/icons/close.svg" />`;
  }
}

export default CloseBtn;
