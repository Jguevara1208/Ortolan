import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setProjects } from '../../store/projects';
import ProgressProvider from './ProgressProvider'
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';

function ProjectsPage(){
    const dispatch = useDispatch();
    const projects = useSelector(state => state.projects)
    const userId = useSelector(state => state.session.user.id)
    const [valueEnd, setValueEnd] = useState(70)

    useEffect(() => {
        dispatch(setProjects(userId))
    }, [dispatch])

    return (
        <div>
            {projects && Object.values(projects).map(project => (
                <div>
                    <p>{project.title}</p>
                    <p>{project.description}</p>
                    <div>
                        <p>Assigned to Project</p>
                        {project.assigned.map(cook => (
                            <p>{cook.name}</p>
                        ))}
                    </div>
                    <div>
                        <p>Tasks</p>
                        {project.tasks.map(task => (
                            <div>
                                <label htmlFor="task">{task.description}</label>
                                <input name='task' type="checkbox" value={task.completed}/>
                            </div>
                        ))}
                    </div>
                    <div style={{ width: 100, height: 100 }}>
                        <ProgressProvider valueStart={10} valueEnd={valueEnd}>
                            {value => <CircularProgressbar
                                value={value}
                                text={`${value}%`}
                                strokeWidth={15}
                                styles={buildStyles({
                                    textSize: '25px',
                                    rotation: 0.25,
                                    pathTransitionDuration: 1,
                                    pathColor: `#65916c`,
                                    textColor: `#65916c`,
                                    trailColor: '#d6d6d6',
                                })}
                            />}
                        </ProgressProvider>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProjectsPage;