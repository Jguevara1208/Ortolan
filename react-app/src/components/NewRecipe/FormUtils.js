import imageCompression from 'browser-image-compression'

/* ----------------------------------------------------------------------- */
/* -----------------------------Dates------------------------------------- */
/* ----------------------------------------------------------------------- */

export function findSeason() {
    const seasonNum = Math.floor((new Date().getMonth() / 12 * 4)) % 4
    return ['Winter', 'Spring', 'Summer', 'Autumn'][seasonNum]
}

/* ----------------------------------------------------------------------- */
/* -----------------------------State Templates--------------------------- */
/* ----------------------------------------------------------------------- */

export const subRecipeTemplate = () => {
    return {
        title: '',
        description: '',
        ingredients: [
            { 
                qty: '',
                ingredientId: '',
                unitId: '',
                description: '',
                category: ''
            }
        ]
    }
}
 
export const ingredientTemplate = () => {
    return { 
        qty: '', 
        ingredientId: '', 
        unitId: '', 
        description: '', 
        category: ''
    }
}

/* ----------------------------------------------------------------------- */
/* -----------------------------Input Changes----------------------------- */
/* ----------------------------------------------------------------------- */

export const subRecipeInputChange = (e, index, subRecipes, setSubRecipes) => {
        const { name, value } = e.target
        const list = [...subRecipes]
        list[index][name] = value
        setSubRecipes(list)
}

export const ingredientInputChange = (e, subRecipeIndex, ingredientIndex, subRecipes, ingredients, setSubRecipes) => {
    const { name, value } = e.target
    const list = [...subRecipes]

    if (name ==='ingredientId' && value.length) {
        let formattedValue
        if (value[value.length - 1] === '') {
            formattedValue = value.split(' ').map(ele => ele[0].toUpperCase() + ele.slice(1).toLowerCase()).join(' ')
        } else {
            formattedValue = value[0].toUpperCase() + value.slice(1).toLowerCase()
        }

        let temp = {}

        for(let key in ingredients) {
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

/* ----------------------------------------------------------------------- */
/* -------------------Addition/Removal of SubRecipes---------------------- */
/* ----------------------------------------------------------------------- */

export const removeSubRecipeInput = (index, subRecipes, setSubRecipes) => {
    const list = [...subRecipes]
    list.splice(index, 1)
    setSubRecipes(list)
}

export const addSubRecipeInput = (subRecipes, setSubRecipes) => {
    setSubRecipes([...subRecipes, subRecipeTemplate()])
}

/* ------------------------------------------------------------------------ */
/* -------------------Addition/Removal of Ingredients---------------------- */
/* ------------------------------------------------------------------------ */

export const removeIngredientInput = async (subRecipeIndex, ingredientIndex, subRecipes, setSubRecipes) => {
        const list = [...subRecipes]
        const targetSubRecipe = list[subRecipeIndex].ingredients
        targetSubRecipe.splice(ingredientIndex, 1)
        await setSubRecipes(list)
}

export const addIngredientInput = (subRecipeIndex, subRecipes, setSubRecipes) => {
    const list = [...subRecipes]
    const targetSubRecipe = list[subRecipeIndex].ingredients
    targetSubRecipe.push(ingredientTemplate())
    setSubRecipes(list)
}

/* ------------------------------------------------------------------------ */
/* ------------------------Auto Expand Textarea---------------------------- */
/* ------------------------------------------------------------------------ */

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

export const handleTextArea = (e) => {
    autoExpand(e.target);
}

/* ------------------------------------------------------------------------ */
/* ------------------------AWS Upload & Preview---------------------------- */
/* ------------------------------------------------------------------------ */

export const handlePhoto = async (e, setPhoto) => {
    const imageFile = e.target.files[0]
    if (e.target.files[0]) {

        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight:1920,
            useWebWorker: true
        }
        const compressedFile = await imageCompression(imageFile, options)
        let newFile = new File([compressedFile], compressedFile.name)
        const formData = new FormData()
        formData.append('image', newFile)

        const res = await fetch('/api/images/', {
            method: "POST",
            body: formData
        });

        if (res.ok) {
            const imgUrl = await res.json()
            setPhoto(imgUrl.url)
        } 
    }
}

/* ------------------------------------------------------------------------ */
/* ------------------------------Formatting-------------------------------- */
/* ------------------------------------------------------------------------ */

export const formatter = (string) => {
    if (string.length > 1) {
        return string.split(' ').map(ing => ing[0].toUpperCase() + ing.slice(1).toLowerCase()).join(' ');
    }
    return string
}

export const formatSubRecipes = async (
    subRecipes, ingredients, userId, units, 
    categories, createUnit, addOrderCategory, 
    addIngredient, dispatch
) => {
    let formatSubRecipe = [...subRecipes]
    let tempIngredients = {...ingredients}
    for(let i = 0; i < formatSubRecipe.length; i++) {
        const subRecipe = formatSubRecipe[i]
        formatSubRecipe[i]['order'] = i

        for(let j = 0; j < subRecipe.ingredients.length; j++){

            const ingredient = subRecipe.ingredients[j]
            let {qty, unitId, ingredientId, category} = ingredient
            let index = null;
            if (qty) {
                for(let i = 0; i < qty.length; i++) {
                    let current = qty[i]
                    if (current === '.') continue
                    if ((isNaN(+current)) && (index === null)) {
                        index = i
                    }
                }
                unitId = qty.slice(index).trim()
                qty = +qty.slice(0, index).trim()
                formatSubRecipe[i].ingredients[j].qty = qty
            }
            
            if (!qty) formatSubRecipe[i].ingredients[j].qty = 0
            if (!unitId) formatSubRecipe[i].ingredients[j].unitId = 'None'
            if (!category) formatSubRecipe[i].ingredients[j].category = 'None'
            if (!ingredientId) {
                formatSubRecipe[i].ingredients[j].ingredientId = 'None'
                ingredientId = 'None'
            }

            if (!units[unitId]) {
                const newUnitObj = await dispatch(createUnit({"unit": unitId, "userId": userId}))
                unitId = newUnitObj.id
                formatSubRecipe[i].ingredients[j].unitId = unitId
            } else {
                formatSubRecipe[i].ingredients[j].unitId = units[unitId]
            }
            

            const formattedIngredient = formatter(ingredientId)

            if (!tempIngredients[formattedIngredient]){
                let formattedCategory
                if(category) {
                    formattedCategory = formatter(category)
                } else {
                    formattedCategory = 'Other'
                }
                    
                if(!categories[formattedCategory]){
                    let newCatObj = await dispatch(addOrderCategory({"userId": userId, "name": formattedCategory}))
                    category = newCatObj.id
                    formatSubRecipe[i].ingredients[j].category = category
                } else {
                    category = categories[formattedCategory]
                    formatSubRecipe[i].ingredients[j].category = category
                }
                const newIngredientObj = await dispatch(addIngredient({"name": formattedIngredient, "categoryId": category, "userId": userId}))
                ingredientId = newIngredientObj.ingredient.id
                tempIngredients[newIngredientObj.name] = newIngredientObj.ingredient
                formatSubRecipe[i].ingredients[j].ingredientId = ingredientId
            } else {
                ingredientId = tempIngredients[formattedIngredient].id
                formatSubRecipe[i].ingredients[j].ingredientId = ingredientId
            }
                
            formatSubRecipe[i].ingredients[j]['order'] = j
        }
    }
    return formatSubRecipe
}

export const formatTags = async (tags, userId, userTags, dispatch, addTag) => {
    const tagsArray = tags.split(' ')
    const formatted = []
    for(let i = 0; i < tagsArray.length; i++) {
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