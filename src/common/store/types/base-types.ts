export interface LoadingState {
    loading: boolean;
    error: null | string;
}

export interface LoadingStateWithTError<T> {
    loading: boolean;
    error: null | T;
}

export interface IType<TName> {
    type: TName;
}

export interface ITypeWithPayload<TPayload, TName> extends IType<TName> {
    payload: TPayload;
}