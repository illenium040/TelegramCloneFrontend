import { ChatService } from '../services/chat-service'
import { UserService } from '../services/user-service'
import React, { useContext } from 'react'

type DIContainer = {
    chatService: ChatService
    userService: UserService
}

const Container = {
    chatService: new ChatService(),
    userService: new UserService()
} as DIContainer

type DIContainerType = typeof Container
export const DIContext = React.createContext<Partial<DIContainerType>>(Container)

export const useInjection = (): DIContainerType => {
    return useContext(DIContext) as DIContainerType
}
