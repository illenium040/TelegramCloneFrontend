import { SignalRService } from './../services/signalR-services';
import { ChatService } from './../services/chat-service';
import { UserService } from './../services/user-service';
import React, { useContext } from 'react';


const Container = {
    chatService: new ChatService(),
    userService: new UserService()
};

type DIContainerType = typeof Container;
export const DIContext = React.createContext<Partial<DIContainerType>>(Container);

export const useInjection = (): DIContainerType => {
    return useContext(DIContext) as DIContainerType;
};