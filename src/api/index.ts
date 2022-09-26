import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import thunk from "redux-thunk"
import { chatApi } from "./chat"
import { signalRApi } from "./signalR"
import { loadableMessageSlice, loadableMessageReducer } from "./slices/loadableMessage"
import { userApi } from "./user"

const rootReducer = combineReducers({
    [userApi.reducerPath]: userApi.reducer,
    [chatApi.reducerPath]: chatApi.reducer,
    [signalRApi.reducerPath]: signalRApi.reducer,
    [loadableMessageSlice.name]: loadableMessageReducer
})

const apiMiddlewares = [userApi.middleware, chatApi.middleware, signalRApi.middleware, thunk]

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }).concat(apiMiddlewares)
})

export type RootState = ReturnType<typeof rootReducer>
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch = () => (store.dispatch = useDispatch())
