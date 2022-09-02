import { MessageToServer } from './../models/message-models';
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { serverHost } from '../extensions/axios-extensions';

export class SignalRService {

    private static _signalInstance: SignalRService;
    public static getInstanceOf() {
        if (!this._signalInstance) {
            this._signalInstance = new SignalRService();
        }
        return SignalRService._signalInstance;
    }

    private _hub?: HubConnection;
    private _userId?: string
    private constructor() { }

    public async init(userId: string) {
        await SignalRService.getInstanceOf().startConnection(userId)
            .catch(err => console.log('Error while establishing connection :('));
    }

    public OnMessageReceive(callback: (...arg0: any[]) => void) {
        this._hub?.on("ReceiveMessage", callback);
    }

    public OnMessageSended(callback: (...arg0: any[]) => void) {
        this._hub?.on("MessageSended", callback);
    }

    public async sendMessage(message: MessageToServer) {
        this._hub?.send("SendMessage", message);
    }

    private async startConnection(userId: string) {
        this._userId = userId;
        this._hub = new HubConnectionBuilder()
            .withUrl(serverHost + "/hubs/notifications")
            .withAutomaticReconnect()
            .build();
        await this._hub.start()
            .then(() => console.log('Connection started'))
            .catch(err => console.log('Error while starting connection: ' + err))
        await this.setHub()
            .then(x => console.log(`Hub is set for ${this._hub?.connectionId}!`));
    }

    private async setHub() {
        await this._hub?.send("SetUserHub", this._userId);
    }


}