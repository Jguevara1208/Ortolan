import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createProject, addTaskThunk } from '../../store/projects';
import { CgRemoveR, CgAddR } from 'react-icons/cg'

function NewProject({userId, showModal}){
    const dispatch = useDispatch()

    const [tasks, setTasks] = useState([{description: ''}])
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [errors, setErrors] = useState('')

    const handleErrors = () => {
        const err = {}
        if (title === '' || title === ' ') err['title'] = '• Project needs a title.'
        return err
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const res = handleErrors()
        if (res['title']) {
            setErrors(res)
            return 
        } else {
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

    const autoExpand = (field) => {
        field.style.height = 'inherit'
        const computed = window.getComputedStyle(field)
        const height = parseInt(computed.getPropertyValue('border-top-width'), 10)
            + parseInt(computed.getPropertyValue('padding-top'), 10)
            + field.scrollHeight
            + parseInt(computed.getPropertyValue('padding-bottom'), 10)
            + parseInt(computed.getPropertyValue('border-bottom-width'), 10)
        field.style.height = height + 'px'
    }

    const handleTextArea = (e) => {
        autoExpand(e.target);
    }

    return (
        <div>
            <form className='project-form' onSubmit={handleSubmit} autoComplete='off'>
                <h3>New Project</h3>
                {errors['title'] && <p className='error'>{errors['title']}</p> }
                <div className='ol-input'>
                    <input 
                        name='title'
                        type="text"
                        placeholder=' '
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <label htmlFor="title">Title</label>
                </div>
                <div className='ol-input'>
                    <textarea
                        name="projectDescription"
                        className='p-desc'
                        placeholder={`Description here...`}
                        onInput={handleTextArea}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                    <label htmlFor="projectDescription">Description</label>
                </div>
                <p className='np-header'>Tasks</p>
                {tasks.map( (task, i) => (
                    <div key={`task-${i}`} className='ol-input nt-task'>
                        <input 
                            type="text" 
                            name='description'
                            placeholder=' '
                            value={task.description}
                            onChange={(e) => handleInputChangeTask(e, i)}
                        />
                        <label htmlFor="description">Task</label>
                        {tasks.length - 1 === i && <CgAddR className='sri-button' onClick={addTaskInput} /> }
                        {tasks.length !== 1 && <CgRemoveR className='sri-button' onClick={() => removeTaskInput(i)} /> }
                    </div>
                ))}
                <button className='np-submit' onClick={handleSubmit} >Create Project</button>
            </form>
        </div>
    );
};

export default NewProject