import { Link } from "react-router-dom"

function RecipeLink({recipe}){
    console.log(recipe)
    return (
        <div>
            <Link to={`/recipes/${recipe.recipeId}`}>
                {recipe.title}
            </Link>
        </div>
    );
};

export default RecipeLink;