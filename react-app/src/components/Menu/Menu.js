import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { getCurrentMenu } from '../../store/currentMenu';
import { setAllRecipes } from '../../store/allRecipes';
import { Modal } from '../../context/Modal'
import { MdOutlinePhotoSizeSelectActual } from 'react-icons/md'
import UpdateMenu from './UpdateMenu';
import './Menu.css'

const Menu = () => {

    const dispatch = useDispatch()

    const userId = useSelector(state => state.session.user.id)
    const currentMenu = useSelector(state => state.currentMenu)
    const allRecipes = useSelector(state => state.allRecipes)

    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        dispatch(getCurrentMenu(userId))
        dispatch(setAllRecipes(userId))
    }, [dispatch])

    const formatDate = (date) => {
        const dateArr = date.split(' ')
        return `${dateArr[2]} ${dateArr[1]}, ${dateArr[3]}`
    }

    const getRandomColor = () => {
        const colors = ['#65916c', '#d7b968', '#7c6c66', '#cf8541']
        const randomInt = Math.floor(Math.random() * (3 + 1));
        return colors[randomInt]
    }
    
    return (
        <div className='menu-container'>
            <div className='projects-header'>
                <h3>Current Menu</h3>
                <button onClick={() => setShowModal(!showModal)} className='update-menu'>Update Menu</button>
            </div>
            <div>
                {currentMenu.length 
                    ?
                        <div className='rr-container'>
                            <div className='rr-wrapper'>
                                {currentMenu && currentMenu.map(recipe => (
                                    <Link key={`recipe-${recipe.id}`} className='recipe-card' to={`/recipes/${recipe.id}`}>
                                        <p className='rc-title'>{recipe.title}</p>
                                        <div className='rr-photo' style={ recipe.img !== 'false' ? {backgroundImage: `url('${recipe.img}')`} : {backgroundColor: `${getRandomColor()}`} }>
                                                {recipe.img === 'false' && <MdOutlinePhotoSizeSelectActual className='db-no-photo'/>}
                                        </div>
                                        <p className='rc-date'>{formatDate(recipe.created_at)}</p>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    :
                    <p className='projects-notice'>No dishes on your current menu.</p>
                }
            </div>
            {showModal && (
                <Modal recipe={true} onClose={() => setShowModal(false)} >
                    <UpdateMenu 
                        userId={userId}
                        showModal={setShowModal}
                        currentMenu={currentMenu}
                        allRecipes={allRecipes}
                    />
                </Modal>
            )}
        </div>
    );
};

export default Menu;