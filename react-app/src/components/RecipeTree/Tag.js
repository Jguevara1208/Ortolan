import { useState } from 'react';
import RecipeLink from './RecipeLink';
import {AiOutlineFolderOpen, AiOutlineFolder} from 'react-icons/ai'

function Tag({tag, dishes}){
    const [show, setShow] = useState(false)

    return (
        <>
            {dishes.length > 0 && (
                <div className='year-container'>
                    <div className='year'>
                        {show ? <AiOutlineFolderOpen className='tree-icon' /> : <AiOutlineFolder className='tree-icon' />}
                        <p className='folder-text' onClick={() => setShow(!show)}>{tag}</p>
                    </div>
                    {show && (
                        <div className='recipe-border'>
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