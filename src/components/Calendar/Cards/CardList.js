import React from 'react';
import Checkbox from './Checkbox';

const CardList = ({ items, checkedStates, onChange }) => {
    return (
        <>
            {items.map((item, index) => (
                <div className='card-list' key={index}>
                    <Checkbox checked={checkedStates[index]} onChange={() => onChange(index)} />
                    <p className={`everything ${checkedStates[index] ? 'selected' : ''}`}>{item}</p>
                </div>
            ))}
        </>
    );
};

export default CardList;
