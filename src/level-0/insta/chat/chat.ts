import { inject } from "aurelia";
import { IMessagePayload, IUser } from "../../../advanced/entities/entities";
import { SocketService } from "../../../advanced/services/SocketService";
import { StoreService } from "../../../advanced/services/StoreService";
import "./chat.scss";

@inject()
export class Chat {
  private typedMessage = "";
  private messages: IMessagePayload[] = [];
  private chatMessageContainer: HTMLDivElement;

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
  ) {
    this.initSocketEvents();
  }

  private initSocketEvents() {
    this.socketService.messages.onNewMessage((data: IMessagePayload) => {
      this.messages.push(data);
    });
  }

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
    this.socketService.messages.sendNewMessage(messagePayload);

    this.clearTypedMessage();
    this.scrollToBottom();
  }

  private clearTypedMessage() {
    this.typedMessage = "";
  }

  private scrollToBottom() {
    this.chatMessageContainer.scrollTop =
      this.chatMessageContainer.scrollHeight;
  }
}
