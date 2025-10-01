import './CreateGC.css';
import { useState } from 'react';
import NewGCModal from '../NewGCModal/NewGCModal';


function CreateGC()
{
    const [wasClicked, setWasClicked] = useState(false);

    return(
        <>
            {wasClicked ? 
                    <>
                        <NewGCModal setWasClicked={setWasClicked}></NewGCModal>
                        <button className='createGC-btn clicked' onClick={_ => setWasClicked(false)}>Exit</button> 
                    </> 
                    :
                    <>
                        <button className='createGC-btn' onClick={_ => setWasClicked(true)}>Create New Groupchat</button>  
                    </>
            }
        </>
    )
}

export default CreateGC;