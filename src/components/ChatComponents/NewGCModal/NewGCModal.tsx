import './NewGCModal.css';
import Field from '../../AuthComponents/AuthComponents/Field/Field';
import { useState } from 'react';

function NewGCModal()
{
    const [gcName, setGCName] = useState(' ');
    const [isShowing, setIsShowing] = useState(true);
    const [gcMembers, setGCMembers] = useState(' ');
    return(
        <>
            <div className="newGC-modal-container">
                <div className="newGC-modal">
                    <Field fieldName='New group chat name' setField={setGCName}></Field>
                    <Field fieldName='Members' setField={setGCMembers}></Field>
                    <div className="all-users-container">
                        
                    </div>
                    <button className='createNewGC-btn'>Create Groupchat</button>
                </div>
            </div>
        </>
    )
}

export default NewGCModal;