import { io } from "socket.io-client";
import { SocketService } from "../../services/SocketService";
import "./lobby.scss";

// const url = "https://jeoput-3000.csb.app/";
const url = "localhost:3000";
const socket = io(url);

let connected = false;
const username = "unset";

export class Lobby {
  userName = "";
  private chatMessage = "";

  private socketService: SocketService;

  private userAlreadyExists = false;

  constructor() {
    this.socketService = new SocketService(socket);
  }

  attached() {
    this.socketService.connection.onLogin((data) => {
      connected = true;
      // Display the welcome message
      const message = "Welcome to Socket.IO Chat – ";
      console.log(message, {
        prepend: true,
      });
      console.log(data);
    });

    this.socketService.messages.onNewMessage((data) => {
      console.log(data);
    });

    this.socketService.users.onUserJoined((data) => {
      console.log(`${data.username} joined`);
      console.log(data);
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
      if (username) {
        socket.emit("add user", username);
      }
    });

    this.socketService.connection.onReconnectError(() => {
      console.log("attempt to reconnect has failed");
    });
  }

  setUser() {
    socket.emit("add user", this.userName);
  }

  sendMessage() {
    this.socketService.messages.sendNewMessage(this.chatMessage);
  }
}
