import { IUser } from "../entities/entities";

export class StoreService {
  users: IUser[] = [];
  thisUser: IUser = null;

  public initThisUser(user: IUser) {
    this.thisUser = user;
  }
  public addUser(user: IUser) {
    this.users.push(user);
  }
  public removeUser(user: IUser) {
    const filtered = this.users.filter((u) => u.username === user.username);
    this.users = filtered;
  }
}
