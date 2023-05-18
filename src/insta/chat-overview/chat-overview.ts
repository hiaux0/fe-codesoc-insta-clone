import { inject } from "aurelia";
import { StoreService } from "../../services/StoreService";

@inject()
export class ChatOverview {
  private chats = [1, 2, 3];
  constructor(private storeService: StoreService) {}
}
