import './ChatsList.css';
import ChatItem from '../ChatItem/ChatItem';
import CreateGC from '../CreateGC/CreateGC';
import { type Groupchat } from '../../../types/chatTypes';

type ChatsListProps = {
    groupchats: Groupchat[]
}

function ChatsList(props: ChatsListProps)
{
    return(
        <div className='chats-options-container'>
            <div className='chats-list-container'>
                {props.groupchats.map((chat) => {
                    return <ChatItem key={chat.groupchatName} chatName={chat.groupchatName}></ChatItem>
                })}
            </div>
            <CreateGC></CreateGC>
        </div>
    )
}

export default ChatsList;