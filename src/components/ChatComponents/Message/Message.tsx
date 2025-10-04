import './Message.css';

type MessageProps = {
    content: string,
    senderName: string,
    sentAt?: string,
    isMine?: boolean
}

function Message(props: MessageProps)
{


    function formatTime(time: string | undefined){

        if(!time) return;

        const date = new Date(time);
        const hours = date.getHours().toString().padStart(2,'0');
        const minutes = date.getMinutes().toString().padStart(2,'0');

        return `     ${hours}:${minutes}`
    }

    let whatToShow;
    props.isMine ? 
        whatToShow = <div className="message-container-mine">
            <div className="name-container-mine">
                <span>{formatTime(props.sentAt)}</span>
            </div>
            {props.content}
        </div>
        :
        whatToShow = <div className="message-container">
            <div className="name-container">
                <span>{props.senderName}</span>
                <span>{formatTime(props.sentAt)}</span>
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