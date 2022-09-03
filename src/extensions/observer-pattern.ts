
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
        const index = this._obs.findIndex((x) => x === observer);
        this._obs.splice(index, 1);
    }
    notifyObservers(data: T) {
        this._obs.forEach((x, i) => {
            x.update(data);
        });
    }

}