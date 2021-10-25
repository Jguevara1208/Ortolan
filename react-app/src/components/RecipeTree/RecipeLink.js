import { Link } from "react-router-dom"
import { AiOutlineFile } from 'react-icons/ai'

function RecipeLink({recipe}){
    return (
        <div className='tree-link'>
            <AiOutlineFile className='tree-icon'/>
            <Link to={`/recipes/${recipe.recipeId}`}>
                {recipe.title}
            </Link>
        </div>
    );
};

export default RecipeLink;