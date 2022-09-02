import { useEffect, useState } from 'react'
import { BsCheckAll } from "@react-icons/all-files/bs/BsCheckAll";
import { ChatListUnit } from '../models/chat-models';
import { UserDTO } from '../models/user-models';
import { useInjection } from '../extensions/di-container';
import { getDateString } from '../extensions/global-extensions';
import { useTypedSelector } from '../store/store';
import { useActions } from '../store/use-actions';
import { Loading } from './helpers/loading';


type SidebarChatListProps = {
    user: UserDTO;
    onChatSelected: (chat: ChatListUnit) => void;
}

export const SidebarChatList = (props: SidebarChatListProps) => {
    const { onChatSelected, user } = props;
    const { chatService } = useInjection();
    const { chatList, error, loading } = useTypedSelector(state => state.chatListReducer);
    const { fetchChatList } = useActions();

    useEffect(() => {
        fetchChatList(chatService, user.id);
    }, [])

    return (
        <aside className='group 
            chat-sidebar-list chat-scrollbar shadow-lg shadow-black container-sm'>
            <div className='chat-list-search'>
                <input placeholder='Поиск...' type="text" />
            </div>
            {error ?? error}
            {loading && <Loading />}
            {chatList?.map((x, i) =>
                <div key={i} className='group chat-user' tabIndex={i} onClick={() => onChatSelected(x)}>
                    <span className='row-span-2'>
                        <img className='chat-image' src={x.user.avatar} alt="" />
                    </span>
                    <span className='col-span-2 group-focus:text-white font-semibold text-lg'>{x.user.name}</span>
                    <div className='text-center text-side-gray flex flex-row group-focus:text-white text-sm items-center justify-center'>
                        <span className='flex justify-center items-center m-1 group-focus:text-white text-green-400'>
                            <BsCheckAll />
                        </span>
                        <p>{getDateString(x.lastMessage.created)}</p>
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
