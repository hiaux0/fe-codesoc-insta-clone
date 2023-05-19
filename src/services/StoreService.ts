import {
  IChangeUserResponse,
  IUser,
  UserWithIdOnly,
} from "../entities/entities";

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
  public getUser(user: UserWithIdOnly) {
    const target = this.users.find((u) => u.id === user.id);
    return target;
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
  public updateUser(changedUserData: IChangeUserResponse): void {
    const target = this.getUser({ id: changedUserData.userId });
    target.username = changedUserData.username;
    const withUpdatedUser = this.users.map((u) => {
      if (u.id !== changedUserData.userId) return u;

      const updatedUser = {
        ...u,
        username: changedUserData.username,
      };
      return updatedUser;
    });
    this.updateUsers(withUpdatedUser);
  }
  public updateUsers(users: IUser[]) {
    this.users = users;
    /* prettier-ignore */ console.log('>>>> _ >>>> ~ file: StoreService.ts ~ line 30 ~ this.users', this.users)
  }
}
