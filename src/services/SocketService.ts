// SocketService.ts
import { inject } from "aurelia";
import { io, Socket } from "socket.io-client";
import { IMessagePayload } from "../entities/entities";
import { MSG } from "../messages";
import { StoreService } from "./StoreService";

// const url = "https://jeoput-3000.csb.app/";
const url = "localhost:3000";
const socket = io(url);

@inject()
export class SocketUserService {
  constructor(private socket: Socket, private storeService: StoreService) {}

  public onUpdateUserList(callback) {
    this.socket.on(MSG.user["updateUserList"], (data) => {
      callback(data);
    });
  }

  public onUserJoined(callback) {
    this.socket.on(MSG.user["user joined"], (data) => {
      callback(data);
    });
  }

  public onUsernameChanged(callback) {
    this.socket.on(MSG.user["change username"], (data) => {
      callback(data);
    });
  }

  public onUserLeft(callback) {
    this.socket.on(MSG.user["user left"], (data) => {
      callback(data);
    });
  }

  public onUserAlreadyExists(callback) {
    this.socket.on(MSG.user["user already exists"], (data) => {
      callback(data);
    });
  }

  public emitAddUser(username: string) {
    this.socket.emit(MSG.user["add user"], username);
  }

  public emitChangeUser(username: string) {
    this.socket.emit(MSG.user["change username"], username);
  }
}

@inject()
export class SocketMessageService {
  constructor(private socket: Socket, private storeService: StoreService) {}

  public onNewMessage(callback) {
    this.socket.on(MSG.message["new message"], (data) => {
      callback(data);
    });
  }

  public sendNewMessage(messagePayload: IMessagePayload) {
    this.socket.emit(
      MSG.message["new message"],
      JSON.stringify(messagePayload),
    );
  }

  public onTyping(callback) {
    this.socket.on(MSG.message.typing, (data) => {
      callback(data);
    });
  }

  public onStopTyping(callback) {
    this.socket.on(MSG.message["stop typing"], (data) => {
      callback(data);
    });
  }
}

export class SocketConnectionService {
  constructor(private socket: Socket) {}

  public onLogin(callback) {
    this.socket.on(MSG.auth.login, (data) => {
      callback(data);
    });
  }

  public onDisconnect(callback) {
    this.socket.on(MSG.connection.disconnect, () => {
      callback();
    });
  }

  public onReconnect(callback) {
    this.socket.io.on("reconnect", () => {
      callback();
    });
  }

  public onReconnectError(callback) {
    this.socket.io.on("reconnect_error", () => {
      callback();
    });
  }
}

@inject()
export class SocketService {
  public users: SocketUserService;
  public messages: SocketMessageService;
  public connection: SocketConnectionService;

  constructor(private storeService: StoreService) {
    this.users = new SocketUserService(socket, storeService);
    this.messages = new SocketMessageService(socket, storeService);
    this.connection = new SocketConnectionService(socket);
  }
}
