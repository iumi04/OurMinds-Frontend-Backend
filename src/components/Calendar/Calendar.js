import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sparkle from "../../assets/images/sparkle.svg";
import Notification from "../../assets/images/notification.svg";
import Arrow from "../../assets/images/aroows.svg";
import "./Calendar.css";
import Dropdown from 'react-bootstrap/Dropdown';
import Card from './Cards/Card';

const Calendar = () => {
    const [selectedOption, setSelectedOption] = useState("1 Week");
    const navigate = useNavigate();

    const handleDropdownSelect = (option) => {
        setSelectedOption(option);
    };

    let numberOfDays = 7;

    if (selectedOption === "2 Weeks") {
        numberOfDays = 14;
    } else if (selectedOption === "1 Month") {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();
        numberOfDays = new Date(currentYear, currentMonth + 1, 0).getDate();
    }

    const currentDate = new Date();
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const formattedDate = `${monthNames[currentDate.getMonth()]} ${currentDate.getDate()}, ${currentDate.getFullYear()}`;

    const handleCardClick = (formattedDate) => {
        navigate('/', { state: { selectedDate: formattedDate } });
    };

    return (
        <div id="calendar" className='evening-img'>
            <div className='container'>
                <div className='row mt-4'>
                    <div className='col-md-12'>
                        <div className='d-flex justify-content-between align-items-center'>
                            <div className='d-flex align-items-center'>
                                <div className='sparkle-img'>
                                    <img src={Sparkle} alt='sparkle' />
                                </div>
                                <div className='block'>
                                    <div className='heading-content'>
                                        <h1>Good evening, Ophelia!</h1>
                                    </div>
                                    <div className='date'>
                                        <p>{formattedDate}</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <img src={Notification} alt='notification' />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-12 d-flex justify-content-between'>
                        <div>
                            <p>{formattedDate}</p>
                        </div>
                        <div>
                            <div className='d-flex gap-4 images-arrow'>
                                <img src={Arrow} alt='arrow' width={35} height={35} />
                                <button className='today-btn'>Today</button>
                                <Dropdown onSelect={handleDropdownSelect}>
                                    <Dropdown.Toggle className="drop-down" variant="success" id="dropdown-basic">
                                        {selectedOption}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item eventKey="1 Week">1 Week</Dropdown.Item>
                                        <Dropdown.Item eventKey="2 Weeks">2 Weeks</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row pt-5'>
                    <div className='calender-cards'>
                        {[...Array(numberOfDays)].map((_, index) => (
                            <Card
                                key={index}
                                index={index}
                                onClick={handleCardClick}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Calendar;


