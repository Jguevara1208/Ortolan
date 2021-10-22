import { useState } from 'react';
import RecipeLink from './RecipeLink';

function Tag({tag, dishes}){
    const [show, setShow] = useState(false)

    return (
        <>
            {dishes.length > 0 && (
                <div>
                    <p onClick={() => setShow(!show)}>{tag}</p>
                    {show && (
                        <div>
                            {dishes && dishes.map(dish => (
                                <RecipeLink recipe={dish}/>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default Tag