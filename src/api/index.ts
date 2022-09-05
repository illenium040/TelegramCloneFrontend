import { combineReducers, configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import { chatApi } from './chat'
import { signalRApi } from './signalR'
import { userApi } from './user'

const rootReducer = combineReducers({
    [userApi.reducerPath]: userApi.reducer,
    [chatApi.reducerPath]: chatApi.reducer,
    [signalRApi.reducerPath]: signalRApi.reducer
})

const apiMiddlewares = [userApi.middleware, chatApi.middleware, signalRApi.middleware]

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(thunk).concat(apiMiddlewares)
})
