import { useDispatch } from 'react-redux';
import { updateProjectTask, deleteTaskThunk } from '../../store/projects';
import { useState } from 'react';
import {CgRemoveR} from 'react-icons/cg'

function Task({task, calculateCompletion}){
    const dispatch = useDispatch();

    const [completed, setCompleted] = useState(task.completed);
    const [isHovered, setIsHovered] = useState(false)

    const toggleCompletion = async () => {
        task.completed = !completed
        await setCompleted(!completed)
        await dispatch(updateProjectTask(task))
        calculateCompletion()
    };

    const deleteTask = async (e) => {
        e.stopPropagation()
        await dispatch(deleteTaskThunk({projectId: task.projectId, id: task.id}))
        calculateCompletion()
    };

    return (
        <div className='task-container' onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <div className='task-wrapper'>
                <div className={completed ? 'task-completed' : 'task-uncomplete'} onClick={toggleCompletion} >
                    <p><span>{completed ? '✓ ' : ''}</span>{task.description}</p>
                </div>
                    {!completed && (
                        <CgRemoveR className={isHovered ? 'task-delete task-delete-hovered' : 'task-delete'} onClick={deleteTask}/>
                    )}
            </div>
        </div>
    );
};

export default Task;