import { MessageDTO, MessageToServer } from './../models/message-models'
import { HubConnection, HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr'
import { serverHost } from '../extensions/axios-extensions'
import { ObserverEvent } from '../extensions/observer-pattern'

export class SignalRService {
    private _hub?: HubConnection
    private _isHubSet: boolean = false
    public async startSignalRConnection(userId: string, url: string) {
        if (this._hub) return
        this._isHubSet = false
        const hub = new HubConnectionBuilder()
            .withUrl(serverHost + url)
            .withAutomaticReconnect()
            .build()
        await hub
            .start()
            .then(() => {
                console.log('Connection started')
            })
            .catch(err => {
                console.log('Error while starting connection: ' + err)
            })
        await hub?.send('SetUserHub', userId).then(x => console.log(`Hub is set for ${hub?.connectionId}!`))
        this._isHubSet = true
        this._hub = hub
        //this.OnMessageReceive()
        //this.OnMessageSended()
    }

    public OnReceive: ObserverEvent<MessageDTO> = new ObserverEvent()
    public OnSended: ObserverEvent<MessageDTO> = new ObserverEvent()

    private OnMessageReceive() {
        this._hub?.on('ReceiveMessage', (message: MessageDTO) => {
            this.OnReceive.notifyObservers(message)
        })
    }

    private OnMessageSended() {
        this._hub?.on('MessageSended', (message: MessageDTO) => {
            this.OnSended.notifyObservers(message)
        })
    }

    public async sendMessage(message: MessageToServer) {
        this._hub?.send('SendMessage', message)
    }

    public get isConnected(): boolean {
        if (!this._hub) return false
        if (this._hub.state === HubConnectionState.Connected && this._isHubSet) return true
        return false
    }

    public get Hub() {
        return this._hub
    }
}
