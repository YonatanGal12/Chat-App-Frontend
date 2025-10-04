import './ChatBox.css';
import SendMessageBox from '../SendMessageBox/SendMessageBox';
import Message from '../Message/Message';
import { useContext } from 'react';
import { ChatContext } from '../ChatContainer/ChatContainer';

function ChatBox()
{

    const messages = useContext(ChatContext)?.messages;
    const currentChat = useContext(ChatContext)?.currentChat;

    return(
        <div className="chatbox-container">
            <div className="messages-container">
                <div className="snap-to-bottom">
                    {messages?.map((msg) => {
                        return <Message key={`${msg.sender}-${msg.sentAt}`} content={msg.content} senderName={msg.sender} sentAt={msg.sentAt} isMine={msg.isMine}></Message>
                    })}
                </div>
            </div>
            {currentChat === null ? <></> : <SendMessageBox></SendMessageBox>}
        </div>
    )
}

export default ChatBox;