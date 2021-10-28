import { useState } from 'react';
import Season from './Season';
import { AiOutlineFolderOpen, AiOutlineFolder } from 'react-icons/ai'

function Year({year, seasons}){
    const [show, setShow] = useState(false)

    return (
        <div className='year-container'>
            <div className='year'>
                {show ? <AiOutlineFolderOpen className='tree-icon' /> : <AiOutlineFolder className='tree-icon'/>}
                <p className='folder-text' onClick={() => setShow(!show)}>{year}</p>
            </div>
            {show && (
                <div className='season-border'>
                    {seasons && Object.keys(seasons).map(season => (
                        <Season key={`yr-${season}`} season={season} dishes={seasons[season]}/>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Year;