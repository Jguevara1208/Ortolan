import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProject, addTaskThunk } from '../../store/projects';

function NewProject({userId, showModal}){
    const dispatch = useDispatch()

    const [tasks, setTasks] = useState([{description: ''}])
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        let newProject = await dispatch(createProject({title, description, userId}))
        if (tasks[0].description !== '') {
            for (let i = 0; i < tasks.length; i++) {
                let task = tasks[i]
                let desc = task.description
                await dispatch(addTaskThunk({description: desc, projectId: newProject.id}))
            }
        }
        showModal(false)
    }

    const addTaskInput = () => {
        const list = [...tasks, { description: '' }]
        setTasks(list)
    }

    const removeTaskInput = (index) => {
        const list = [...tasks]
        list.splice(index, 1)
        setTasks(list)
    }

    const handleInputChangeTask = (e, index) => {
        const { name, value } = e.target
        const list = [...tasks]
        list[index][name] = value
        setTasks(list)
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title</label>
                    <input 
                        name='title'
                        type="text"
                        placeholder='Project Title'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="projectDescription">Description</label>
                    <input 
                        name='projectDescription'
                        type="text" 
                        placeholder='Project Description'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <p>Tasks</p>
                {tasks.map( (task, i) => (
                    <div>
                        <input 
                            type="text" 
                            name='description'
                            placeholder='Describe the task'
                            value={task.description}
                            onChange={(e) => handleInputChangeTask(e, i)}
                        />
                        {tasks.length !== 1 && <button onClick={() => removeTaskInput(i)} >Remove This Task</button> }
                        {tasks.length - 1 === i && <button onClick={addTaskInput} >Add Another Task</button> }
                    </div>
                ))}
                <button onClick={handleSubmit} >Create Project</button>
            </form>
        </div>
    );
};

export default NewProject