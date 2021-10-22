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
        <div>
            {projects && Object.values(projects).map(project => (
                <div>
                    <Project project={project}/>
                </div>
            ))}
            <button onClick={() => setShowModal(!showModal)}>Add New Project</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)} >
                    <NewProject userId={userId}/>
                </Modal>
            )}
        </div>
    );
};

export default ProjectsPage;