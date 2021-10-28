import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {setRecipeTree} from '../../store/recipesTree'
import { Link } from 'react-router-dom';
import Year from './Year';
import Tag from './Tag';
import Search from '../Search/Search';
import './RecipeTree.css'

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
        <div className='tree'>
                <Link className='new-recipe' to='/recipes/new'>New Recipe</Link>
                <Search />
            <div>
                <p>Recipes by Season</p>
                {recipeTree.tree && Object.keys(recipeTree.tree).map(year => (
                    <Year key={`tree-year-${year}`} year={year} seasons={recipeTree.tree[year]}/>
                ))}

            </div>
            <div>
                <p>Recipes by Tag</p>
                {recipeTree.tags && Object.keys(recipeTree.tags).map(tag => (
                    <Tag key={`tree-tag-${tag}`} tag={tag} dishes={recipeTree.tags[tag]}/>
                ))}
            </div>
        </div>
    );
};

export default RecipeTree;
