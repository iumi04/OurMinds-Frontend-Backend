import React from 'react';

const Checkbox = ({ checked, onChange }) => {
    return (
        <label className="checkbox-container">
            <input
                type="checkbox"
                checked={checked}
                onChange={onChange}
            />
            <span className="checkmark"></span>
        </label>
    );
};

export default Checkbox;
