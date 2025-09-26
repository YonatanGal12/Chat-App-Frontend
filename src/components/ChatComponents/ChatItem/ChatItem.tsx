import './ChatItem.css';

type ChatItemProps = {
    chatName: string
}

function ChatItem(props: ChatItemProps)
{
    return(
        <div className="chat-item">
            <img src="/images/defaultChatIcon.png" alt="img" className='chat-image' />
            <div className="chat-details-container">
                <span className='chat-name'>{props.chatName}</span>
            </div>
        </div>
    )
}

export default ChatItem;