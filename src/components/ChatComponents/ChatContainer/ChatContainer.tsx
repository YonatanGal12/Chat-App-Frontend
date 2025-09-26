import './ChatContainer.css';
import ChatsList from '../ChatsList/ChatsList';
import ChatBox from '../ChatBox/ChatBox';
import { useSocket } from '../../../hooks/useSocket';
import { createContext } from 'react';
import { type ChatMessage } from '../../../types/types';

export const HandleSendMessageContext = createContext< ((data: Omit<ChatMessage, "isMine">) => void) | undefined>(undefined);

function ChatContainer()
{
    const {
        handleSendMessage,
        messages,
        setMessages,
        groupchats,
        setGroupchats
    } = useSocket();

    return(
        <div className='chat-container'>
            <ChatsList groupchats={groupchats}></ChatsList>
            <HandleSendMessageContext.Provider value={handleSendMessage}>
                <ChatBox></ChatBox>
            </HandleSendMessageContext.Provider>
        </div>
    )
}

export default ChatContainer;