import { useState } from 'react';
import RecipeLink from './RecipeLink';

function Season({season ,dishes}){
    const [show, setShow] = useState(false)

    return (
        <div>
            <p onClick={() => setShow(!show)}>{season}</p>
            {show && (
                <div>
                    {dishes && dishes.map(dish => (
                        <RecipeLink recipe={dish} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Season;