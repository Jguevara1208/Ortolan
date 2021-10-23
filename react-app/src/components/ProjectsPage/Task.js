import { useDispatch } from 'react-redux';
import { updateProjectTask, deleteTaskThunk } from '../../store/projects';
import { useState } from 'react';

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
        <div onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <div onClick={toggleCompletion} >
                <p>{task.description}<span>{completed ? ' completed' : ''}</span></p>
            </div>
                {(isHovered && !completed) && (
                    <button onClick={deleteTask}>Delete Task</button>
                )}
        </div>
    );
};

export default Task;