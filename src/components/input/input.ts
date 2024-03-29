import Block, { BlockPropsType } from "src/utils/block.ts";

interface InputProps {
  id: string;
  name: string;
  placeholder: string;
  class?: string;
  value?: string;
}

export class Input extends Block {
  constructor(props: BlockPropsType & InputProps) {
    super({
      ...props,
    });
  }

  render() {
    return `<input class="{{#if this.class}} {{this.class}} {{/if}}" placeholder="{{this.placeholder}}" name="{{this.name}}" id="{{this.id}}"/>`;
  }
}
