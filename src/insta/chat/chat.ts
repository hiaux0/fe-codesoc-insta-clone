import { inject } from "aurelia";
import { IUser } from "../../entities/entities";
import { SocketService } from "../../services/SocketService";
import { StoreService } from "../../services/StoreService";
import "./chat.scss";

@inject()
export class Chat {
  private typedMessage = "";

  get receiver(): IUser {
    const target = this.storeService.users.find(
      (u) => u.username === this.storeService.selectedReceiver,
    );
    return target;
  }

  constructor(
    private storeService: StoreService,
    private socketService: SocketService,
  ) {}

  private onKeypress(event: KeyboardEvent) {
    if (event.key === "Enter") {
      /* prettier-ignore */ console.log('>>>> _ >>>> ~ file: chat.ts ~ line 26 ~ this.typedMessage', this.typedMessage)
      this.socketService.messages.sendNewMessage(this.typedMessage);
    }

    return true;
  }
}
