import { useState } from 'react';
import { useDispatch } from 'react-redux';
import DishUsed from './DishUsed';
import { addCurrentMenu, removeCurrentMenu } from '../../store/currentMenu';
import './Menu.css'

const UpdateMenu = ({userId, showModal, currentMenu, allRecipes}) => {

    const dispatch = useDispatch()

    const unusedRecipes = {...allRecipes}
    currentMenu.forEach(recipe => {
        if (recipe.id in unusedRecipes) delete unusedRecipes[recipe.id]
    })

    const [dishesToAdd, setDishesToAdd] = useState([])
    const [dishesToRemove, setDishesToRemove] = useState([])


    const handleRemoveSelect = (e) => {
        const recipe_id = e.target.id;
        console.log(recipe_id, 'REMOVE ID')
        if (dishesToRemove.includes(recipe_id)) {
            const index = dishesToRemove.indexOf(recipe_id)
            const newArr = [...dishesToRemove.slice(0, index), ...dishesToRemove.slice(index + 1)]
            setDishesToRemove(newArr)
        } else {
            const newArr = [...dishesToRemove, recipe_id]
            setDishesToRemove(newArr)
        };
    }

    const handleAddSelect = (e) => {
        const recipe_id = e.target.id;
        console.log(recipe_id, 'recipe id from update menu')
        if (dishesToAdd.includes(recipe_id)) {
            const index = dishesToAdd.indexOf(recipe_id)
            const newArr = [...dishesToAdd.slice(0, index), ...dishesToAdd.slice(index + 1)]
            setDishesToAdd(newArr)
        } else {
            const newArr = [...dishesToAdd, recipe_id]
            setDishesToAdd(newArr)
        };
    }

    const handleSubmit = async () => {
        showModal(false)
        if (dishesToAdd.length > 0) {
            for (let i = 0; i < dishesToAdd.length; i++) {
                const dish = dishesToAdd[i]
                await dispatch(addCurrentMenu(userId, dish))
            }
        }
        if (dishesToRemove.length > 0) {
            for (let i = 0; i < dishesToRemove.length; i++) {
                const dish = dishesToRemove[i]
                await dispatch(removeCurrentMenu(userId, dish))
            }
        }

    }

    return (
        <div className='update-menu-container'>
            <h2>Update Menu</h2>
            <div className='used-menu-items' >
                <h3 className='mu-header'>Current Menu</h3>
                <p className='directions'> Click the menu items you would like to remove.</p>
                <div className='dish-container'>
                    {currentMenu && currentMenu.map(dish => (
                        <div key={dish.id} onClick={handleRemoveSelect}>
                            <DishUsed dish={dish} used={true}/>
                        </div>
                    ))}
                </div> 
            </div>
            <div className='unused-menu-items' >
                <h3 className='mu-header'>Unused Dishes</h3>
                <p className='directions'>Click the dishes you would like to add to the menu.</p>
                <div className='dish-container'>
                    {unusedRecipes && Object.values(unusedRecipes).map(dish => (
                        <div key={dish.id} onClick={handleAddSelect}>
                            <DishUsed dish={dish} used={false}/>
                        </div>
                    ))}
                </div>
            </div>
            <button className='menu-edit-apply' onClick={handleSubmit}>Apply Changes</button>
            <button className='menu-edit-cancel' onClick={() => showModal(false)}>Cancel</button>
        </div>
    );
};

export default UpdateMenu;