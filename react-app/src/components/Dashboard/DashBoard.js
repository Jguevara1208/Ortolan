import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setRecentRecipes } from '../../store/recentRecipes';
import { setProjects } from '../../store/projects';
import { getCurrentMenu } from '../../store/currentMenu';
import { Link } from 'react-router-dom';
import './Dashboard.css';

function Dashboard(){
    const dispatch = useDispatch()

    const recentRecipes = useSelector(state => state.recentRecipes)
    const projects = useSelector(state => state.projects)
    const currentMenu = useSelector(state => state.currentMenu)
    const userId = useSelector(state => state.session.user.id)
    
    useEffect(() => {
        dispatch(setRecentRecipes(userId))
        dispatch(setProjects(userId))
        dispatch(getCurrentMenu(userId))
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

    const firstWord = (title) => {
        let firstStr = title.split(' ')[0]
        return firstStr[firstStr.length - 1] === ',' ? firstStr = firstStr.slice(0, firstStr.length - 1) : firstStr
    }

    return (
        <div className='db-content'>
            <div className='db-container'>
                <div className='projects-header'>
                    <h3>Recent Recipes</h3>
                    <Link className='link' to='/recipes'>See all recipes</Link>
                </div>
                <div className='rr-container'>
                    <div className='rr-wrapper'>
                        {recentRecipes && recentRecipes.map(recipe => (
                            <Link key={`recipe-${recipe.id}`} className='recipe-card' to={`/recipes/${recipe.id}`}>
                                    <p className='rc-title'>{recipe.title}</p>
                                    <div className='rr-photo' style={{backgroundImage: `url('${recipe.img}')`}} />
                                    <p className='rc-date'>{formatDate(recipe.created_at)}</p>
                            </Link>
                        ))}
                    </div>
                </div>
                <div className='db-double-container'>
                    <div className='cm-container'>
                        <div className='projects-header'>
                            <h3>Current Menu</h3>
                            <Link className='link' to='/menu'>
                                See full menu {currentMenu.length - 8 > 0 ? currentMenu.length - 8 === 1 ? ' (1 more dish)' : ` (${currentMenu.length - 8} more dishes)` : '' }
                                </Link>
                        </div>
                        <div className='cm-wrapper'>
                            {currentMenu && currentMenu.map((recipe, idx) => (
                                <>
                                    {
                                    idx < 8 
                                    ?
                                        <Link key={`cm-${recipe.id}`} className='cm-recipe' to={`/recipes/${recipe.id}`}>
                                                <p>{firstWord(recipe.title)}</p>
                                                <div className='cm-photo' style={{ backgroundImage: `url('${recipe.img}')` }}/>
                                        </Link>
                                    : 
                                        null
                                    }
                                </>
                            ))}
                        </div>
                    </div>
                    <div className='og-container'>
                        <div className='projects-header'>
                            <h3>Ordering Guide</h3>
                            <Link className='link' to='/recipes'>See full guide</Link>
                        </div>
                        <div className='og-wrapper'>

                        </div>
                    </div>
                </div>
                
                <div className='projects-header'>
                    <h3>Projects</h3>
                    <Link className='link' to='/projects'>See all projects</Link>
                </div>
                <div className='project-container'>
                    <div className='project-wrapper'>
                        {projects && Object.values(projects).map((project, idx) => (
                            <>
                                {idx < 5 && (
                                    <div key={`project-${idx}`} className='db-project'>
                                        <p className='p-title'>{project.title}</p>
                                        <p className='p-assigned'>{project.assigned.length ? project.assigned.length : 'No'} {project.assigned.length === 1 ? 'cook' : 'cooks'} assigned</p>
                                        <p className='p-tasks'>{taskDiff(project.tasks)}</p>
                                        <div className='percent-outer'>
                                            {taskPercent(project.tasks) === 0 && <p className='p-percent'>0%</p> }
                                            <div className='percent-inner' style={{width: `${taskPercent(project.tasks)}%`}}>
                                                {taskPercent(project.tasks) > 0 && <p className='p-percent'>{taskPercent(project.tasks)}%</p> }
                                            </div>
                                        </div>
                                        <p className='p-info'>Info</p>
                                        <p className='p-description'>{project.description ? project.description : 'No info...'}</p>
                                    </div>
                                )}
                            </>
                        ))}
                    </div>
                </div>
                {/* <div className='projects-header'>
                    <h3>Team Members</h3>
                </div>
                <div className='og-wrapper'>
                    
                </div> */}
            </div>
        </div>
    );
};

export default Dashboard;