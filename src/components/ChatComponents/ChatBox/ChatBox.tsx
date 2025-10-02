import './ChatBox.css';
import SendMessageBox from '../SendMessageBox/SendMessageBox';
import Message from '../Message/Message';
import { useContext } from 'react';
import { ChatContext } from '../ChatContainer/ChatContainer';

function ChatBox()
{

    const messages = useContext(ChatContext)?.messages;
    console.log(messages);
    return(
        <div className="chatbox-container">
            <div className="messages-container">
                <div className="snap-to-bottom">
                    {messages?.map((msg) => {
                        return <Message key={`${msg.sender}-${msg.content}`} content={msg.content} senderName={msg.sender} isMine={msg.isMine}></Message>
                    })}
                </div>
            </div>
            <SendMessageBox></SendMessageBox>
        </div>
    )
}

export default ChatBox;