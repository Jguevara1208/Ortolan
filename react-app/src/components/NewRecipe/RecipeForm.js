import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setTagsOne } from '../../store/tags';
import { setUnits, createUnit } from '../../store/units';
import { setIngredients, addIngredient } from '../../store/ingredients';

function RecipeForm(){
    const dispatch = useDispatch()

    
    const userId = useSelector(state => state.session.user.id)
    const units = useSelector(state => state.units)
    const userTags = useSelector(state => state.tags)
    const ingredients = useSelector(state => state.ingredients)
    
    const [title, setTitle] = useState('')
    const [season, setSeason] = useState('Winter')
    const [photo, setPhoto] = useState(false)
    const [year, setYear] = useState((new Date()).getFullYear())
    const [component, setComponent] = useState('')
    const [subRecipes, setSubRecipes] = useState([{title: '', description: '', ingredients: [{qty: '', ingredientId: '', unitId: '', description: ''}]}])
    const [tags, setTags] = useState('')
    
    useEffect(()=> {
        dispatch(setUnits(userId))
        dispatch(setTagsOne(userId))
        dispatch(setIngredients(userId))
    }, [dispatch])

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
        setSubRecipes([...subRecipes, { title: '', description: '', ingredients: [{ qty: '', ingredientId: '', unitId: '', description: '' }]}])
    }

    const handleAddClickSubRecipeIngredient = (subRecipeIndex) => {
        const list = [...subRecipes]
        const targetSubRecipe = list[subRecipeIndex].ingredients
        targetSubRecipe.push({ qty: '', ingredientId: '', unitId: '', description: '' })
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
        console.log(e.target)
        const list = [...subRecipes]
        list[subRecipeIndex].ingredients[ingredientIndex][name] = value
        setSubRecipes(list)
        console.log(subRecipes)
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

    const formatSubRecipes = () => {

    }

    const formatTags = () => {
        const tagsArray = tags.split(' ')
        const formatted = tagsArray.map(tag => {
            const formattedTag = tag[0].toUpperCase() + tag.slice(1).toLowerCase()

            return {"name": formattedTag, "userId": userId}
        })
        return formatted
    }

    const createRequestObject = () => {
        const res = {
            title,
            photo,
            season,
            year,
            userId,
            "component": {
                "description": component
            },
            "subRecipes": formatSubRecipes(),
            "tags": formatTags()
        }
        return res
    }

    const handleSubmit = (e) => {
        e.preventDefault()

    }


    console.log(component)
    return (
        <div>
            <form onSubmit={handleSubmit}>
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
                            <img src={photo} alt="" />
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
                                    name='unit'
                                    value={ingredient.unit}
                                    placeholder='unit'
                                    onChange={(e) => handleInputChangeSubRecipeIngredient(e, i, idx)}
                                />
                                <input 
                                    type="text" 
                                    placeholder='ingredient'
                                    name='ingredient'
                                    value={ingredient.ingredient} 
                                    onChange={(e) => handleInputChangeSubRecipeIngredient(e, i, idx)}
                                />
                                <input 
                                    type="text" 
                                    placeholder='ingredient description'
                                    name='description'
                                    value={ingredient.description}
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
                            {subRecipes.length !== 1 && <button onClick={() => handleRemoveClickSubRecipe(i)} >Remove Sub Recipe</button> }
                            {subRecipes.length -1 === i && <button onClick={handleAddClickSubRecipe}>Add Sub Recipe</button> }
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

export default RecipeForm;