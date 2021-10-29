import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { setAllRecipes } from '../../store/allRecipes';
import './Search.css';

function Search(){
    const dispatch = useDispatch()

    const allRecipes = useSelector(state => state.allRecipes)
    const userId = useSelector(state => state.session.user.id)

    const [filteredRecipes, setFilteredRecipes] = useState([])
    const [searchText, setSearchText] = useState('')
    const [showFilter, setShowFilter] = useState(false)

    useEffect(() => {
        filterRecipesFunc()
        if(searchText){
            setShowFilter(true)
        }else{
            setShowFilter(false)
        }
    }, [searchText])

    useEffect(() => {
        dispatch(setAllRecipes(userId))
    }, [dispatch])

    const filterRecipesFunc = (e) => {
        const newFilteredRecipes = Object.values(allRecipes).filter(recipe => {
            if(recipe.title.toLowerCase().includes(searchText.toLowerCase())){
                return recipe
            }
        })
        if (searchText === "") {
            setFilteredRecipes([]);
        } else {
            setFilteredRecipes(newFilteredRecipes);
        }
    }

    const letterColoring = (recipe) => {
          const res = {nameRest: '', nameMatch: ''}
          if (recipe.title.toLowerCase().startsWith(searchText.toLowerCase())) {
            res['nameRest'] = recipe.title.slice(searchText.length)
            res['nameMatch'] = recipe.title.slice(0, searchText.length)
          } else {
            res['nameRest'] = recipe.title
          }
          return res
    };

    const clearSearch = (e)=>{
        setFilteredRecipes([])
        setSearchText('')
    }

    const loseFocus = (e) => {
        setTimeout(() => {
            setShowFilter(false)
        }, 100);
    }

    return (
      <div className={showFilter ? 'search-bar-outer-container no-border' : 'search-bar-outer-container'}>
        <div className="search-bar">
            <input
                className="search-input"
                type="text"
                onChange={(e) => setSearchText(e.target.value)}
                placeholder='Search'
                value={searchText}
                onKeyPress={()=> setShowFilter(true)}
                onFocus={searchText.length ? () => setShowFilter(true) : null}
                onBlur={loseFocus}
            />
        </div>
        {showFilter && (
          <div className={showFilter ? `filteredRecipes filter-shadow` : 'filteredRecipes'} >
            <p className='filter-label'>Recipes</p>
            {filteredRecipes.map((recipe, i) => (
              <Link key={`search-${i}`} className="search-results" to={`/recipes/${recipe.id}`} onClick={clearSearch}>
                <div className='sr-container2'>
                  <p ><span className='span-colored'>{letterColoring(recipe)['nameMatch']}</span><span>{letterColoring(recipe)['nameRest']}</span></p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    );
};

export default Search;