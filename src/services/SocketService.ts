// SocketService.ts
import { Socket } from "socket.io-client";
import { MSG } from "../messages";

export class SocketUserService {
  constructor(private socket: Socket) {}

  public onUserJoined(callback) {
    this.socket.on(MSG.user["user joined"], (data) => {
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
}

export class SocketMessageService {
  constructor(private socket: Socket) {}

  public onNewMessage(callback) {
    this.socket.on(MSG.message["new message"], (data) => {
      callback(data);
    });
  }

  public sendNewMessage(newMessage: string) {
    this.socket.emit(MSG.message["new message"], newMessage);
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

export class SocketService {
  public users: SocketUserService;
  public messages: SocketMessageService;
  public connection: SocketConnectionService;

  constructor(private socket: Socket) {
    this.users = new SocketUserService(this.socket);
    this.messages = new SocketMessageService(this.socket);
    this.connection = new SocketConnectionService(this.socket);
  }
}
