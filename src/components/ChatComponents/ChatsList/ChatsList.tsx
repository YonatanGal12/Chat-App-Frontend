import './ChatsList.css';
import ChatItem from '../ChatItem/ChatItem';
import CreateGC from '../CreateGC/CreateGC';
import { useContext, useState } from 'react';
import { AllUsersContext } from '../ChatContainer/ChatContainer';

function ChatsList()
{

    const allUsersContext = useContext(AllUsersContext);
    const chats = allUsersContext?.groupchats;
    const notifications = allUsersContext?.notifications;
    const getAllMessagesFromGroupchat = allUsersContext?.getAllMessagesFromGroupchat;
    const handleLogout = allUsersContext?.handleLogout;

    const [selectedChat, setSelectedChat] = useState<string | null>(null);
    const [hovered, setHovered] = useState(false);


    function handleSelectChat(chatName: string) {
        setSelectedChat(chatName);
        getAllMessagesFromGroupchat?.(chatName);
    }

    let whatToShow;
    chats ? whatToShow = <div className='chats-list-container'>
                            <div className="chats-list">
                                {chats.map((chat) => {
                                return <ChatItem key={chat.chatName} chatName={chat.chatName} isSelected={chat.chatName === selectedChat} onSelect={handleSelectChat}
                                isNotificated={notifications?.includes(chat.chatName)}></ChatItem>
                            })}
                            </div>
                        </div>
                        :
                        <div className='chats-list-container'></div>
    


    return(
        <>
            <div className='chats-options-container'>
                <button className="user-display" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onClick={handleLogout}>
                    {hovered ? "Log Out" : allUsersContext?.username}
                </button>
                {whatToShow}
                <CreateGC></CreateGC>
            </div>
        </>
    )
}

export default ChatsList;