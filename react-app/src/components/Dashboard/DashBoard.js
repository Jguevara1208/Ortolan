import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setRecentRecipes } from '../../store/recentRecipes';
import { setProjects } from '../../store/projects';
import './Dashboard.css';

function Dashboard(){
    const dispatch = useDispatch()

    const recentRecipes = useSelector(state => state.recentRecipes)
    const projects = useSelector(state => state.projects)
    const userId = useSelector(state => state.session.user.id)
    
    useEffect(() => {
        dispatch(setRecentRecipes(userId))
        dispatch(setProjects(userId))
    }, [dispatch])

    const formatDate = (date) => {
        const dateArr = date.split(' ')
        return `${dateArr[2]} ${dateArr[1]}, ${dateArr[3]}`
    }

    const taskDiff = (tasks) => {
        if (tasks.length) {
            let tasksLength = tasks.length
            let completed = tasks.reduce((acc, task) => {
                if (task.completed) acc += 1
                return acc
            }, 0)
            return tasksLength === completed ? 'All tasks finished' : `${completed}/${tasksLength} tasks completed`
        } else {
            return 'No tasks created'
        }
    }

    const taskPercent = (tasks) => {
        if (tasks.length) {
            let tasksLength = tasks.length
            let completed = tasks.reduce((acc, task) => {
                if (task.completed) acc += 1
                return acc
            }, 0)
            return parseInt((completed / tasksLength) * 100)
        } else {
            return 0
        }
    }

    return (
        <div>
            <div>
                <p>Recent Recipes</p>
                <div>
                    {recentRecipes && recentRecipes.map(recipe => (
                        <div>
                            <p>{recipe.title}</p>
                            <div className='rr-photo' style={{backgroundImage: `url('${recipe.img}')`}} />
                            <p>{formatDate(recipe.created_at)}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <p>Projects</p>
                <div>
                    {projects && Object.values(projects).map(project => (
                        <div>
                            <p>{project.title}</p>
                            <p>{project.description}</p>
                            <p>{project.assigned.length ? project.assigned.length : 'No'} cooks assigned</p>
                            <p>{taskDiff(project.tasks)}</p>
                            <p>{taskPercent(project.tasks)}%</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;