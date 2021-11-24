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
            <div className='projects-header'>
                <h3>Project Board</h3>
                <button className='update-menu' onClick={() => setShowModal(!showModal)}>New Project</button>
            </div>
            {Object.values(projects).length 
                ?
                    <div className='projects-container'>
                        <div className='projects-wrapper'>
                            { Object.values(projects).map(project => (
                                    <div key={`project-${project.id}`} className='project'>
                                        <Project project={project}/>
                                    </div>
                                ))}
                        </div>            
                    </div>
                :
                    <p className='projects-notice'>No projects on your current board.</p>
            }
            {showModal && (
                <Modal onClose={() => setShowModal(false)} >
                    <NewProject userId={userId} showModal={setShowModal}/>
                </Modal>
            )}
        </div>
    );
};

export default ProjectsPage;