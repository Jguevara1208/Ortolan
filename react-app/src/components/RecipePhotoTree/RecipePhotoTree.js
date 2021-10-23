import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './RecipePhotoTree.css'

function RecipePhotoTree(){

    const recipesTree = useSelector(state => state.recipesTree)
    
    const [type, setType] = useState('')

    const [yearFilter, setYearFilter] = useState(false)
    const [year, setYear] = useState('')
    const [seasonFilter, setSeasonFilter] = useState(false)
    const [season, setSeason] = useState('')

    const [tag, setTag] = useState('')

    const handleSetType = (t) => {
        setYearFilter(false)
        setSeasonFilter(false)
        setTag(false)
        setSeason('')
        setYear('')
        setType(t)
    }

    const handleYear = (yr) => {
        setYearFilter(true)
        setSeasonFilter(false)
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

    const formatDate = (date) => {
        const dateArr = date.split(' ')
        return `${dateArr[2]} ${dateArr[1]}, ${dateArr[3]}`
    }

    return (
        <div>
            {recipesTree && (
                <>
                    <div>
                        <p onClick={() => handleSetType('years')}>Year</p>
                        <p onClick={() => handleSetType('tags')}>Tag</p>
                    </div>
                    {type && (
                        <div>
                            {type === 'years' 
                            ?
                                <div>
                                    {recipesTree.tree && Object.keys(recipesTree.tree).map(yr => (
                                        <p onClick={() => handleYear(yr)} >{yr}</p>
                                    ))}
                                </div> 
                            :
                                <div>
                                    {recipesTree.tags && Object.keys(recipesTree.tags).map(tg => (
                                        <>
                                            {recipesTree.tags[tg].length > 0 && (
                                                <p onClick={() => handleTag(tg)}>{tg}</p>
                                            )}
                                        </>
                                    ))}
                                </div>
                            }
                        </div>
                    )}
                    {year && (
                        <>
                            {recipesTree.tree[year] && Object.keys(recipesTree.tree[year]).map(sn => (
                                <p onClick={() => handleSeason(sn)}>{sn}</p>
                            ))}
                        </>
                    )}
                    {season && (
                        <>
                            {recipesTree.tree[year][season] && recipesTree.tree[year][season].map(recipe => (
                                <div>
                                    <Link to={`/recipes/${recipe.id}`}>
                                        <p>{recipe.title}</p>
                                        <div className='recipe-tree-photo' style={{backgroundImage: `url('${recipe.photo}')`}}></div>
                                        <p>{formatDate(recipe.created_at)}</p>
                                    </Link>
                                </div>
                            ))}
                        </>
                    )}
                    {tag && (
                        <>
                            {recipesTree.tags[tag] && recipesTree.tags[tag].map(recipe => (
                                <div>
                                    <Link to={`/recipes/${recipe.id}`}>
                                        <p>{recipe.title}</p>
                                        <div className='recipe-tree-photo' style={{ backgroundImage: `url('${recipe.photo}')` }}></div>
                                        <p>{formatDate(recipe.created_at)}</p>
                                    </Link>
                                </div>
                            ))}
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default RecipePhotoTree;