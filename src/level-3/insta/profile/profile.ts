import { inject } from "aurelia";
import { SocketService } from "../../../advanced/services/SocketService";
import { StoreService } from "../../../advanced/services/StoreService";
import "./profile.scss";

@inject()
export class Profile {
  private username = "owling";

  constructor(
    private socketService: SocketService,
    private storeService: StoreService,
  ) {
    this.socketService.onConnectionEstablished((socketId) => {
      this.storeService.initThisUser({
        username: this.username,
        id: socketId,
      });
    });
  }

  attached() {
    // const socket = this.socketService.getThisSocket();
    // /* prettier-ignore */ console.log('>>>> _ >>>> ~ file: profile.ts ~ line 31 ~ socket.id', socket.id)
  }
}
