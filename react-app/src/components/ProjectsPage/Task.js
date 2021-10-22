import { useDispatch } from 'react-redux';
import { updateProjectTask } from '../../store/projects';
import { useState } from 'react';

function Task({task}){
    const dispatch = useDispatch();

    const [completed, setCompleted] = useState(task.completed);
    const [isHovered, setIsHovered] = useState(false)

    const toggleCompletion = async () => {
        task.completed = completed
        await setCompleted(!completed)
        await dispatch(updateProjectTask(task))
    };

    return (
        <div onClick={toggleCompletion} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <p>{task.description}<span>{completed ? ' completed' : ''}</span></p>
            {(isHovered && !completed) && (
                <button>Delete Task</button>
            )}
        </div>
    );
};

export default Task;