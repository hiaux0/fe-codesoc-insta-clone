import { inject } from "aurelia";
import { IMessagePayload, IUser } from "../../entities/entities";
import { SocketService } from "../../services/SocketService";
import { StoreService } from "../../services/StoreService";
import "./chat.scss";

@inject()
export class Chat {
  private typedMessage = "";
  private messages: IMessagePayload[] = [];

  get sender(): IUser {
    const sender = this.storeService.thisUser;
    return sender;
  }

  get receiver(): IUser {
    const target = this.storeService.users.find(
      (u) => u.id === this.storeService.selectedReceiver.id,
    );
    return target;
  }

  constructor(
    private storeService: StoreService,
    private socketService: SocketService,
  ) {}

  private onKeypress(event: KeyboardEvent) {
    if (event.key === "Enter") {
      this.sendMessage();
    }

    return true;
  }

  private sendMessage() {
    const thisUser = this.storeService.thisUser;
    const messagePayload: IMessagePayload = {
      message: this.typedMessage,
      receiver: this.storeService.selectedReceiver,
      sender: thisUser,
      createdAt: Date.now(),
    };
    this.messages.push(messagePayload);
    this.socketService.messages.sendNewMessage(JSON.stringify(messagePayload));
  }
}
