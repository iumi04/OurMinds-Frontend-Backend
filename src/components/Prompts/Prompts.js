import React from 'react';
import "./Prompt.css";
import Sparkle from "../../assets/images/sparkle.svg";
import Notification from "../../assets/images/notification.svg";
import PromptSection from './PromptSection';

const Prompts = () => {
    const currentDate = new Date();
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const formattedDate = `${monthNames[currentDate.getMonth()]} ${currentDate.getDate()}, ${currentDate.getFullYear()}`;

    return (
        <div id="calendar" className='evening-img'>
            <div className='container'>
                <div className='row mt-4'>
                    <div className='col-md-6'>
                        <div className='d-flex'>
                            <div className='sparkle-img'>
                                <img src={Sparkle} alt='sparkle' />
                            </div>
                            <div className='heading-content'>
                                <h1>Good evening, Ophelia!</h1>
                            </div>
                        </div>
                        <div className='date'>
                            <p>{formattedDate}</p>
                        </div>
                    </div>
                    <div className='col-md-6'>
                        <div className='text-end'>
                            <img src={Notification} alt='notification' />
                        </div>
                    </div>
                </div>
                <PromptSection />
            </div>

        </div>
    );
}

export default Prompts;
