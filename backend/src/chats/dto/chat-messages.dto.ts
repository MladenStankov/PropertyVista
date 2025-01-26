export interface ChatMessagesDto {
  userFullName: string;
  userImage: string;
  currentUser: boolean;
  messages: Message[];
}

export interface Message {
  message: string;
  createdAt: Date;
}
