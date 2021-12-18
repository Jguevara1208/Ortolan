import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { setOrderGuide } from '../../store/orderingGuide';

import './OrderingGuide.css'

const OrderingGuide = () => {
    const dispatch = useDispatch()

    const orderGuide = useSelector(state => state.orderGuide)
    const userId = useSelector(state => state.session.user.id)

    useEffect(() => {
        dispatch(setOrderGuide(userId))
        createColumns()
    }, [])

    useEffect(() => {
        createColumns()
    }, [orderGuide])

    const [cols, setCols] = useState(null)

    const createColumns = () => {
        let currentCount = 0
        let currentArray = 0

        let temp = {...orderGuide}

        const cols = {
            0: [],
            1: [],
            2: [],
            3: [],
        }

        const perCol = Math.floor(Object.values(orderGuide).reduce((acc, arr) => acc+arr.length, 0) / 4)

        Object.keys(temp).forEach(key => {
            let currArray = temp[key]
            let currLength = currArray.length
            if (key !== 'None' && key !== 'Prepared' && key !== 'Other') {
                if ((currentCount + currLength) < (perCol + 6)) {
                    currentCount += currLength
                    cols[currentArray].push({key: [key], ings: currArray})
                } else {
                    currentCount = 0 + currLength
                    if ((currentArray + 1) <= 3) {
                        currentArray += 1
                    } else {
                        currentArray = 0
                    }
                    cols[currentArray].push({key: [key], ings: currArray})
                }
            }
        })
        setCols(cols)
    }

    return (
        <div className='order-guide-container'>
            <h3>Current Menu's Order Guide</h3>
            {Object.keys(orderGuide).length === 0 
                ? 
                    <p className='order-guide-notice'>No dishes on your current menu.</p>
                :
                    <div className='order-guide-wrapper'>
                        {cols && (
                            <>
                                <div className="og-column">
                                    {cols['0'].map(cat => (
                                        <div className='og-category-container'>
                                            <p className='og-category'>{cat.key}</p>
                                            <div className='og-ings-container'>
                                                {cat.ings.map(ing => (
                                                    <p className='og-ing'>{ing}</p>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="og-column">
                                    {cols['1'].map(cat => (
                                        <div className='og-category-container'>
                                            <p className='og-category'>{cat.key}</p>
                                            <div className='og-ings-container'>
                                                {cat.ings.map(ing => (
                                                    <p className='og-ing'>{ing}</p>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="og-column">
                                    {cols['2'].map(cat => (
                                        <div className='og-category-container'>
                                            <p className='og-category'>{cat.key}</p>
                                            <div className='og-ings-container'>
                                                {cat.ings.map(ing => (
                                                    <p className='og-ing'>{ing}</p>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="og-column">
                                    {cols['3'].map(cat => (
                                        <div className='og-category-container'>
                                            <p className='og-category'>{cat.key}</p>
                                            <div className='og-ings-container'>
                                                {cat.ings.map(ing => (
                                                    <p className='og-ing'>{ing}</p>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
            }
        </div>
    );
};

export default OrderingGuide;