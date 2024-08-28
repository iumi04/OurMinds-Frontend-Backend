import React, { useState, useEffect } from 'react';
import './Card.css';
import CardList from './CardList';

const Card = ({ className, index, onClick }) => {
    const currentDate = new Date();
    const startDate = new Date(currentDate);
    startDate.setDate(startDate.getDate() - currentDate.getDay() + index);

    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const formattedDate = `${dayNames[startDate.getDay()]} ${startDate.getDate()} ${monthNames[startDate.getMonth()]}`;

    const [checkedStates, setCheckedStates] = useState([false, false, false]);

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem(formattedDate));
        if (storedData && storedData['Today’s reflection']) {
            setCheckedStates([true, false, false]);
        }
    }, [formattedDate]);

    const handleCheckboxChange = (index) => {
        const newCheckedStates = [...checkedStates];
        newCheckedStates[index] = !newCheckedStates[index];
        setCheckedStates(newCheckedStates);
    };

    const handleCardClick = () => {
        onClick(formattedDate);
    };

    let dynamicClassName = className;
    if (startDate.toDateString() === currentDate.toDateString()) {
        dynamicClassName = 'green-card';
    } else if (startDate.getDay() === 6) {
        dynamicClassName = 'purple-card';
    }

    return (
        <div className={`card ${dynamicClassName}`} style={{ width: '100%' }} onClick={handleCardClick}>
            <div className='card-date'>
                <p>{formattedDate}</p>
            </div>
            <CardList
                items={['Evening meditation', 'Mindfulness Moments', 'Gratitude Log']}
                checkedStates={checkedStates}
                onChange={handleCheckboxChange}
            />
        </div>
    );
};

export default Card;

