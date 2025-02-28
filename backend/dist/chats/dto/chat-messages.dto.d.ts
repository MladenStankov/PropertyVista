export interface ChatMessagesDto {
    userFullName: string;
    userImage: string;
    currentUser: boolean;
    senderId: number;
    messages: Message[];
}
export interface Message {
    message: string;
    createdAt: Date;
}
