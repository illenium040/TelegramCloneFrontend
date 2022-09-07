import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { TypedUseSelectorHook, useSelector } from "react-redux"
import { chatApi, loadableSlice, loadableSliceReducer } from "./chat"
import { signalRApi } from "./signalR"
import { userApi } from "./user"

const rootReducer = combineReducers({
    [userApi.reducerPath]: userApi.reducer,
    [chatApi.reducerPath]: chatApi.reducer,
    [signalRApi.reducerPath]: signalRApi.reducer,
    [loadableSlice.name]: loadableSliceReducer
})

const apiMiddlewares = [userApi.middleware, chatApi.middleware, signalRApi.middleware]

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }).concat(apiMiddlewares)
})

export type RootState = ReturnType<typeof rootReducer>
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector
