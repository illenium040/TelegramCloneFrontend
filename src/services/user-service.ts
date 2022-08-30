import { ChatModel } from './../models/chat';
import { UserChatList, UserDTO, UserChatDTO } from '../models/user';


export class UserService {
    private _userChatList: { [userID: string]: ChatModel[] };

    constructor() {
        this._userChatList = {};
        this._userChatList[this._userData[0].id] = [{
            chatId: this._userData[0].chatId,
            myDTO: this._userData[1],
            userDTO: this._userData[0]
        }];
        this._userChatList[this._userData[1].id] = [{
            chatId: this._userData[1].chatId,
            myDTO: this._userData[0],
            userDTO: this._userData[1]
        }]
    }

    static getDebugUser() {
        return {
            id: "2",
            chatId: "1",
            last_date: "20.12.1231",
            name: "Думер",
            avatar: process.env.PUBLIC_URL + "images/davida.jpg"
        } as UserDTO;
    }


    private _userData = [{
        id: "1",
        chatId: "1",
        last_date: "20.10.2023",
        name: "Гигачад",
        avatar: process.env.PUBLIC_URL + "images/gigachad.jpg",
        messages: [{
            userId: "1",
            content: "Привет, братан",
            date: new Date(),
            isRead: true
        }]
    }, {
        id: "2",
        chatId: "1",
        last_date: "20.12.1231",
        name: "Думер",
        avatar: process.env.PUBLIC_URL + "images/davida.jpg",
        messages: [{
            userId: "2",
            content: "Привет, что случилось?",
            date: new Date(),
            isRead: false
        }]
    } as UserChatDTO];

    public getChatDTO(userId: string, chatId: string) {
        return this._userChatList[userId].filter(x => x.chatId === chatId);
    }

    public getUserChatList(id: string) {
        return {
            id: id,
            chatList: this._userChatList[id]
        } as UserChatList;
    }
}