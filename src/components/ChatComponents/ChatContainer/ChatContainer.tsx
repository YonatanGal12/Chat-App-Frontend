import './ChatContainer.css';
import ChatsList from '../ChatsList/ChatsList';
import ChatBox from '../ChatBox/ChatBox';
import { useSocket } from '../../../hooks/useSocket';
import { createContext } from 'react';
import { type ChatMessage, type AllUsersContextType, type ChatContextType } from '../../../types/chatTypes';


export const ChatContext = createContext<ChatContextType | null>(null);

export const AllUsersContext = createContext<AllUsersContextType | null>(null)

function ChatContainer()
{
    const {
        handleSendMessage,
        messages,
        setMessages,
        groupchats,
        setGroupchats,
        allUsers,
        fetchAllUsers,
        newGroupChatCreated,
        getAllMessagesFromGroupchat
    } = useSocket();

    return(
        <div className='chat-container'>
            <AllUsersContext.Provider value={{allUsers, fetchAllUsers, newGroupChatCreated, groupchats, getAllMessagesFromGroupchat}}>
                <ChatsList></ChatsList>
            </AllUsersContext.Provider>
            <ChatContext.Provider value={{handleSendMessage, messages}}>
                <ChatBox></ChatBox>
            </ChatContext.Provider>
        </div>
    )
}

export default ChatContainer;