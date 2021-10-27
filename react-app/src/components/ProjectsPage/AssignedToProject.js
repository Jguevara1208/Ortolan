import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteProjectAssignment } from '../../store/projects';
import { CgRemoveR } from 'react-icons/cg'

import './Project.css'

function AssignedToProject({cook, projectId}){

    const dispatch = useDispatch()

    const [isHover, setIsHover] = useState(false)

    const unassignCook = () => {
        dispatch(deleteProjectAssignment(projectId, cook.id))
    }

    return (
        <div className='atp-user' onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
            <div className='cook-avatar' style={{backgroundImage: `url('${cook.avatar}')`}} />
            <div className='atp-np'>
                <p className='atp-name'>{cook.name.split(' ').map(n => n[0]).join('')} </p>
                <p className='atp-pos'>{cook.position.split(' ').map(n => n[0]).join('')}</p>
            </div>
            <CgRemoveR 
                className={isHover ? 'atp-hovered atp-remove' : 'atp-remove'}
                onClick={unassignCook}
                />
        </div>
    );
};

export default AssignedToProject;