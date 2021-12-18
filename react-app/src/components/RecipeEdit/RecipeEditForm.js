import { useState, useEffect, useRef} from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { setTagsOne, addTag } from '../../store/tags';
import { setUnits, createUnit } from '../../store/units';
import { setIngredients, addIngredient } from '../../store/ingredients';
import { setOrderCategories, addOrderCategory } from '../../store/orderCategories';
import { createCurrentRecipe, deleteCurrentRecipe, setCurrentRecipe } from '../../store/currentRecipe'
import { addCurrentMenu, getCurrentMenu } from '../../store/currentMenu';

import SubRecipe from '../NewRecipe/SubRecipe';

import '../NewRecipe/RecipeForm.css'

import {
    subRecipeTemplate, 
    handleTextArea,
    handlePhoto,
    formatSubRecipes,
    formatTags,
} from '../NewRecipe/FormUtils'

function RecipeEditForm() {
    const dispatch = useDispatch()
    const {recipeId} = useParams()
    const history = useHistory()

    const fileUpload = useRef(null);

    const userId = useSelector(state => state.session.user.id)
    const units = useSelector(state => state.units)
    const userTags = useSelector(state => state.tags)
    const ingredients = useSelector(state => state.ingredients)
    const categories = useSelector(state => state.orderCategories)
    const currentRecipe = useSelector(state=> state.currentRecipe)
    const currentMenu = useSelector(state => state.currentMenu)

    const [title, setTitle] = useState('')
    const [season, setSeason] = useState('Winter')
    const [photo, setPhoto] = useState(false)
    const [year, setYear] = useState((new Date()).getFullYear())
    const [component, setComponent] = useState('')
    const [createdAt, setCreatedAt] = useState('')
    const [subRecipes, setSubRecipes] = useState([subRecipeTemplate()])
    const [tags, setTags] = useState('')

    const resetState = () => {
        setTitle('')
        setSeason('Winter')
        setPhoto(false)
        setComponent('')
        setSubRecipes([subRecipeTemplate()])
        setTags('')
    }

    useEffect(() => {
        dispatch(setUnits(userId))
        dispatch(setTagsOne(userId))
        dispatch(setIngredients(userId))
        dispatch(getCurrentMenu(userId))
        dispatch(setOrderCategories(userId))
        dispatch(setCurrentRecipe(recipeId))
    }, [dispatch])

    useEffect(() => {
        if (currentRecipe) {
            setTitle(currentRecipe.title)
            setSeason(currentRecipe.season)
            setPhoto(currentRecipe.photo)
            setYear(currentRecipe.year)
            setComponent(currentRecipe.components)
            setCreatedAt(currentRecipe.created_at)

            if(currentRecipe.subRecipes) {
                const subRecipesArr = Object.values(currentRecipe.subRecipes)
                const subRec = subRecipesArr.map(sub => {
                    return {
                        title: sub.title,
                        description: sub.description ? sub.description : '', 
                        ingredients: Object.values(sub.ingredients).map(ing => {
                            const temp = {
                                qty: ing.qty ? `${ing.qty}${ing.unit}` : '',
                                ingredientId: ing.ingredient,
                                unitId: ing.unit ? ing.unit : '', 
                                description: ing.description ? ing.description : '',
                                category: ingredients[ing.ingredient] ? ingredients[ing.ingredient].category.name : ''
                            }
                            return temp
                    })
                    }
                })
                setSubRecipes(subRec)
            }
            if (currentRecipe.tags) {
                let tagsArr = currentRecipe.tags.map(tag => tag.name)
                let tagsForState = tagsArr.join(' ')
                setTags(tagsForState)
            }
        }
    }, [currentRecipe])

    const createRequestObject = async () => {

        let newTags = tags ? await formatTags(tags, userId, userTags, dispatch, addTag) : ''

        const subRecipeRes = await formatSubRecipes(
            subRecipes, ingredients, userId, units, 
            categories, createUnit, addOrderCategory, 
            addIngredient, dispatch
        )

        const res = {
            title, photo, season,
            year, userId, 
            component: {
                description: component
            },
            subRecipes: subRecipeRes,
            tags: newTags
        }

        return res
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const onMenu = currentMenu.find(dish => +recipeId === dish.id)
        const res = await createRequestObject()
        await dispatch(deleteCurrentRecipe(currentRecipe.id))
        const newRecipeId = await dispatch(createCurrentRecipe(res))
        resetState()
        if (onMenu) dispatch(addCurrentMenu(userId, newRecipeId))
        history.push(`/recipes/${newRecipeId}`)
    }
    
    const handleUpload = () => {
        fileUpload.current.click()
    }


    return (
        <div className='form-container'>
            <form className='nr-form' onSubmit={handleSubmit} autoComplete="off">
                <div className='title-season'>
                    <div className='ol-input recipe-title'>
                        <input
                            maxLength='255'
                            type="text"
                            placeholder=' '
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <label htmlFor="title">Title</label>
                    </div>
                    <div className='season-select'>
                        <select name="season" id="" onChange={(e) => setSeason(e.target.value)}>
                            <option value="Winter">Winter</option>
                            <option value="Spring">Spring</option>
                            <option value="Summer">Summer</option>
                            <option value="Autumn">Autumn</option>
                        </select>
                    </div>
                </div>
                <div className='photo-components-container'>
                    <div className='ol-input'>
                        <textarea
                            name="components"
                            className='components'
                            placeholder={`Example...\n  1ea Lobster\n  20g sauce\n  3ea sorrel leaves`}
                            onInput={handleTextArea}
                            value={component}
                            onChange={(e) => setComponent(e.target.value)}
                        ></textarea>
                        <label htmlFor="components">Components</label>
                    </div>
                    <div className='photo-container'>
                        {photo
                            ?
                             <>
                                <input 
                                    type='file' 
                                    className='inputfile' 
                                    ref={fileUpload} 
                                    onChange={(e) => handlePhoto(e, setPhoto)} 
                                />
                                <div 
                                    onClick={() => handleUpload()} 
                                    className='rf-photo' 
                                    style={{backgroundImage: `url('${photo}')`}}
                                />       
                            </>
                            :
                            <>
                                <input 
                                    type='file' 
                                    className='inputfile' 
                                    ref={fileUpload} 
                                    onChange={(e) => handlePhoto(e, setPhoto)} 
                                />
                                <div 
                                    className='fileChooser' 
                                    onClick={() => handleUpload()} 
                                >
                                Upload Photo
                                </div>
                            </>
                        }
                    </div>
                </div>
                <div className='sub-recipe'>
                    {subRecipes.map((subRecipe, i) => (
                        <SubRecipe 
                            subRecipe={subRecipe} 
                            i={i} 
                            subRecipes={subRecipes} 
                            setSubRecipes={setSubRecipes} 
                            ingredients={ingredients}
                        />
                    ))}
                </div>
                <div className='tags-container'>
                    <div className='ol-input'>
                        <input
                            type="text"
                            name='tags'
                            placeholder=' '
                            maxLength='50'
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
                        />
                        <label htmlFor="tags">Tags</label>
                    </div>
                </div>
                <div className='nr-submit'>
                    <button className='nr-submit-button'>Submit</button>
                </div>
            </form>
        </div>
    );
};

export default RecipeEditForm;