import "./style.pcss";
import Block, { BlockPropsType } from "src/utils/block.ts";
import { ChatType } from "../../utils/api.ts";
import store from "../../utils/store.ts";

export class ChatItem extends Block {
  isSelected: boolean = false;
  constructor(props: BlockPropsType & ChatType) {
    super(props);

    store.subscribe((s) => {
      this.setProps({ isSelected: this.props.id === s.selectedChat });
    });
  }

  componentDidUpdate() {
    console.log(store.getState());
  }

  componentDidMount() {
    store.subscribe((s) => {
      console.log(s);
    });
  }

  render() {
    return `
        <div class="chat_item{{#if this.isSelected}} selected{{/if}}">
            <img 
                class="chat_avatar"
                src="{{#if this.avatar}} this.avatar {{else}} /img/no-image.png {{/if}}"
                alt="chat-avatar" 
            />
            <div class="chat_item_content">
                <div class="chat_content_top">
                    <p class="chat_content_sender">{{this.title}}</p>
                    <p class="chat_content_time">
                      {{#if this.last_message}}
                          this.last_message.time
                      {{/if}}
                    </p>
                </div>
                <div class="chat_content_bottom">
                    <p class="chat_content_message">
                        {{#if this.last_message}}
                            this.last_message.content
                        {{else}}
                            Нет сообщений
                        {{/if}}
                    </p>
                    {{#if this.last_message}}
                      <div class="unread_indicator">
                          <span>this.unread_count</span>
                      </div> 
                    {{/if}}
                </div>
            </div>
        </div>
    `;
  }
}
