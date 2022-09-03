import { MessageDTO } from "../../models/message-models";
import { IObserver } from "../observer-pattern";

export class MessageObserver implements IObserver<MessageDTO>{
    private _update;
    constructor(update: (data: MessageDTO) => void) {
        this._update = update;
    }
    public update(data: MessageDTO) {
        if (this._update)
            this._update(data);
    }
}
