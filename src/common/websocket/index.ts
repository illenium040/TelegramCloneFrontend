import { HubConnection, HubConnectionBuilder, HubConnectionState } from "@microsoft/signalr"
import { serverHost } from "common/constants"

export enum WebSocketEvents {
    Send = "SendMessage",
    Receive = "ReceiveMessage",
    SetHub = "SetUserHub",
    Read = "ReadMessage"
}

export enum WSChatListEvents {
    Add = "AddToChatList",
    Delete = "DeleteFromChatList",
    Archive = "Archive"
}

abstract class WebSocketSignalR {
    static socket?: HubConnection
    static get isConnected() {
        if (!this.socket) return false
        return this.socket.state === HubConnectionState.Connected
    }
    static async connect(userId: string) {
        if (
            this.socket &&
            (this.socket.state === HubConnectionState.Connecting ||
                this.socket.state === HubConnectionState.Reconnecting)
        )
            return
        const hub = new HubConnectionBuilder()
            .withUrl(serverHost + "/hubs/notifications")
            .withAutomaticReconnect()
            .build()
        await hub
            .start()
            .then(() => {
                console.log("Connection started")
            })
            .catch(err => {
                console.log("Error while starting connection: " + err)
            })
        await hub?.send("SetUserHub", userId).then(x => console.log(`Hub is set for ${hub?.connectionId}!`))
        this.socket = hub
    }
}

export default WebSocketSignalR
