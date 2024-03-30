import Block, { BlockPropsType } from "src/utils/block.ts";

interface InputProps {
  id?: string;
  name: string;
  placeholder: string;
  class?: string;
  value?: string;
  disabled?: boolean;
}

export class Input extends Block {
  constructor(props: BlockPropsType & InputProps) {
    super(props);
  }

  render() {
    return `
        <input 
            id="{{this.id}}"
            name="{{this.name}}"
            placeholder="{{this.placeholder}}"
            {{#if this.class}}class="{{this.class}}"{{/if}}
            {{#if this.value}}value="{{this.value}}"{{/if}} 
            {{#if disabled}}disabled{{/if}} />
    `;
  }
}
