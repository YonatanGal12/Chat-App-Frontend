import './ChatsList.css';
import ChatItem from '../ChatItem/ChatItem';
import CreateGC from '../CreateGC/CreateGC';
import { useContext, useState } from 'react';
import { AllUsersContext } from '../ChatContainer/ChatContainer';

function ChatsList()
{

    const allUsersContext = useContext(AllUsersContext);
    const chats = allUsersContext?.groupchats;
    const getAllMessagesFromGroupchat = allUsersContext?.getAllMessagesFromGroupchat;

    const [selectedChat, setSelectedChat] = useState<string | null>(null);

    function handleSelectChat(chatName: string) {
        setSelectedChat(chatName);
        getAllMessagesFromGroupchat?.(chatName);
    }


    let whatToShow;
    chats ? whatToShow = <div className='chats-list-container'>
                            {chats.map((chat) => {
                                return <ChatItem key={chat.chatName} chatName={chat.chatName} isSelected={chat.chatName === selectedChat} onSelect={handleSelectChat}></ChatItem>
                            })}
                        </div>
                        :
                        <div className='chats-list-container'></div>


    return(
        <div className='chats-options-container'>
            {whatToShow}
            <CreateGC></CreateGC>
        </div>
    )
}

export default ChatsList;