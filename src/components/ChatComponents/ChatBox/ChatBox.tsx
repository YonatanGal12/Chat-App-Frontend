import './ChatBox.css';
import SendMessageBox from '../SendMessageBox/SendMessageBox';
import Message from '../Message/Message';
function ChatBox()
{
    return(
        <div className="chatbox-container">
            <div className="messages-container">
                <div className="snap-to-bottom">
                    <Message content='This is a message for all pe' isSeen={false} senderName='Name' isMine={true}></Message>
                    <Message content='This is a message for all people who have ever doubted me.ple who have ever doubted me.ple who have ever doubted me.ple who have ever doubted me.ple who have ever doubted me.' isSeen={false} senderName='Name'></Message>
                    <Message content='This is a me.' isSeen={false} senderName='Name'></Message>
                    <Message content='This is a message for all people who have evere.' isSeen={false} senderName='Name' isMine={true}></Message>
                    <Message content='This is a message for all people who havr doubted me.' isSeen={false} senderName='Name'></Message>
                    <Message content='This is a message for all people who have ever doubted me.' isSeen={false} senderName='Name' isMine={true}></Message>
                    <Message content='This is a message for all people  ever doubted me.' isSeen={false} senderName='Name'></Message>
                    <Message content='This is a message for all peoplho have ever doubted me.ple who have ever doubted me.ple who have ever doubted me.' isSeen={false} senderName='Name'></Message>
                    <Message content='This is a message for  have ever doubted me.' isSeen={false} senderName='Name'></Message>
                    <Message content='This is a message for all people who have ever doubted me.' isSeen={false} senderName='Name'></Message>
                    <Message content='This is a message for all people who have ever doubted me.people who have ever doubted me.people who have ever doubted me.people who have ever doubted me.' isMine={true} isSeen={false} senderName='Name'></Message>
                    <Message content='This is a message for all people who haved me.' isSeen={false} senderName='Name'></Message>
                    <Message content='This is a message for all people who have ever doubted mepeople who have ever doubted me..' isSeen={false} senderName='Name'></Message>
                    <Message content='This is a message for all people who haved me.' isSeen={false} senderName='Name' isMine={true}></Message>
                    <Message content='This is a message for all people who haved me.' isSeen={false} senderName='Name'></Message>
                    <Message content='This is a message for all people who haved me.' isSeen={false} senderName='Name'></Message>
                </div>
            </div>
            <SendMessageBox></SendMessageBox>
        </div>
    )
}

export default ChatBox;