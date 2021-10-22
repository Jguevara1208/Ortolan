import { useState } from 'react';
import Season from './Season';

function Year({year, seasons}){
    const [show, setShow] = useState(false)

    return (
        <div>
            <p onClick={() => setShow(!show)}>{year}</p>
            {show && (
                <div>
                    {seasons && Object.keys(seasons).map(season => (
                        <Season season={season} dishes={seasons[season]}/>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Year;