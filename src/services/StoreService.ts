import { IUser } from "../entities/entities";

export class StoreService {
  users: IUser[] = [];
  thisUser: IUser = null;
  selectedReceiver: IUser;

  public initThisUser(user: IUser) {
    this.thisUser = user;
    this.selectedReceiver = { username: "server", id: "change-MEEE" };
  }
  public selectUser(user: IUser) {
    this.selectedReceiver = user;
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
  public updateUser(user: IUser): void {
  }
  public updateUsers(users: IUser[]) {
    this.users = users;
    /* prettier-ignore */ console.log('>>>> _ >>>> ~ file: StoreService.ts ~ line 30 ~ this.users', this.users)
  }
}
