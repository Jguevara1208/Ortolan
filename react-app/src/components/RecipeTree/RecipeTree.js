import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {setRecipeTree} from '../../store/recipesTree'
import Year from './Year';
import Tag from './Tag';

function RecipeTree(){
    const dispatch = useDispatch()

    const recipeTree = useSelector(state => state.recipesTree)
    const userId = useSelector(state => state.session.user.id)

    useEffect(() => {
        (async () => {
            await dispatch(setRecipeTree(userId))
        })()
    }, [dispatch])

    return (
        <div>
            <p>Recipes by Season</p>
            {recipeTree.tree && Object.keys(recipeTree.tree).map(year => (
                <Year year={year} seasons={recipeTree.tree[year]}/>
            ))}
            <p>Recipes by Tag</p>
            {recipeTree.tags && Object.keys(recipeTree.tags).map(tag => (
                <Tag tag={tag} dishes={recipeTree.tags[tag]}/>
            ))}
        </div>
    );
};

export default RecipeTree;
