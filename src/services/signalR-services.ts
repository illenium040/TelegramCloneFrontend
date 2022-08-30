import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";


export class SignalRService {

    private _hub?: HubConnection;
    private _connectionId?: string;

    public async startConnection() {
        this._hub = new HubConnectionBuilder()
            .withUrl("https://localhost:7014/hubs/notifications")
            .build();
        await this._hub.start()
            .then(() => console.log('Connection started'))
            .then(() => this.getConnectionId())
            .catch(err => console.log('Error while starting connection: ' + err))
    }

    private getConnectionId() {
        this._hub?.invoke('getconnectionid')
            .then((data) => {
                console.log(data);
                this._connectionId = data;
            });
    }

    //tmp solution
    get Hub() {
        return this._hub;
    }
}