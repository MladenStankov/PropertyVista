export class ChatDto {
  brokerChats: IBrokerChat[];
  homeSeekingChats: IHomeSeekingChat[];
}

export interface IBrokerChat {
  uuid: string;
  homeSeekerImage: string;
  homeSeekerFullName: string;
  lastMessage: string;
  lastMessageBy: string;
}

export interface IHomeSeekingChat {
  uuid: string;
  listingImageUrl: string;
  listingAddress: string;
  lastMessage: string;
  lastMessageBy: string;
}
