import './ChatContainer.css';
import ChatsList from '../ChatsList/ChatsList';
import ChatBox from '../ChatBox/ChatBox';
import { useSocket } from '../../../hooks/useSocket';
import { createContext } from 'react';
import { type ChatMessage, type AllUsersContextType, type ChatContextType } from '../../../types/chatTypes';
import { useState } from 'react';
import AuthForm from '../../AuthComponents/AuthComponents/AuthForm/AuthForm';

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
        getAllMessagesFromGroupchat,
        username,
        notifications,
        handleLogout,
        currentChat
    } = useSocket();

    const [isLoggedOut, setIsLoggedOut] = useState(false);

    function logout() {
        handleLogout?.();
        setIsLoggedOut(true);
    }

    if (isLoggedOut) {
        return <AuthForm />;
    }

    return(
        <div className='chat-container'>
            <AllUsersContext.Provider value={{allUsers, fetchAllUsers, newGroupChatCreated, groupchats, getAllMessagesFromGroupchat, username, notifications, handleLogout: logout}}>
                <ChatsList></ChatsList>
            </AllUsersContext.Provider>
            <ChatContext.Provider value={{handleSendMessage, messages, currentChat}}>
                <ChatBox></ChatBox>
            </ChatContext.Provider>
        </div>
    )
}

export default ChatContainer;