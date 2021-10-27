import { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import { addTaskThunk, addProjectAssignment, deleteProject } from '../../store/projects';
import { setTeamMembers } from '../../store/teamMembers';
import ProgressProvider from './ProgressProvider'
import AssignedToProject from './AssignedToProject';
import Task from './Task';

function Project({project}){

    const dispatch = useDispatch()

    const userId = useSelector(state => state.session.user.id)
    const team = useSelector(state => state.teamMembers)
    const projects = useSelector(state => state.projects)
    
    const [valueEnd, setValueEnd] = useState(0)
    const [isHovered, setIsHovered] = useState(false)
    const [addTask, setAddTask] = useState(false)
    const [newTask, setNewTask] = useState('')
    const [showMembers, setShowMembers] = useState(false)
    
    const calculateCompletion = () => {
        const tasks = project.tasks
        const totalTasks = tasks.length
        let percent = 0
        if (totalTasks !== 0) {
            const totalCompletedTasks = tasks.reduce((acc, task) => {
                if (task.completed) acc += 1
                return acc
            }, 0);
            percent = ((totalCompletedTasks / totalTasks) * 100)
            percent >= 100 ? percent = +(percent.toString().slice(0, 3)) : percent = +(percent.toString().slice(0, 2))
        }
        setValueEnd(percent)
    }

    useEffect(() => {
        calculateCompletion()
    }, [projects])

    useEffect(() => {
        dispatch(setTeamMembers(userId))
    }, [dispatch])


    const removeProject = async () => {
        await dispatch(deleteProject(project.id))
    }

    const assignCook = async (userId) => {
        let users = project.assigned.map(cook => cook.id)
        let assignedAlready = users.find(cookId => cookId === userId)
        if (!assignedAlready){
            await dispatch(addProjectAssignment(project.id, userId))
            setShowMembers(false)
        }
    }

    const freeCook = (cookId) => {
        let assigned = project.assigned.find(cook => cook.id === cookId)
        console.log(cookId)
        return assigned === undefined ? true : false
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
            <div className='pc-wrapper' onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                <div className='pc-top'>
                    <p>{project.title}</p>
                    <button className={isHovered ? 'button-visible pc-button' : 'pc-button'} onClick={removeProject} >Remove</button>
                </div>
                <p className='pc-desc'>{project.description ? project.description : 'No description'}</p>
                <div className='atp-section'>
                    <div className='pp-assign-container'>
                        <p className='atp-header'>Assigned to Project</p>
                        <div className='pp-assign'>
                            <button onClick={() => setShowMembers(!showMembers)}>Assign</button>
                            {showMembers && (
                                <div className='assign-list'>
                                    {team && team.map(cook => (
                                        <>
                                            {freeCook(cook.id) && (
                                                <div className='cook' onClick={() => assignCook(cook.id)}>
                                                    <div className='cook-avatar2' style={{backgroundImage: `url('${cook.avatar}')`}}/>
                                                    <p>{cook.name.split(' ')[0]}</p>
                                                </div>
                                            )}
                                        </>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='all-assigned'>
                        {project.assigned.map(cook => (
                            <AssignedToProject cook={cook} projectId={project.id}/>
                        ))}
                    </div>
                </div>
                <div className='tasks-container'>
                    <div className='pp-tasks'>
                        <p className='task-header'>Tasks</p>
                        {project.tasks.map(task => (
                            <div>
                                <Task task={task} calculateCompletion={calculateCompletion}/>
                            </div>
                        ))}
                        <div className={isHovered ? 'add-task-hovered' : 'add-task'}>
                            {!addTask 
                                ? 
                                <button className='add-task-button' onClick={() => setAddTask(true)}>
                                    add task
                                </button>
                                :
                                <>
                                    <div className='ol-input task-input'>
                                        <input name='task' type="text" placeholder=' ' value={newTask} onChange={(e) => setNewTask(e.target.value)}/>
                                        <label htmlFor="task">Task</label>
                                    </div>
                                    <button className='task-add' onClick={handleAddTask}>Add</button>
                                    <button className='task-cancel' onClick={() => setAddTask(false)}>Cancel</button>
                                </>
                            }
                        </div>
                    </div>
                    <div className='progress' style={{ width: 100, height: 100 }}>
                        <ProgressProvider valueStart={0} valueEnd={valueEnd}>
                            {value => <CircularProgressbar
                                value={value}
                                text={`${value}%`}
                                strokeWidth={8}
                                styles={buildStyles({
                                    textSize: '20px',
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
        </div>
    );
};

export default Project;