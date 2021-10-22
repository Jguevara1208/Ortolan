import { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import { addTaskThunk, addProjectAssignment } from '../../store/projects';
import { setTeamMembers } from '../../store/teamMembers';
import ProgressProvider from './ProgressProvider'
import AssignedToProject from './AssignedToProject';
import Task from './Task';

function Project({project}){

    const dispatch = useDispatch()

    const userId = useSelector(state => state.session.user.id)
    const team = useSelector(state => state.teamMembers)

    const [valueEnd, setValueEnd] = useState(70)
    const [isHovered, setIsHovered] = useState(false)
    const [addTask, setAddTask] = useState(false)
    const [newTask, setNewTask] = useState('')
    const [showMembers, setShowMembers] = useState(false)

    useEffect(() => {
        dispatch(setTeamMembers(userId))
    }, [dispatch])

    const removeProject = () => {

    }

    const assignCook = async (userId) => {
        await dispatch(addProjectAssignment(project.id, userId))
        setShowMembers(false)
    }

    const handleAddTask = async () => {
        const req = {
            projectId: project.id,
            description: newTask
        }
        await dispatch(addTaskThunk(req))
        setAddTask(false)
    }
    
    return (
        <div>
            <div onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                <div>
                    <p>{project.title}</p>
                    <button onClick={removeProject} >Remove Project</button>
                </div>
                <p>{project.description}</p>
                <div>
                    <p>Assigned to Project</p>
                    {project.assigned.map(cook => (
                        <AssignedToProject cook={cook} projectId={project.id}/>
                    ))}
                    <div>
                        <button onClick={() => setShowMembers(!showMembers)}>Assign Member</button>
                        {showMembers && (
                            <div>
                                {team && team.map(cook => (
                                    <div onClick={() => assignCook(cook.id)}>
                                        <div className='cook-avatar' style={{backgroundImage: `url('${cook.avatar}')`}}/>
                                        <p>{cook.name}</p>
                                        <p>{cook.position}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                </div>
                <div>
                    <p>Tasks</p>
                    {project.tasks.map(task => (
                        <div>
                            <Task task={task}/>
                        </div>
                    ))}
                    <div className={isHovered ? 'add-task-hovered' : 'add-task'}>
                        {!addTask 
                            ? 
                            <button onClick={() => setAddTask(true)}>
                                add task
                            </button>
                            :
                            <>
                                <input type="text" placeholder='New Task' value={newTask} onChange={(e) => setNewTask(e.target.value)}/>
                                <button onClick={handleAddTask}>Add</button>
                                <button onClick={() => setAddTask(false)}>Cancel</button>
                            </>
                        }
                    </div>
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
        </div>
    );
};

export default Project;