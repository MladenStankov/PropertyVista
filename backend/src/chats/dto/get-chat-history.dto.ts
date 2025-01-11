export class GetChatHistoryDto {
  messageType: MessageType;
  message: string;
  createdAt: Date;
}

export enum MessageType {
  RIGHT = 'right',
  LEFT = 'left',
}
