import React, { Component } from 'react'
import { BsCheckAll } from "@react-icons/all-files/bs/BsCheckAll";
import { UserChatList } from '../models/user';
import { ChatModel } from '../models/chat';

type SidebarChatListProps = {
    userChatList?: UserChatList;
    onChatSelected: (chat: ChatModel) => void;
}


export default class SidebarChatList extends Component<SidebarChatListProps>{

    getCurrentDate(separator = '', d: Date) {
        let date = d.getDate();
        let month = d.getMonth() + 1;
        let year = d.getFullYear();
        return `${date}${separator}${month < 10 ? `0${month}` : `${month}`}${separator}${year}`
    }

    render() {
        return (
            <aside className='group chat-sidebar-list chat-scrollbar shadow-lg shadow-black container-sm'>
                <div className='chat-list-search'>
                    <input placeholder='Поиск...' type="text" />
                </div>
                {this.props.userChatList?.chatList?.map((x, i) =>
                    <div key={i} className='group chat-user' tabIndex={i} onClick={() => {
                        this.props.onChatSelected(x);
                    }
                    }>
                        <span className='row-span-2 max-w-[80]'>
                            <img className='chat-image' src={x.userDTO.avatar} alt="" />
                        </span>
                        <span className='col-span-2 group-focus:text-white font-semibold text-lg'>{x.userDTO.name}</span>
                        <span className='text-center text-side-gray flex flex-row group-focus:text-white text-sm items-center justify-center'>
                            <span className='flex justify-center items-center m-1 group-focus:text-white text-green-400'>
                                <BsCheckAll />
                            </span>
                            {this.getCurrentDate('.', x.userDTO.messages?.at(x.userDTO.messages?.length - 1)?.date!)}
                        </span>
                        <span className='col-span-2 text-default-gray group-focus:text-white'>{x.userDTO.messages?.at(x.userDTO.messages?.length - 1)?.content}</span>
                        <span className='flex justify-center items-center rounded-xl min-w-min text-white'>
                            <p className='
                    group-focus:text-white
                    group-focus:bg-side-indicator-focus 
                      text-center min-w-[40px] p-1 rounded-xl bg-sidebar-ico-focus'>{100}</p>
                        </span>
                    </div>
                )}
            </aside>
        )
    }
}
