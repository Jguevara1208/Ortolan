import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './RecipePhotoTree.css'

function RecipePhotoTree(){

    const recipesTree = useSelector(state => state.recipesTree)
    
    const [type, setType] = useState('')
    const [year, setYear] = useState('')
    const [season, setSeason] = useState('')

    const [tag, setTag] = useState('')

    const handleSetType = (t) => {
        setTag(false)
        setSeason('')
        setYear('')
        setType(t)
    }

    const handleYear = (yr) => {
        setSeason('')
        setTag('')
        setYear(yr.toString())
    }

    const handleTag = (tg) => {
        setTag(tg)
    }

    const handleSeason = (sn) => {
        setSeason(sn)
    }

    return (
        <div className='pt-container'>
            <div className='header-container'>
                <h3 className='pt-header'>Filter Recipes</h3>
            </div>
            {recipesTree && (
                <div className='pt-wrapper'>
                    <div className='pt-type'>
                        <p className={type === 'years' ? 'type pt-active' : 'type'} onClick={() => handleSetType('years')}>Year</p>
                        <p className={type === 'tags' ? 'type pt-active' : 'type'} onClick={() => handleSetType('tags')}>Tag</p>
                    </div>
                    {type && (
                        <div>
                            {type === 'years' 
                            ?
                                <div className='pt-type'>
                                    {recipesTree.tree && Object.keys(recipesTree.tree).map(yr => (
                                        <p className={year === yr ? 'type pt-active' : 'type'} onClick={() => handleYear(yr)} >{yr}</p>
                                    ))}
                                </div> 
                            :
                                <div className='pt-type'>
                                    {recipesTree.tags && Object.keys(recipesTree.tags).map(tg => (
                                        <>
                                            {recipesTree.tags[tg].length > 0 && (
                                                <p className={tag === tg ? 'type pt-active' : 'type'} onClick={() => handleTag(tg)}>{tg}</p>
                                            )}
                                        </>
                                    ))}
                                </div>
                            }
                        </div>
                    )}
                    {year && (
                        <div className='pt-type'>
                            {recipesTree.tree[year] && Object.keys(recipesTree.tree[year]).map(sn => (
                                <p className={season === sn ? 'type pt-active' : 'type'} onClick={() => handleSeason(sn)}>{sn}</p>
                            ))}
                        </div>
                    )}
                </div>
            )}
            {season && (
                <div className='ptr-container'>
                    {recipesTree.tree[year][season] && recipesTree.tree[year][season].map(recipe => (
                        <Link className='pt-recipe-link' to={`/recipes/${recipe.id}`}>
                            <p>{recipe.title}</p>
                            <div className='recipe-tree-photo' style={{backgroundImage: `url('${recipe.photo}')`}}></div>
                        </Link>
                    ))}
                </div>
            )}
            {tag && (
                <div className='ptr-container'>
                    {recipesTree.tags[tag] && recipesTree.tags[tag].map(recipe => (
                        <Link className='pt-recipe-link' to={`/recipes/${recipe.id}`}>
                            <p>{recipe.title}</p>
                            <div className='recipe-tree-photo' style={{ backgroundImage: `url('${recipe.photo}')` }}> 
                            </div>
                        </Link>
                    ))}
                </div>
            )}
            {(type === '') && (
                <div className='empty-filter'>
                    <p className='filter-me'>Filter to find your recipe</p>
                </div>
            )}
        </div>
    );
};

export default RecipePhotoTree;