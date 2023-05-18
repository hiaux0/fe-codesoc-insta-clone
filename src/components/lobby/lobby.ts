import { inject } from "aurelia";
import { IUser } from "../../entities/entities";
import { SocketService } from "../../services/SocketService";
import { StoreService } from "../../services/StoreService";
import "./lobby.scss";

@inject()
export class Lobby {
  users: IUser[] = [];
  username = "first";
  private chatMessage = "second";

  private userAlreadyExists = false;

  constructor(
    private socketService: SocketService,
    private storeService: StoreService,
  ) {}

  attached() {
    this.socketService.connection.onLogin((data) => {
      // Display the welcome message
      const message = "Welcome to Socket.IO Chat – ";
      console.log(message, {
        prepend: true,
      });
      /* prettier-ignore */ console.log('>>>> _ >>>> ~ file: lobby.ts ~ line 26 ~ data', data)
    });

    this.socketService.messages.onNewMessage((data) => {
      console.log(data);
    });

    this.socketService.users.onUpdateUserList((data) => {
      /* prettier-ignore */ console.log('>>>> _ >>>> ~ file: lobby.ts ~ line 34 ~ data', data)
      this.users = data.users;
      this.storeService.updateUsers(this.users);
    });

    this.socketService.users.onUserJoined((data: IUser) => {
      console.log(`${data.username} joined`);
      console.log(data);
      this.storeService.addUser(data);
    });

    this.socketService.users.onUserLeft((data) => {
      console.log(`${data.username} left`);
      console.log(data);
      console.log(data);
    });

    this.socketService.users.onUserAlreadyExists(() => {
      this.userAlreadyExists = true;
    });

    this.socketService.messages.onTyping((data) => {
      console.log(data);
    });

    this.socketService.messages.onStopTyping((data) => {
      console.log(data);
    });

    this.socketService.connection.onDisconnect(() => {
      console.log("you have been disconnected");
    });

    this.socketService.connection.onReconnect(() => {
      console.log("you have been reconnected");
      const { username } = this.storeService.thisUser;
      this.socketService.users.emitChangeUser(username);
    });

    this.socketService.connection.onReconnectError(() => {
      console.log("attempt to reconnect has failed");
    });

    this.setUser();
    this.sendMessage();
  }

  setUser() {
    const { username } = this.storeService.thisUser;

    this.socketService.users.emitAddUser(username);
  }

  sendMessage() {
    this.socketService.messages.sendNewMessage(this.chatMessage);
  }
}
