import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setProjects } from '../../store/projects';
import { Modal } from '../../context/Modal'
import NewProject from './NewProject';
import Project from './Project';

function ProjectsPage(){
    const dispatch = useDispatch();
    const projects = useSelector(state => state.projects)
    const userId = useSelector(state => state.session.user.id)

    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        dispatch(setProjects(userId))
    }, [dispatch])

    return (
        <div className='projects'>
            <div className='projects-container'>
            <button onClick={() => setShowModal(!showModal)}>New Project</button>
            <div className='projects-wrapper'>
                {projects && Object.values(projects).map(project => (
                    <div className='project'>
                        <Project project={project}/>
                    </div>
                ))}
                {showModal && (
                    <Modal onClose={() => setShowModal(false)} >
                        <NewProject userId={userId} showModal={setShowModal}/>
                    </Modal>
                )}
            </div>            
            </div>
        </div>
    );
};

export default ProjectsPage;