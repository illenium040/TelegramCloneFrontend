
export interface IObserver<T> {
    update: (data: T) => void;
}

export interface IObservable<T> {
    addObserver: (observer: IObserver<T>) => void;
    removeObserver: (observer: IObserver<T>) => void;
    notifyObservers: (data: T) => void;
}


export class ObserverEvent<T> implements IObservable<T> {

    private _obs: IObserver<T>[] = [];

    addObserver(observer: IObserver<T>) {
        this._obs.push(observer);
    }
    removeObserver(observer: IObserver<T>) {

    }
    clear() {
        this._obs = [];
    }
    notifyObservers(data: T) {
        this._obs.forEach((x, i) => {
            x.update(data);
        });
    }

}