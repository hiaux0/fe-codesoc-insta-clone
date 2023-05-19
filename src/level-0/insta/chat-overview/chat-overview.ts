import { inject } from "aurelia";
import { IUser } from "../../../advanced/entities/entities";
import { StoreService } from "../../../advanced/services/StoreService";

@inject()
export class ChatOverview {
  private chats = [1, 2, 3];
  constructor(private storeService: StoreService) {}

  get users(): IUser[] {
    const withoutSelf = this.storeService.users.filter(
      (u) => u.id !== this.storeService.thisUser?.id,
    );
    return withoutSelf;
  }

  private selectChat(user: IUser): void {
    this.storeService.selectUser(user);
  }
}
