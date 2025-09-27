import './ChatContainer.css';
import ChatsList from '../ChatsList/ChatsList';
import ChatBox from '../ChatBox/ChatBox';
import { useSocket } from '../../../hooks/useSocket';
import { createContext } from 'react';
import { type ChatMessage, type AllUsersContextType } from '../../../types/chatTypes';


export const HandleSendMessageContext = createContext< ((data: Omit<ChatMessage, "isMine">) => void) | undefined>(undefined);

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
        newGroupChatCreated
    } = useSocket();

    return(
        <div className='chat-container'>
            <AllUsersContext.Provider value={{allUsers, fetchAllUsers, newGroupChatCreated}}>
                <ChatsList groupchats={groupchats}></ChatsList>
            </AllUsersContext.Provider>
            <HandleSendMessageContext.Provider value={handleSendMessage}>
                <ChatBox></ChatBox>
            </HandleSendMessageContext.Provider>
        </div>
    )
}

export default ChatContainer;