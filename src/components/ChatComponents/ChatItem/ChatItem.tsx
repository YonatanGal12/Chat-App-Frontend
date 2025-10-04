import './ChatItem.css';

type ChatItemProps = {
    chatName: string,
    isSelected: boolean,
    onSelect: (chatName: string) => void,
    isNotificated?: boolean
}

function ChatItem(props: ChatItemProps)
{


    return(
        <div className={`chat-item ${props.isSelected ? "selected" : ""}`} onClick={() => props.onSelect(props.chatName)}>
            <img src="/images/defaultChatIcon.png" alt="img" className='chat-image' />
            <div className="chat-details-container">
                <span className='chat-name'>{props.chatName}</span>
                {props.isNotificated ?  <div className='notification-div'></div> : <></>
                }
            </div>
        </div>
    )
}

export default ChatItem;