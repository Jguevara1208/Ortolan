import { Link } from 'react-router-dom';
import { useState } from 'react';
import RecipeTree from '../RecipeTree/RecipeTree';
import Search from '../Search/Search';
import RecipePhotoTree from '../RecipePhotoTree/RecipePhotoTree';

import 'react-circular-progressbar/dist/styles.css';

function RecipesPage() {
    return (
        <>
            <Link to='/recipes/new'>New Recipe</Link>
            <RecipeTree />
            <div>
                <Search/>
                <RecipePhotoTree/>
            </div>
        </>
   );
}

export default RecipesPage;