import './CreateGC.css';
import { useState } from 'react';
import NewGCModal from '../NewGCModal/NewGCModal';

function CreateGC()
{
    const [wasClicked, setWasClicked] = useState(false);

    return(
        <>
            { wasClicked ? 
                    <NewGCModal></NewGCModal>
                :
                    <button className='createGC-btn' onClick={_ => setWasClicked(true)}>Create new group chat</button>  
            }
        </>
    )
}

export default CreateGC;