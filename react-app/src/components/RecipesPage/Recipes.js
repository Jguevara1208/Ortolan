import RecipeTree from '../RecipeTree/RecipeTree';
import RecipePhotoTree from '../RecipePhotoTree/RecipePhotoTree';

import 'react-circular-progressbar/dist/styles.css';

function RecipesPage() {
    return (
        <>
            <RecipeTree />
            <RecipePhotoTree/>
        </>
   );
}

export default RecipesPage;