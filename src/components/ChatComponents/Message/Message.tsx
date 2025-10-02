import './Message.css';

type MessageProps = {
    content: string,
    senderName: string,
    isMine?: boolean
}
function Message(props: MessageProps)
{

    let whatToShow;
    props.isMine ? 
        whatToShow = <div className="message-container-mine">
            {props.content}
        </div>
        :
        whatToShow = <div className="message-container">
            <div className="name-container">
                {props.senderName}
            </div>
            {props.content}
        </div>
    

    return(
        <> 
            {whatToShow}
        </>
    );
}

export default Message;