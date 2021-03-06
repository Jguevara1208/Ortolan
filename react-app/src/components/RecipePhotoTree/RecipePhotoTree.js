import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { MdOutlinePhotoSizeSelectActual } from 'react-icons/md'
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

    const getRandomColor = () => {
        const colors = ['#65916c', '#d7b968', '#7c6c66', '#cf8541']
        const randomInt = Math.floor(Math.random() * (3 + 1));
        return colors[randomInt]
    }

    return (
        <div className='pt-container'>
            <div className='header-container'>
                <h3 className='pt-header'>Filter Dishes</h3>
            </div>
            {recipesTree && (
                <div className='pt-wrapper'>
                    <div className='pt-type'>
                        <p className={type === 'years' ? 'type pt-active' : 'type link'} onClick={() => handleSetType('years')}>Year</p>
                        <p className={type === 'tags' ? 'type pt-active' : 'type link'} onClick={() => handleSetType('tags')}>Tag</p>
                    </div>
                    {type && (
                        <div>
                            {type === 'years' 
                            ?
                                <div className='pt-type'>
                                    {recipesTree.tree && Object.keys(recipesTree.tree).map(yr => (
                                        <p key={yr} className={year === yr ? 'type pt-active' : 'type link'} onClick={() => handleYear(yr)} >{yr}</p>
                                    ))}
                                </div> 
                            :
                                <div className='pt-type'>
                                    {recipesTree.tags && Object.keys(recipesTree.tags).map(tg => (
                                        <>
                                            {recipesTree.tags[tg].length > 0 && (
                                                <p key={tg} className={tag === tg ? 'type pt-active' : 'type link'} onClick={() => handleTag(tg)}>{tg}</p>
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
                                <p key={sn} className={season === sn ? 'type pt-active' : 'type link'} onClick={() => handleSeason(sn)}>{sn}</p>
                            ))}
                        </div>
                    )}
                </div>
            )}
            {season && (
                <div className='ptr-container'>
                    {recipesTree.tree[year][season] && recipesTree.tree[year][season].map(recipe => (
                        <Link key={`ssn-${recipe.id}`} className='pt-recipe-link' to={`/recipes/${recipe.id}`}>
                            <p>{recipe.title}</p>
                            <div className='recipe-tree-photo' style={ recipe.photo !== 'false' ? {backgroundImage: `url('${recipe.photo}')`} : {backgroundColor: `${getRandomColor()}`}}>
                                {recipe.photo === 'false' && <MdOutlinePhotoSizeSelectActual className='db-no-photo'/>}
                            </div>
                        </Link>
                    ))}
                </div>
            )}
            {tag && (
                <div className='ptr-container'>
                    {recipesTree.tags[tag] && recipesTree.tags[tag].map(recipe => (
                        <Link key={`tag-${recipe.id}`} className='pt-recipe-link' to={`/recipes/${recipe.id}`}>
                            <p>{recipe.title}</p>
                            <div className='recipe-tree-photo' style={ recipe.photo !== 'false' ? {backgroundImage: `url('${recipe.photo}')`} : {backgroundColor: `${getRandomColor()}`}}>
                                {recipe.photo === 'false' && <MdOutlinePhotoSizeSelectActual className='db-no-photo'/>}
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