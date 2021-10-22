import { Link } from 'react-router-dom';
import { useState } from 'react';
import RecipeTree from '../RecipeTree/RecipeTree';

import 'react-circular-progressbar/dist/styles.css';

function RecipesPage() {
    return (
        <>
            <Link to='/recipes/new'>New Recipe</Link>
            <RecipeTree />
        </>
   );
}

export default RecipesPage;