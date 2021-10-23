import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setTagsOne, addTag } from '../../store/tags';
import { setUnits, createUnit } from '../../store/units';
import { setIngredients, addIngredient } from '../../store/ingredients';
import { setOrderCategories, addOrderCategory } from '../../store/orderCategories';
import { createCurrentRecipe, deleteCurrentRecipe, setCurrentRecipe } from '../../store/currentRecipe'

function RecipeEditForm() {
    const dispatch = useDispatch()
    const {recipeId} = useParams()
    const history = useHistory()

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
                        description: sub.title ? sub.title : '', 
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
        console.group(res)
        await dispatch(deleteCurrentRecipe(currentRecipe.id))
        const newRecipeId = await dispatch(createCurrentRecipe(res))
        resetState()
        history.push(`/recipes/${newRecipeId}`)
    }


    return (
        <div>
            <form onSubmit={handleSubmit} autoComplete="off">
                <div>
                    <input
                        type="text"
                        placeholder='Dish Title'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <select name="season" id="" onChange={(e) => setSeason(e.target.value)}>
                        <option value="Winter">Winter</option>
                        <option value="Spring">Spring</option>
                        <option value="Summer">Summer</option>
                        <option value="Autumn">Autumn</option>
                    </select>
                </div>
                <div>
                    {photo
                        ?
                        <img src={photo} alt="" style={{ width: '300px', height: '300px' }} />
                        :
                        <div>
                            <input
                                type="file"
                                accept='image/*'
                                onChange={handlePhoto}
                            />
                        </div>
                    }
                </div>
                <div>
                    <p>Components</p>
                    <textarea
                        name="components"
                        cols="30"
                        rows="10"
                        value={component}
                        onChange={(e) => setComponent(e.target.value)}
                    ></textarea>
                </div>
                {subRecipes.map((subRecipe, i) => (
                    <div>
                        <div>
                            <input
                                name='title'
                                placeholder='Sub recipe Title'
                                value={subRecipe.title}
                                onChange={(e) => handleInputChangeSubRecipe(e, i)}
                            />
                        </div>
                        {subRecipe.ingredients.map((ingredient, idx) => (
                            <div>
                                <input
                                    type="text"
                                    placeholder='qty'
                                    name='qty'
                                    value={ingredient.qty}
                                    onChange={(e) => handleInputChangeSubRecipeIngredient(e, i, idx)}
                                />
                                <input
                                    type="text"
                                    placeholder='ingredient'
                                    name='ingredientId'
                                    value={ingredient.ingredientId}
                                    onChange={(e) => handleInputChangeSubRecipeIngredient(e, i, idx)}
                                />
                                <input
                                    type="text"
                                    placeholder='ingredient description'
                                    name='description'
                                    value={ingredient.description}
                                    onChange={(e) => handleInputChangeSubRecipeIngredient(e, i, idx)}
                                />
                                <input
                                    id={`category-${i}-${idx}`}
                                    type="text"
                                    placeholder='Catergory for ordering'
                                    name='category'
                                    value={ingredient.category}
                                    onChange={(e) => handleInputChangeSubRecipeIngredient(e, i, idx)}
                                />
                                {subRecipe.ingredients.length !== 1 && <button onClick={() => handleRemoveClickSubRecipeIngredient(i, idx)}>Remove ingredient</button>}
                                {subRecipe.ingredients.length - 1 === idx && <button onClick={() => handleAddClickSubRecipeIngredient(i)}>Add ingredient</button>}
                            </div>
                        ))}
                        <div>
                            <input
                                name='description'
                                placeholder='Recipe Description'
                                value={subRecipe.description}
                                onChange={(e) => handleInputChangeSubRecipe(e, i)}
                            />
                        </div>
                        <div>
                            {subRecipes.length !== 1 && <button onClick={() => handleRemoveClickSubRecipe(i)} >Remove Sub Recipe</button>}
                            {subRecipes.length - 1 === i && <button onClick={handleAddClickSubRecipe}>Add Sub Recipe</button>}
                        </div>
                    </div>
                ))}
                <div>
                    <p>Tags</p>
                    <input
                        type="text"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                    />
                </div>
                <button>Submit</button>
            </form>
        </div>
    );
};

export default RecipeEditForm;