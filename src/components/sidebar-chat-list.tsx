import React, { Component } from 'react'
import { BsCheckAll } from "@react-icons/all-files/bs/BsCheckAll";
import { ChatListUnit } from '../models/chat-models';
import { ChatService } from '../services/chat-service';
import { UserDTO } from '../models/user-models';


type SidebarChatListProps = {
    user: UserDTO;
    chatService: ChatService;
    onChatSelected: (chat: ChatListUnit) => void;
}
type SidebarChatListState = {
    chatList?: ChatListUnit[];
}
export default class SidebarChatList extends Component<SidebarChatListProps, SidebarChatListState>{

    constructor(props: SidebarChatListProps) {
        super(props);
        this.state = {
            chatList: undefined
        };
    }

    async componentDidMount() {
        this.props.chatService.getChatList(this.props.user.id)
            .then(x => this.setState({ chatList: x }))
    }

    render() {
        return (
            <aside className='group chat-sidebar-list chat-scrollbar shadow-lg shadow-black container-sm'>
                <div className='chat-list-search'>
                    <input placeholder='Поиск...' type="text" />
                </div>

                {this.state.chatList?.map((x, i) =>
                    <div key={i} className='group chat-user' tabIndex={i} onClick={() => {
                        this.props.onChatSelected(x);
                    }}>
                        <span className='row-span-2 max-w-[80]'>
                            <img className='chat-image' src={x.user.avatar} alt="" />
                        </span>
                        <span className='col-span-2 group-focus:text-white font-semibold text-lg'>{x.user.name}</span>
                        <div className='text-center text-side-gray flex flex-row group-focus:text-white text-sm items-center justify-center'>
                            <span className='flex justify-center items-center m-1 group-focus:text-white text-green-400'>
                                <BsCheckAll />
                            </span>
                            <p>{x.lastMessage.created.toString()}</p>
                        </div>
                        <span className='col-span-2 text-default-gray group-focus:text-white'>{x.lastMessage.content}</span>
                        <span className='flex justify-center items-center rounded-xl min-w-min text-white'>
                            <p className='
                    group-focus:text-white
                    group-focus:bg-side-indicator-focus 
                      text-center min-w-[40px] p-1 rounded-xl bg-sidebar-ico-focus'>{x.unreadMessagesCount}</p>
                        </span>
                    </div>
                )}
            </aside>
        )
    }
}
