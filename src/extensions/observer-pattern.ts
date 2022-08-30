
export interface IObserver {
    update: () => void;
}

export interface IObservable {
    addObserver: (observer: IObserver) => void;
    removeObserver: (observer: IObserver) => void;
    notifyObservers: () => void;
}


export class ObserverEvent implements IObservable {

    private _obs: IObserver[] = [];

    addObserver(observer: IObserver) {
        this._obs.push(observer);
    }
    removeObserver(observer: IObserver) {

    }
    notifyObservers() {
        this._obs.forEach((x, i) => {
            x.update();
        });
    }

}