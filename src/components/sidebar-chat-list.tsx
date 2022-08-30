import React, { Component } from 'react'
import { BsCheckAll } from "@react-icons/all-files/bs/BsCheckAll";
import { UsersChat } from '../models/chat';

type SidebarChatListProps = {
    chats?: UsersChat[];
    onUserSelected: (user: UsersChat) => void;
}


export default class SidebarChatList extends Component<SidebarChatListProps>{

    private _selectedUser?: UsersChat;

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
                {this.props.chats?.map((x, i) =>
                    <div key={i} className='group chat-user' tabIndex={i} onClick={() => this.props.onUserSelected(x)}>
                        <span className='row-span-2 max-w-[80]'>
                            <img className='chat-image' src={x.user.avatar} alt="" />
                        </span>
                        <span className='col-span-2 group-focus:text-white font-semibold text-lg'>{x.user.name}</span>
                        <span className='text-center text-side-gray flex flex-row group-focus:text-white text-sm items-center justify-center'>
                            <span className='flex justify-center items-center m-1 group-focus:text-white text-green-400'>
                                <BsCheckAll />
                            </span>
                            {this.getCurrentDate('.', x.messages?.at(x.messages?.length - 1)?.date!)}
                        </span>
                        <span className='col-span-2 text-default-gray group-focus:text-white'>{x.messages?.at(x.messages?.length - 1)?.content}</span>
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
