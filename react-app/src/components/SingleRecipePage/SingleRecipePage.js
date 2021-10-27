import { useParams, useHistory } from 'react-router';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentRecipe } from '../../store/currentRecipe';
import { deleteCurrentRecipe } from '../../store/currentRecipe';
import { FiEdit2 } from 'react-icons/fi'
import { TiDocumentDelete } from 'react-icons/ti'
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
        <div className='srp-container'>
            {currentRecipe && (
                <div className='srp-wrapper'>
                    <div className='srp-title-season'>
                        <p>{currentRecipe.season} {currentRecipe.year}</p>
                        <h2>{currentRecipe.title}</h2>
                    </div>
                    <div>
                        <div className='recipe-photo' style={{backgroundImage: `url('${currentRecipe.photo}')`}}/>
                    </div>
                    <div className='srp-components'>
                        <h2 className='srp-header'>Components</h2>
                        {currentRecipe?.components?.split('\n')?.map(ele => (
                            <p className='srp-component'>• {ele}</p>
                        ))}
                    </div>
                    <div>
                        <h2 className='srp-header recipe-diff'>Recipes</h2>
                        <div className='srp-recipes-container'>
                            {currentRecipe.subRecipes && Object.values(currentRecipe.subRecipes).map(recipe => (
                                <div className='srp-recipe'>
                                    {console.log(recipe.description)}
                                    <p className='srp-recipe-title'>{recipe.title}</p>
                                    <div className='srp-ing-wrapper'>
                                        {recipe.ingredients && Object.values(recipe.ingredients).map(ing => (
                                            <p className='srp-ing-line'>{ing.qty !== 0 ? ing.qty : ''}{ing.unit} {ing.ingredient !== 'None' ? ing.ingredient : ''}{ing.description ? `, ${ing.description}` : ''}</p>
                                        ))}
                                    </div>
                                    <div>
                                        {recipe.description.split('\n').map(paragraph => (
                                            <>
                                                <p className='paragraph'>{paragraph}</p>
                                                <br />
                                            </>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
            <div className='srp-buttons'>
                <Link className='' to={`/recipes/${recipeId}/edit`}>
                    <FiEdit2 className='srp-button1' />
                </Link>
                <TiDocumentDelete className='srp-button2' onClick={() => setShowDelete(!showDelete)}/>
                {showDelete && (
                    <div className='srp-delete'>
                        <p className='srp-confirmation'>Are you sure you want to delete this recipe?</p>
                        <div className='srp-delete-contianer'>
                            <button className='srp-confirm' onClick={deleteRecipe}>Confirm</button>
                            <button className='srp-cancel' onClick={() => setShowDelete(false)}>Cancel</button>
                        </div>
                    </div>
                )}
            </div>
            
        </div>
    );
};

export default SingleRecipePage;