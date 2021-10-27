import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { setUnits, createUnit } from '../../store/units';
import { setOrderCategories, addOrderCategory } from '../../store/orderCategories';
import { setIngredients, addIngredient } from '../../store/ingredients';
import { setTagsOne } from '../../store/tags';
import { editPosition, editName } from '../../store/session';
import { VscEdit } from 'react-icons/vsc'
import './Settings.css'

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
        <div className='settings-container'>
            <div className='settings-user-container'>
                {showEditTitle 
                    ? 
                    <div className='ol-input setting-input'>
                        <input 
                            name='title'
                            type="text" 
                            placeholder=' '
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <label htmlFor="title">Name</label>
                        <button className='s-submit' onClick={handleTitleSubmit} >Submit</button>
                        <button className='s-cancel' onClick={cancelTitleEdit}>Cancel</button>
                    </div>
                    :
                    <div className='s-name'>
                        <p>{user.name}</p>
                        <VscEdit className='s-edit'  onClick={() => setShowEditTitle(true)}/>
                    </div>
                }
                {showEditPosition
                ?
                    <div className='ol-input setting-input'>
                        <input
                            placeholder=' '
                            name='pos'
                            type="text"
                            value={position}
                            onChange={(e) => setPosition(e.target.value)}
                        />
                        <label htmlFor="pos">Position</label>
                        <button className='s-submit' onClick={handlePositionSubmit} >Submit</button>
                        <button className='s-cancel' onClick={cancelPositionEdit}>Cancel</button>
                    </div>
                :
                    <div className='s-pos'>
                        <p>{user.position}</p>
                        <VscEdit  className='s-edit' onClick={() => setShowEditPosition(true)} />
                    </div>
                }
                <div>
                    <div className='settings-avatar' style={{backgroundImage: `url('${user.avatar}')`}}/>
                </div>
            </div>
            <div className='user-data-container'>
                <div className='user-data-wrapper'>
                    <div className='data-container'>
                        <p className={showUnits ? 'selected data-header' : 'data-header'} onClick={() => setShowUnits(!showUnits)}>Units</p>
                        <div>
                            {addUnit 
                            ? 
                            <div className='s-input-container'>
                                <div className='ol-input'>
                                    <input 
                                        autoComplete='off'
                                        name='unit'
                                        type="text"
                                        placeholder=' ' 
                                        value={newUnit}
                                        onChange={(e) => setNewUnit(e.target.value)}
                                    />
                                    <label htmlFor="unit">Unit</label>
                                </div>
                                <div className='s-button-container'>
                                    <button className='s-submit' onClick={handleAddUnit} >Submit</button>
                                    <button className='s-cancel' onClick={() => setAddUnit(false)} >Cancel</button>
                                </div>
                            </div>
                            :
                                <>
                                    {showUnits && (    
                                       <button className='s-add-button' onClick={() => setAddUnit(true)}>Add Unit</button>
                                    )}
                                </>
                            }
                        </div>
                        {showUnits && Object.keys(units).map(un => (
                            <div className='data-val-wrapper'>
                                {(un !== 'none' && un !== ' ' && un !== '' && un !== 'None') && (
                                    <p className='data-val'>- {un}</p>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className='data-container'>
                        <p className={showIngredients ? 'selected data-header' : 'data-header'} onClick={() => setShowIngredients(!showIngredients)}>Ingredients</p>
                        <div>
                            {addIng
                            ? 
                            <div className='s-input-container'>
                                <div className='ol-input'>
                                    <input 
                                        autoComplete='off'
                                        name='newIng'
                                        type="text" 
                                        placeholder=' '
                                        value={newIngredient}
                                        onChange={(e) => setNewIngredient(e.target.value)}
                                    />
                                    <label htmlFor="newIng">Ingredient</label>
                                </div>
                                <div>
                                    <select className='s-select' name="category"  value={ingCat} onChange={(e) => setIngCat(e.target.value)}>
                                        {Object.keys(categories).map(cat => (
                                            <option value={categories[cat]}>{cat}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className='s-button-container'>
                                    <button className='s-submit' onClick={handleAddIngredient} >Submit</button>
                                    <button className='s-cancel' onClick={() => setAddIng(false)} >Cancel</button>
                                </div>
                            </div>
                            :
                            <>
                                {showIngredients && (
                                    <button className='s-add-button' onClick={() => setAddIng(true)}>Add Ingredient</button>
                                )}
                            </>
                            }
                        </div>
                        {showIngredients && Object.keys(ingredients).map(ing => (
                            <div className='data-val-wrapper'>
                                {ing !== 'None' && (
                                    <p className='data-val'>- {ing}</p>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className='data-container'>
                        <p className={showCategories ? 'selected data-header' : 'data-header'} onClick={() => setShowCategories(!showCategories)}>Ordering Categories</p>
                        {addCategory
                        ? 
                        <div className='s-input-container'>
                            <div className='ol-input'>
                                <input 
                                    autoComplete='off'
                                    name='category'
                                    placeholder=' '
                                    type="text" 
                                    value={newCategory}
                                    onChange={(e) => setNewCategory(e.target.value)}
                                    />
                                <label htmlFor="category">Category</label>
                            </div>
                            <div className='s-button-container'>
                                <button className='s-submit' onClick={handleAddCategory} >Submit</button>
                                <button className='s-cancel' onClick={() => setAddCategory(false)} >Cancel</button>
                            </div>
                        </div>
                        :
                        <>
                            {showCategories && (
                                <button className='s-add-button' onClick={() => setAddCategory(true)}>Add Category</button>
                            )}
                        </>
                        }
                        {showCategories && Object.keys(categories).map(cat => (
                            <div className='data-val-wrapper'>
                                {(cat !== 'None' && cat !== ' ' && cat !== '') && (
                                    <p className='data-val'>- {cat}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;