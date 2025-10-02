import { useState, useContext } from 'react';
import './SendMessageBox.css';
import { ChatContext } from '../ChatContainer/ChatContainer';

function SendMessageBox()
{

    const handleSendMessage = useContext(ChatContext)?.handleSendMessage;

    const [message, setMessage] = useState("");
    const isTyping = message.length > 0;

    function onSendMessage(){

        if(!handleSendMessage || message.trim() === "")
            return;

        handleSendMessage({
            content: message,
            sender: "me"
        });

        setMessage('');
    }

    let buttonToShow = <button className={isTyping? 'send-message-btn' : 'disabled-message-btn'} onClick={onSendMessage} disabled={!isTyping}></button>;

    return(
        <>
            <div className="send-message-container">
                <textarea className='message-box-input' placeholder='Write a message...' value={message} onChange={e => {setMessage(e.target.value);}} />
                {buttonToShow}
            </div>
        </>
    )
}

export default SendMessageBox;