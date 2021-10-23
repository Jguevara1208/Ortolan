import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { setUnits, createUnit } from '../../store/units';
import { setOrderCategories, addOrderCategory } from '../../store/orderCategories';
import { setIngredients, addIngredient } from '../../store/ingredients';
import { setTagsOne } from '../../store/tags';
import { editPosition, editName } from '../../store/session';

function Settings(){
    const dispatch = useDispatch()

    const user = useSelector(state => state.session.user)
    const units = useSelector(state => state.units)
    const ingredients = useSelector(state => state.ingredients)
    const categories = useSelector(state => state.orderCategories)

    const [showUnits, setShowUnits] = useState(false)
    const [showIngredients, setShowIngredients] = useState(false)
    const [showCategories, setShowCategories] = useState(false)
    const [showEditTitle, setShowEditTitle] = useState(false)
    const [title, setTitle] = useState(user.name)
    const [showEditPosition, setShowEditPosition] = useState(false)
    const [position, setPosition] = useState(user.position)

    const [addUnit, setAddUnit] = useState(false)
    const [newUnit, setNewUnit] = useState('')
    
    const [addIng, setAddIng] = useState(false)
    const [newIngredient, setNewIngredient] = useState('')
    const [ingCat, setIngCat] = useState(categories[Object.keys(categories)[0]])

    const [addCategory, setAddCategory] = useState(false)
    const [newCategory, setNewCategory] = useState('')
    
    useEffect(()=>{
        dispatch(setUnits(user.id))
        dispatch(setOrderCategories(user.id))
        dispatch(setIngredients(user.id))
        dispatch(setTagsOne(user.id))
    }, [dispatch])

    const cancelTitleEdit = () => {
        setTitle(user.name)
        setShowEditTitle(false)
    }

    const cancelPositionEdit = () => {
        setPosition(user.position)
        setShowEditPosition(false)
    }

    const handleTitleSubmit = async () => {
        const firstName = title.split(' ')[0]
        const lastName = title.split(' ').slice(1).join(' ') 
        await dispatch(editName({id: user.id, name: title, firstName, lastName}))
        setShowEditTitle(false)
    }

    const handlePositionSubmit = async () => {
        await dispatch(editPosition({id: user.id, position}))
        setShowEditPosition(false)
    }

    const formatData = (data) => {
        return data.split(' ').map(ele => ele[0].toUpperCase() + ele.slice(1).toLowerCase()).join(' ')
    }

    const handleAddUnit = async () => {
        if (newUnit) {
            await dispatch(createUnit({unit: newUnit, userId: user.id}))
            setAddUnit(false)
        }
    }

    const handleAddIngredient = async () => {
        if (newIngredient) {
            await dispatch(addIngredient({userId: user.id, categoryId: ingCat, name: formatData(newIngredient)}))
            setAddIng(false)
        }
    }

    const handleAddCategory = async () => {
        if(newCategory) {
            await dispatch(addOrderCategory({userId: user.id, name: formatData(newCategory)}))
            setAddCategory(false)
        }
    }

    return (
        <div>
            <div>
                {showEditTitle 
                    ? 
                    <div>
                        <input 
                            type="text" 
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <button onClick={handleTitleSubmit} >Submit</button>
                        <button onClick={cancelTitleEdit}>Cancel</button>
                    </div>
                    :
                    <div>
                        <p>{user.name}</p>
                        <button onClick={() => setShowEditTitle(true)}>Edit Name</button>
                    </div>
                }
                {showEditPosition
                ?
                    <div>
                        <input
                            type="text"
                            value={position}
                            onChange={(e) => setPosition(e.target.value)}
                        />
                        <button onClick={handlePositionSubmit} >Submit</button>
                        <button onClick={cancelPositionEdit}>Cancel</button>
                    </div>
                :
                    <div>
                        <p>{user.position}</p>
                        <button onClick={() => setShowEditPosition(true)}>Edit Position</button>
                    </div>
                }
                <div className='settings-avatar' style={{backgroundImage: `url('${user.avatar}')`}}/>
            </div>
            <div>
                <div>
                    <p onClick={() => setShowUnits(!showUnits)}>Units</p>
                    {showUnits && Object.keys(units).map(un => (
                        <div>
                            {(un !== 'none' && un !== ' ' && un !== '' && un !== 'None') && (
                                <p>{un}</p>
                            )}
                        </div>
                    ))}
                    <div>
                        {addUnit 
                        ? 
                            <>
                                <input 
                                    type="text" 
                                    value={newUnit}
                                    onChange={(e) => setNewUnit(e.target.value)}
                                />
                                <button onClick={handleAddUnit} >Submit</button>
                                <button onClick={() => setAddUnit(false)} >Cancel</button>
                            </>
                        :
                            <button onClick={() => setAddUnit(true)}>Add Unit</button>
                        }
                    </div>
                </div>
                <div>
                    <p onClick={() => setShowIngredients(!showIngredients)}>Ingredients</p>
                    {showIngredients && Object.keys(ingredients).map(ing => (
                        <div>
                            {ing !== 'None' && (
                                <p>{ing}</p>
                            )}
                        </div>
                    ))}
                    <div>
                        {addIng
                        ? 
                        <>
                            <input 
                                type="text" 
                                value={newIngredient}
                                onChange={(e) => setNewIngredient(e.target.value)}
                            />
                            <select name="category"  value={ingCat} onChange={(e) => setIngCat(e.target.value)}>
                                {Object.keys(categories).map(cat => (
                                    <option value={categories[cat]}>{cat}</option>
                                ))}
                            </select>
                            <button onClick={handleAddIngredient} >Submit</button>
                            <button onClick={() => setAddIng(false)} >Cancel</button>
                        </>
                        :
                            <button onClick={() => setAddIng(true)}>Add Ingredient</button>
                        }
                    </div>
                </div>
                <div>
                    <p onClick={() => setShowCategories(!showCategories)}>Ordering Categories</p>
                    {showCategories && Object.keys(categories).map(cat => (
                        <div>
                            {cat !== 'None' && (
                                <p>{cat}</p>
                            )}
                        </div>
                    ))}
                    <div>
                        {addCategory
                        ? 
                        <>
                            <input 
                                type="text" 
                                value={newCategory}
                                onChange={(e) => setNewCategory(e.target.value)}
                            />
                            <button onClick={handleAddCategory} >Submit</button>
                            <button onClick={() => setAddCategory(false)} >Cancel</button>
                        </>
                        :
                            <button onClick={() => setAddCategory(true)}>Add Category</button>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;