import { useState, useEffect, useRef} from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setTagsOne, addTag } from '../../store/tags';
import { setUnits, createUnit } from '../../store/units';
import { setIngredients, addIngredient } from '../../store/ingredients';
import { setOrderCategories, addOrderCategory } from '../../store/orderCategories';
import { createCurrentRecipe, deleteCurrentRecipe, setCurrentRecipe } from '../../store/currentRecipe'
import { CgRemoveR, CgAddR } from 'react-icons/cg'
import '../NewRecipe/RecipeForm.css'

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

    const [title, setTitle] = useState('')
    const [season, setSeason] = useState('Winter')
    const [photo, setPhoto] = useState(false)
    const [year, setYear] = useState((new Date()).getFullYear())
    const [component, setComponent] = useState('')
    const [createdAt, setCreatedAt] = useState('')
    const [subRecipes, setSubRecipes] = useState([{ title: '', description: '', ingredients: [{ qty: '', ingredientId: '', unitId: '', description: '', category: '' }] }])
    const [tags, setTags] = useState('')

    const resetState = () => {
        setTitle('')
        setSeason('Winter')
        setPhoto(false)
        setComponent('')
        setSubRecipes([{ title: '', description: '', ingredients: [{ qty: '', ingredientId: '', unitId: '', description: '', category: '' }] }])
        setTags('')
    }

    useEffect(() => {
        dispatch(setUnits(userId))
        dispatch(setTagsOne(userId))
        dispatch(setIngredients(userId))
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

    const handleInputChangeSubRecipe = (e, index) => {
        const { name, value } = e.target
        const list = [...subRecipes]
        list[index][name] = value
        setSubRecipes(list)
    }

    const handleRemoveClickSubRecipe = (index) => {
        const list = [...subRecipes]
        list.splice(index, 1)
        setSubRecipes(list)
    }

    const handleAddClickSubRecipe = () => {
        setSubRecipes([...subRecipes, { title: '', description: '', ingredients: [{ qty: '', ingredientId: '', unitId: '', description: '', category: '' }] }])
    }

    const handleAddClickSubRecipeIngredient = (subRecipeIndex) => {
        const list = [...subRecipes]
        const targetSubRecipe = list[subRecipeIndex].ingredients
        targetSubRecipe.push({ qty: '', ingredientId: '', unitId: '', description: '', category: '' })
        setSubRecipes(list)
    }

    const handleRemoveClickSubRecipeIngredient = (subRecipeIndex, ingredientIndex) => {
        const list = [...subRecipes]
        const targetSubRecipe = list[subRecipeIndex].ingredients
        targetSubRecipe.splice(ingredientIndex, 1)
        setSubRecipes(list)
    }

    const handleInputChangeSubRecipeIngredient = (e, subRecipeIndex, ingredientIndex) => {
        const { name, value } = e.target
        const list = [...subRecipes]
        if (name === 'ingredientId' && value.length) {
            let formattedValue
            if (value[value.length - 1] === '') {
                formattedValue = value.split(' ').map(ele => ele[0].toUpperCase() + ele.slice(1).toLowerCase()).join(' ')
            } else {
                formattedValue = value[0].toUpperCase() + value.slice(1).toLowerCase()
            }
            let temp = {}
            for (let key in ingredients) {
                temp[key.toLowerCase()] = key
            }

            if (formattedValue.toLowerCase() in temp) {
                let cat = document.querySelector(`#category-${subRecipeIndex}-${ingredientIndex}`)
                list[subRecipeIndex].ingredients[ingredientIndex].category = ingredients[temp[formattedValue.toLowerCase()]].category.name
                cat.value = ingredients[temp[formattedValue.toLowerCase()]].category.name
            }
        }
        list[subRecipeIndex].ingredients[ingredientIndex][name] = value
        setSubRecipes(list)
    }

    const handlePhoto = async (e) => {
        const formData = new FormData()
        formData.append("image", e.target.files[0])

        const res = await fetch('/api/images/', {
            method: "POST",
            body: formData
        });
        if (res.ok) {
            const imgUrl = await res.json()
            setPhoto(imgUrl.url)
        }
    }

    const formatSubRecipes = async () => {
        let formatSubRecipe = [...subRecipes]
        for (let i = 0; i < formatSubRecipe.length; i++) {
            const subRecipe = formatSubRecipe[i]
            formatSubRecipe[i]['order'] = i

            for (let j = 0; j < subRecipe.ingredients.length; j++) {

                const ingredient = subRecipe.ingredients[j]
                let { qty, unitId, ingredientId, category } = ingredient
                let index = null;

                if (qty) {
                    for (let i = 0; i < qty.length; i++) {
                        let current = qty[i]
                        if (current === '.') continue
                        if ((isNaN(+current)) && (index === null)) {
                            index = i
                        }
                    }
                }

                unitId = qty.slice(index).trim()
                qty = +qty.slice(0, index).trim()
                formatSubRecipe[i].ingredients[j].qty = qty


                if (!qty) formatSubRecipe[i].ingredients[j].qty = 0
                if (!unitId) formatSubRecipe[i].ingredients[j].unitId = 'None'
                if (!category) formatSubRecipe[i].ingredients[j].category = 'None'
                if (!ingredientId) formatSubRecipe[i].ingredients[j].ingredientId = 'None'

                if (!units[unitId]) {
                    const newUnitObj = await dispatch(createUnit({ "unit": unitId, "userId": userId }))
                    unitId = newUnitObj.id
                    formatSubRecipe[i].ingredients[j].unitId = unitId
                } else {
                    formatSubRecipe[i].ingredients[j].unitId = units[unitId]
                }

                if (!ingredients[ingredientId]) {
                    let formattedCategory
                    if (category) {
                        formattedCategory = category.split(' ').map(cat => cat[0].toUpperCase() + cat.slice(1).toLowerCase()).join(' ')
                    } else {
                        formattedCategory = 'Other'
                    }

                    if (!categories[formattedCategory]) {
                        let newCatObj = await dispatch(addOrderCategory({ "userId": userId, "name": formattedCategory }))
                        category = newCatObj.id
                        formatSubRecipe[i].ingredients[j].category = category
                    } else {
                        category = categories[formattedCategory]
                        formatSubRecipe[i].ingredients[j].category = category
                    }
                    const formattedIngredient = ingredientId.split(' ').map(ing => ing[0].toUpperCase() + ing.slice(1).toLowerCase()).join(' ');
                    const newIngredientObj = await dispatch(addIngredient({ "name": formattedIngredient, "categoryId": category, "userId": userId }))
                    ingredientId = newIngredientObj.ingredient.id
                    formatSubRecipe[i].ingredients[j].ingredientId = ingredientId
                } else {
                    ingredientId = ingredients[ingredientId].id
                    formatSubRecipe[i].ingredients[j].ingredientId = ingredientId
                }
                formatSubRecipe[i].ingredients[j]['order'] = j
            }
        }
        return formatSubRecipe
    }

    const formatTags = async () => {
        const tagsArray = tags.split(' ')
        const formatted = []
        for (let i = 0; i < tagsArray.length; i++) {
            const tag = tagsArray[i]
            const formattedTag = tag[0].toUpperCase() + tag.slice(1).toLowerCase()
            let tag_obj = { "name": formattedTag, "userId": userId }
            if (!userTags[formattedTag]) {
                let tagId = await dispatch(addTag(tag_obj))
                formatted.push(tagId)
            } else {
                formatted.push(userTags[formattedTag])
            }
        }
        return formatted
    }

    const createRequestObject = async () => {
        let newTags = ''
        if (tags) {
            newTags = await formatTags()
        }
        const subRecipeRes = await formatSubRecipes()

        const res = {
            title,
            photo,
            season,
            year,
            userId,
            "component": {
                "description": component
            },
            "subRecipes": subRecipeRes,
            "tags": newTags,
            created_at: createdAt
        }
        return res
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const res = await createRequestObject()
        await dispatch(deleteCurrentRecipe(currentRecipe.id))
        const newRecipeId = await dispatch(createCurrentRecipe(res))
        resetState()
        history.push(`/recipes/${newRecipeId}`)
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
    
    const handleUpload = () => {
        fileUpload.current.click()
    }


    return (
        <div className='form-container'>
            <form className='nr-form' onSubmit={handleSubmit} autoComplete="off">
                <div className='title-season'>
                    <div className='ol-input recipe-title'>
                        <input
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
                                <input type='file' className='inputfile' ref={fileUpload} onChange={handlePhoto} />
                                <div className='rf-photo' onClick={() => handleUpload()} style={{ backgroundImage: `url('${photo}')` }} />
                            </>
                            :
                            <>
                                <input type='file' className='inputfile' ref={fileUpload} onChange={handlePhoto} />
                                <div className='fileChooser' onClick={() => handleUpload()} >Choose Photo</div>
                            </>
                        }
                    </div>
                </div>
                <div className='sub-recipe'>
                    {subRecipes.map((subRecipe, i) => (
                        <div key={`sr-${i}`} className='sr-wrapper'>
                            <div className='ol-input recipe-title'>
                                <input
                                    name='title'
                                    placeholder='Sub recipe Title'
                                    value={subRecipe.title}
                                    onChange={(e) => handleInputChangeSubRecipe(e, i)}
                                />
                                <label htmlFor="title">Recipe Title</label>
                            </div>
                            {subRecipe.ingredients.map((ingredient, idx) => (
                                <div key={`ing-${i}-${idx}`} className='sr-ingredient-wrapper'>
                                    <div className='ol-input qty'>
                                        <input
                                            className='qty-input'
                                            type="text"
                                            placeholder=' '
                                            name='qty'
                                            value={ingredient.qty}
                                            onChange={(e) => handleInputChangeSubRecipeIngredient(e, i, idx)}
                                        />
                                        <label htmlFor="qty">Qty</label>
                                    </div>
                                    <div className='ol-input'>
                                        <input
                                            type="text"
                                            placeholder=' '
                                            name='ingredientId'
                                            value={ingredient.ingredientId}
                                            onChange={(e) => handleInputChangeSubRecipeIngredient(e, i, idx)}
                                        />
                                        <label htmlFor="ingredientId">Ingredient</label>
                                    </div>
                                    <div className='ol-input'>
                                        <input
                                            type="text"
                                            placeholder=' '
                                            name='description'
                                            value={ingredient.description}
                                            onChange={(e) => handleInputChangeSubRecipeIngredient(e, i, idx)}
                                        />
                                        <label htmlFor="description">Description</label>
                                    </div>
                                    <div className='ol-input'>
                                        <input
                                            id={`category-${i}-${idx}`}
                                            type="text"
                                            placeholder=' '
                                            name='category'
                                            value={ingredient.category}
                                            onChange={(e) => handleInputChangeSubRecipeIngredient(e, i, idx)}
                                        />
                                        <label htmlFor="category">Category</label>
                                    </div>
                                    {subRecipe.ingredients.length - 1 === idx && <CgAddR className='sri-button' onClick={() => handleAddClickSubRecipeIngredient(i)} />}
                                    {subRecipe.ingredients.length !== 1 && <CgRemoveR className='sri-button' onClick={() => handleRemoveClickSubRecipeIngredient(i, idx)} />}
                                </div>
                            ))}
                            <div className='ol-input'>
                                <textarea
                                    name="description"
                                    className='description'
                                    onInput={handleTextArea}
                                    value={subRecipe.description}
                                    onChange={(e) => handleInputChangeSubRecipe(e, i)}
                                ></textarea>
                                <label htmlFor="description">Description</label>
                            </div>
                            <div className='sub-recipe-buttons'>
                                {subRecipes.length - 1 === i && <button className='add-sr' onClick={handleAddClickSubRecipe}>Add Recipe</button>}
                                {subRecipes.length !== 1 && <button className='remove-sr' onClick={() => handleRemoveClickSubRecipe(i)}>Remove Recipe</button>}
                            </div>
                        </div>
                    ))}
                </div>
                <div className='tags-container'>
                    <div className='ol-input'>
                        <input
                            type="text"
                            name='tags'
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

export default RecipeEditForm;