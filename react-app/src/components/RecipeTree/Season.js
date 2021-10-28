import { useState } from 'react';
import RecipeLink from './RecipeLink';
import { AiOutlineFolderOpen, AiOutlineFolder } from 'react-icons/ai'

function Season({season ,dishes}){
    const [show, setShow] = useState(false)

    return (
        <div>
            <div className='season'>
                {show ? <AiOutlineFolderOpen className='tree-icon'/> : <AiOutlineFolder className='tree-icon'/>}
                <p className='folder-text' onClick={() => setShow(!show)}>{season}</p>
            </div>
            {show && (
                <div className='recipe-border'>
                    {dishes && dishes.map(dish => (
                        <RecipeLink key={`dish-${dish.id}`} recipe={dish} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Season;