import { IUser } from "../entities/entities";

export class StoreService {
  users: IUser[] = [];
  thisUser: IUser = null;
  selecterUsername: string;

  public initThisUser(user: IUser) {
    this.thisUser = user;
    this.selecterUsername = 'server';
  }
  public selectUser(user: IUser) {
    this.selecterUsername = user.username;
  }
  public addUser(user: IUser) {
    const exists = this.users.find((u) => u.username === user.username);
    if (exists) {
      console.log("user already exists.");
      return;
    }

    this.users.push(user);
  }
  public removeUser(user: IUser) {
    const filtered = this.users.filter((u) => u.username === user.username);
    this.users = filtered;
  }
  public updateUsers(users: IUser[]) {
    this.users = users;
  }
}
