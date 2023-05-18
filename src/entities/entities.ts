export interface IUser {
  username: string;
}

export interface IMessagePayload {
  sender: IUser;
  receiver: IUser;
  message: string;
}

export interface IMessageResponse {
  sender: IUser;
  receiver: IUser;
  message: string;
}
