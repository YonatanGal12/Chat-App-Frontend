import './NewGCModal.css';
import Field from '../../AuthComponents/AuthComponents/Field/Field';
import { useState, useContext, useEffect } from 'react';
import { AllUsersContext } from '../ChatContainer/ChatContainer';

type NewGCModalProps = {
    setWasClicked: (data: boolean) => void
}

function NewGCModal({setWasClicked}: NewGCModalProps)
{
    const allUsersContext = useContext(AllUsersContext);
    const [gcName, setGCName] = useState(' ');
    const [isShowing, setIsShowing] = useState(true);
    const [gcMembers, setGCMembers] = useState<string[]>([]);

    useEffect(() => {
        allUsersContext?.fetchAllUsers();
    },[])

    function handleToggleUser(username: string) {
        setGCMembers(prev =>prev.includes(username) ? prev.filter(u => u !== username) : [...prev, username]);
    }

    function handleClicked(){
        setWasClicked(false);
        allUsersContext?.newGroupChatCreated(gcName,gcMembers);
    }

    return(
        <>
            <div className="newGC-modal-container">
                <div className="newGC-modal">
                    <Field fieldName='New Chat name' setField={setGCName}></Field>
                    <div className="label-container">
                        <label>Members</label>
                    </div>                    
                    <div className="all-users-container">
                        {allUsersContext?.allUsers?.map(u => {
                            return <div key={u} className={`user-item ${gcMembers.includes(u) ? 'selected' : ''}`} onClick={() => handleToggleUser(u)}>{u}</div>
                        })}
                    </div>
                    <button className='createNewGC-btn' onClick={() => handleClicked()}>Create Groupchat</button>
                </div>
            </div>
        </>
    )
}

export default NewGCModal;