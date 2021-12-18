import Ingredient from "./Ingredient";
import { subRecipeInputChange, removeSubRecipeInput, addSubRecipeInput, handleTextArea} from "./FormUtils";
import { FaTrashAlt } from 'react-icons/fa'

const SubRecipe = ({subRecipe, i, subRecipes, setSubRecipes, ingredients}) => {
    return (
        <div key={`subrecipe-${i}`} className='sr-wrapper'>
            <div className='subrecipe-title-trash'>
                
                <div className='ol-input recipe-title'>
                    <input
                        maxLength='250'
                        name='title'
                        placeholder=' '
                        value={subRecipe.title}
                        onChange={(e) => subRecipeInputChange(e, i, subRecipes, setSubRecipes)}
                    />
                    <label htmlFor="title">Recipe Title</label>
                </div>

                {subRecipes.length !== 1 && 
                    <FaTrashAlt 
                        className='remove-sr-trash' 
                        onClick={() => removeSubRecipeInput(i, subRecipes, setSubRecipes)}
                    />
                }
            </div>
            <h3>Ingredients</h3>

            {subRecipe.ingredients.map((ingredient, idx) => (
                <Ingredient 
                    i={i} 
                    idx={idx} 
                    ingredient={ingredient} 
                    subRecipe={subRecipe} 
                    subRecipes={subRecipes} 
                    ingredients={ingredients} 
                    setSubRecipes={setSubRecipes}
                />
            ))}

            <h3>Preperation</h3>

            <div className='ol-input ol-input-description'>
                <textarea 
                    name="description"
                    className='description'
                    onInput={handleTextArea}
                    value={subRecipe.description}
                    onChange={(e) => subRecipeInputChange(e, i, subRecipes, setSubRecipes)}
                ></textarea>
                <label htmlFor="description">Description</label>
            </div>

            <div className='sub-recipe-buttons'>
                {subRecipes.length -1 === i && 
                    <button 
                        className='add-sr' 
                        onClick={() => addSubRecipeInput(subRecipes, setSubRecipes)
                    }>
                    Add Recipe
                    </button>
                }
            </div>
        </div>
    );
};

export default SubRecipe