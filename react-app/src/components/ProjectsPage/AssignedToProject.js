import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteProjectAssignment } from '../../store/projects';

import './Project.css'

function AssignedToProject({cook, projectId}){

    const dispatch = useDispatch()

    const [isHover, setIsHover] = useState(false)

    const unassignCook = () => {
        dispatch(deleteProjectAssignment(projectId, cook.id))
    }

    return (
        <div onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
            <div className='cook-avatar' style={{backgroundImage: `url('${cook.avatar}')`}} />
            <p>{cook.name}</p>
            <p>{cook.position}</p>
            <button 
                className={isHover ? 'button-hovered' :'button'} 
                onClick={unassignCook}
            >
            Unassign
            </button>
        </div>
    );
};

export default AssignedToProject;