import Block, { BlockPropsType } from "../../utils/block.ts";

type ChatItemProps = {
  avatar: string;
  first_name: string;
  date_send: string;
  message: string;
  unread_count: number;
};
export class ChatItem extends Block {
  constructor(props: BlockPropsType & ChatItemProps) {
    super(props);
  }

  render() {
    return `
        <div class="chat_item">
            <img class="chat_avatar" src="{{this.avatar}}" alt="chat-avatar" />
            <div class="chat_item_content">
                <div class="chat_content_top">
                    <p class="chat_content_sender">{{this.first_name}}</p>
                    <p class="chat_content_time">{{this.date_send}}</p>
                </div>
                <div class="chat_content_bottom">
                    <p class="chat_content_message">
                        {{this.message}}
                    </p>
                    <div class="unread_indicator"><span>{{this.unread_count}}</span></div>
                </div>
            </div>
        </div>
    `;
  }
}
