import { inject } from "aurelia";
import { SocketService } from "../../services/SocketService";
import { StoreService } from "../../services/StoreService";
import "./profile.scss";

@inject()
export class Profile {
  private username = "owling";

  constructor(
    private socketService: SocketService,
    private storeService: StoreService,
  ) {
    this.storeService.initThisUser({
      username: this.username,
      id: "change-meeeee",
    });
  }

  private onKeypress(event: KeyboardEvent) {
    if (event.key === "Enter") {
      this.socketService.users.emitChangeUser(this.username);
    }

    return true;
  }
}
