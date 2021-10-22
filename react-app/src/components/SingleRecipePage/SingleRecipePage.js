import { useParams, useHistory } from 'react-router';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentRecipe } from '../../store/currentRecipe';
import { deleteCurrentRecipe } from '../../store/currentRecipe';
import './SingleRecipePage.css'

function SingleRecipePage(){
    const {recipeId}= useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    const currentRecipe = useSelector(state => state.currentRecipe);

    const [showDelete, setShowDelete] = useState(false);

    useEffect(() => {
        dispatch(setCurrentRecipe(recipeId));
    }, [dispatch])

    const deleteRecipe = async () => {
        setShowDelete(false)
        await dispatch(deleteCurrentRecipe(recipeId))
        history.push('/recipes')
    }

    return (
        <div>
            {currentRecipe && (
                <div>
                    <div>
                        <p>{currentRecipe.season} {currentRecipe.year}</p>
                        <h2>{currentRecipe.title}</h2>
                    </div>
                    <div>
                        <div className='recipe-photo' style={{backgroundImage: `url('${currentRecipe.photo}')`}}/>
                    </div>
                    <div>
                        <h2>Components</h2>
                        <p>{currentRecipe.components}</p>
                    </div>
                    <div>
                        <h3>Recipes</h3>
                        <div>
                            {currentRecipe.subRecipes && Object.values(currentRecipe.subRecipes).map(recipe => (
                                <>
                                    <p>{recipe.title}</p>
                                    <div>
                                        {recipe.ingredients && Object.values(recipe.ingredients).map(ing => (
                                            <p>{ing.qty}{ing.unit} {ing.ingredient}{ing.description ? `, ${ing.description}` : ''}</p>
                                        ))}
                                    </div>
                                    <div>
                                        <p>{recipe.description}</p>
                                    </div>
                                </>
                            ))}
                        </div>
                    </div>
                    <div>
                        <Link to={`/recipes/${recipeId}/edit`}>
                            <button>Edit</button>
                        </Link>
                        <button onClick={() => setShowDelete(!showDelete)}>Delete</button>
                        {showDelete && (
                            <div>
                                <p>Are you sure you want to delete this recipe?</p>
                                <button onClick={deleteRecipe}>Confirm</button>
                                <button onClick={() => setShowDelete(false)}>Cancel</button>
                            </div>
                        )}
                    </div>
                </div>
            )}
            
        </div>
    );
};

export default SingleRecipePage;