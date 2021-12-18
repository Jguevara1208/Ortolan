import { CgRemoveR, CgAddR} from 'react-icons/cg'
import { ingredientInputChange, addIngredientInput, removeIngredientInput } from "./FormUtils";

const Ingredient = ({i, idx, ingredient, subRecipe, subRecipes, ingredients, setSubRecipes}) => {
    return (
        <div key={`ing-${i}-${idx}`} className='sr-ingredient-wrapper'>  
            <div className='ol-input qty'>
                <input 
                    className='qty-input'
                    maxLength='25'
                    type="text" 
                    placeholder=' '
                    name='qty'
                    value={ingredient.qty}
                    onChange={(e) => ingredientInputChange(e, i, idx, subRecipes, ingredients, setSubRecipes)}
                />
                <label htmlFor="qty">Qty & Unit</label>
            </div>
            <div className='ol-input'>
                <input 
                    type="text" 
                    placeholder=' '
                    maxLength='50'
                    name='ingredientId'
                    value={ingredient.ingredientId} 
                    onChange={(e) => ingredientInputChange(e, i, idx, subRecipes, ingredients, setSubRecipes)}
                />
                <label htmlFor="ingredientId">Ingredient</label>
            </div>
            <div className='ol-input'>
                <input 
                    maxLength='300'
                    type="text" 
                    placeholder=' '
                    name='description'
                    value={ingredient.description}
                    onChange={(e) => ingredientInputChange(e, i, idx, subRecipes, ingredients, setSubRecipes)}
                />
                <label htmlFor="description">Description</label>
            </div>
            <div className='ol-input'>
                <input 
                    id={`category-${i}-${idx}`}
                    maxLength='50'
                    type="text" 
                    placeholder=' '
                    name='category'
                    value={ingredient.category}
                    onChange={(e) => ingredientInputChange(e, i, idx, subRecipes, ingredients, setSubRecipes)}
                />
                <label htmlFor="category">Category</label>
            </div>
            {subRecipe.ingredients.length - 1 === idx && <CgAddR className='sri-button' onClick={() => addIngredientInput(i, subRecipes, setSubRecipes)} />}
            {subRecipe.ingredients.length !== 1 && <CgRemoveR className='sri-button' onClick={() => removeIngredientInput(i, idx, subRecipes, setSubRecipes)} />}
        </div>
    );
};

export default Ingredient