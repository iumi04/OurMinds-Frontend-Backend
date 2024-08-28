import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';
import Logo from "../../assets/images/logo.svg";
import Today from "../../assets/images/today.svg";
import Calendar from "../../assets/images/calendar.svg";
import Prompts from "../../assets/images/prompt.svg";
import Avtar from "../../assets/images/Avatar.svg";
import Arrow from "../../assets/images/right-arow.svg";

const Sidebar = () => {
    const [selectedItem, setSelectedItem] = useState('today');

    const handleItemClick = (item) => {
        setSelectedItem(item);
    };

    return (
        <div className="sidebar">
            <div className='side-bar-logo'>
                <div className='log-img'>
                    <img src={Logo} alt='logo' />
                </div>
                <div>
                    <h3 className=' mt-3'>OurMinds Journaling</h3>
                </div>
            </div>
            <ul>

                <li
                    className={selectedItem === 'today' ? 'selected' : ''}
                    onClick={() => handleItemClick('today')}
                >
                    <Link to="/">
                        <img src={Today} alt='today' width={22} height={22} />
                        <span className='px-2'>Today</span>
                    </Link>
                </li>
                <li
                    className={selectedItem === 'calendar' ? 'selected' : ''}
                    onClick={() => handleItemClick('calendar')}
                >
                    <Link to="/calendar">
                        <img src={Calendar} alt='calendar' width={22} height={22} />
                        <span className='px-2'>Calendar</span>
                    </Link>
                </li>
                <li
                    className={selectedItem === 'prompts' ? 'selected' : ''}
                    onClick={() => handleItemClick('prompts')}
                >
                    <Link to="/prompt">
                        <img src={Prompts} alt='prompts' width={22} height={22} />
                        <span className='px-2'>Prompts</span>
                    </Link>
                </li>
            </ul>
            <ul className='last-element'>
                <li
                    className={selectedItem === 'Avtar' ? 'selected' : ''}
                    onClick={() => handleItemClick('Avtar')}
                >
                    <Link to="/prompt">
                        <img src={Avtar} alt='prompts' width={30} height={30} />
                        <span className='px-2'>Ophelia W.</span>
                        <div className='px-5'>
                            <img src={Arrow} alt='Arrow' width={25} height={25} />
                        </div>
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
