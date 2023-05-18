import { bindable, inject } from "aurelia";
import { StoreService } from "../../services/StoreService";
import "./chat.scss";

@inject()
export class Chat {
  constructor(private storeService: StoreService) {}
}
