import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import { setTagsOne , addTag } from '../../store/tags';
import { setUnits, createUnit } from '../../store/units';
import { setIngredients, addIngredient } from '../../store/ingredients';
import { setOrderCategories, addOrderCategory } from '../../store/orderCategories';
import { createCurrentRecipe } from '../../store/currentRecipe'

import SubRecipe from './SubRecipe';

import './RecipeForm.css'

import {
    findSeason, 
    subRecipeTemplate, 
    handleTextArea,
    handlePhoto,
    formatSubRecipes,
    formatTags,
} from './FormUtils'

function RecipeForm(){

    const dispatch = useDispatch()
    const history = useHistory()
    const fileUpload = useRef(null);

    const userId = useSelector(state => state.session.user.id)
    const units = useSelector(state => state.units)
    const userTags = useSelector(state => state.tags)
    const ingredients = useSelector(state => state.ingredients)
    const categories = useSelector(state => state.orderCategories)
    
    const [title, setTitle] = useState('')
    const [season, setSeason] = useState(findSeason())
    const [photo, setPhoto] = useState(false)
    const [year] = useState((new Date()).getFullYear())
    const [component, setComponent] = useState('')
    const [subRecipes, setSubRecipes] = useState([subRecipeTemplate()])
    const [tags, setTags] = useState('')

    useEffect(()=> {
        dispatch(setUnits(userId))
        dispatch(setTagsOne(userId))
        dispatch(setIngredients(userId))
        dispatch(setOrderCategories(userId))
        setSeason(findSeason())
    }, [dispatch])

    const resetState = () => {
        setTitle('')
        setSeason(findSeason())
        setPhoto(false)
        setComponent('')
        setSubRecipes([subRecipeTemplate()])
        setTags('')
    }

    const handleUpload = () => {
        fileUpload.current.click()
    }

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
        const res = await createRequestObject()
        const newRecipeId = await dispatch(createCurrentRecipe(res))
        resetState()
        history.push(`/recipes/${newRecipeId}`)
    }

    return (
        <div className='form-container'>
            <form className='nr-form' onSubmit={handleSubmit} autoComplete="off">
                <h3>New Dish</h3>
                <div className='title-season dish-title'>
                    <div className='ol-input recipe-title'>
                        <input 
                            maxLength='255'
                            name='title'
                            type="text" 
                            placeholder=' '
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <label htmlFor="title">Dish Title</label>
                    </div>
                    <div className='season-select'>
                        <select 
                            name="season" 
                            onChange={(e) => setSeason(e.target.value)} 
                            defaultValue={findSeason()}
                        >
                            <option value="Winter">Winter</option>
                            <option value="Spring">Spring</option>
                            <option value="Summer">Summer</option>
                            <option value="Autumn">Autumn</option>
                        </select>
                    </div>
                </div>
                <div className='photo-components-container'>
                    <div className='ol-input component-container'>
                        <textarea
                            name="components"
                            className='components'
                            placeholder={`Example...\n  1ea Lobster\n  20g sauce\n  3ea sorrel leaves`}
                            onInput={handleTextArea}
                            value={component}
                            onChange={(e) => setComponent(e.target.value)}
                            >
                        </textarea>
                        <label htmlFor="components">Components</label>
                    </div>
                    <div className='photo-container recipe-form-photo'>
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
                <h3>Recipes</h3>
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
                            maxLength='50'
                            placeholder=' '
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

export default RecipeForm;