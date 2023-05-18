import { inject } from "aurelia";
import { IUser } from "../../entities/entities";
import { StoreService } from "../../services/StoreService";

@inject()
export class ChatOverview {
  private chats = [1, 2, 3];
  constructor(private storeService: StoreService) {}

  private selectChat(user: IUser): void {
    this.storeService.selectUser(user);
  }
}
