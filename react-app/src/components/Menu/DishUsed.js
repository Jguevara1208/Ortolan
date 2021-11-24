import { useState } from 'react';

const DishUsed = ({dish, used}) => {

    const [selected, setSelected] = useState(used ? 'selected-recipe' : 'unselected-recipe')

    const handleSelected = () => selected === 'unselected-recipe' ? setSelected('selected-recipe') : setSelected('unselected-recipe')


    const getRandomColor = () => {
        const colors = ['#65916c', '#d7b968', '#7c6c66', '#cf8541']
        const randomInt = Math.floor(Math.random() * (3 + 1));
        return colors[randomInt]
    }
    
    return (
        <>
            {
                used 
                    ? 
                        dish.img !== 'false' 
                            ?
                                <div 
                                    id={dish.id}
                                    className={selected}
                                    style={
                                        {backgroundImage: `url('${dish.img}')`}
                                    } 
                                    onClick={handleSelected}
                                />
                            :
                                <div 
                                    id={dish.id}
                                    className={selected}
                                    style={
                                        {backgroundColor: `${getRandomColor()}`}
                                    }
                                    onClick={handleSelected}
                                >
                                    <p id={dish.id} className='current-menu-dish-title'>{dish.title}</p>
                                </div>
                    :
                        dish.photo !== 'false' 
                            ?
                                <div 
                                    id={dish.id}
                                    className={selected}
                                    style={
                                        {backgroundImage: `url('${dish.photo}')`}
                                    } 
                                    onClick={handleSelected}
                                />
                            :
                                <div 
                                    id={dish.id}
                                    className={selected}
                                    style={
                                        {backgroundColor: `${getRandomColor()}`}
                                    }
                                    onClick={handleSelected}
                                >
                                    <p id={dish.id} className='current-menu-dish-title'>{dish.title}</p>
                                </div>
            }
        </>
    );
};

export default DishUsed