export interface IUser {
  username: string;
  id: string;
}
export type UserWithIdOnly = Pick<IUser, "id">;

export interface IChangeUserResponse {
  oldUsername: string;
  username: string;
  userId: string;
}

export interface IMessagePayload {
  sender: IUser;
  receiver: IUser;
  message: string;
  createdAt: number;
}

export interface IMessageResponse {
  sender: IUser;
  receiver: IUser;
  message: string;
  createdAt: number;
}
