import { bindable, inject } from "aurelia";
import { IUser } from "../../entities/entities";
import { StoreService } from "../../services/StoreService";
import "./chat.scss";

@inject()
export class Chat {
  get user(): IUser {
    const target = this.storeService.users.find(
      (u) => u.username === this.storeService.selecterUsername,
    );
    return target;
  }

  constructor(private storeService: StoreService) {}
}
