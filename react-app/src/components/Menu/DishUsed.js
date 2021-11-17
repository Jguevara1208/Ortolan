import { useState } from 'react';

const DishUsed = ({dish, used}) => {

    const [selected, setSelected] = useState(used ? 'selected-recipe' : 'unselected-recipe')

    const handleSelected = () => selected === 'unselected-recipe' ? setSelected('selected-recipe') : setSelected('unselected-recipe')

    return (
        <div id={dish.id} className={selected} style={{backgroundImage: `url('${used ? dish.img : dish.photo}')`}} onClick={handleSelected}/>
    );
};

export default DishUsed