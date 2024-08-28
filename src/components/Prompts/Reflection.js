import React, { useState } from 'react';
import Down from "../../assets/images/downarrow.svg";
import Accept from "../../assets/images/accpet-2.svg";


const Reflection = () => {
    const [expandedSection, setExpandedSection] = useState(null);
    const toggleExpand = (section) => {
        setExpandedSection(prevSection => prevSection === section ? null : section);
    };
    return (
        <div>
            <div className='prompt-card mb-4'>
                <div className='today-section'>
                    <div className='d-flex'>
                        <div className='reflection'>
                            <p className='text-start discovery px-3'>Emotional Exploration</p>
                        </div>
                    </div>
                    <div className='input-texts pt-2 d-flex mb-3'>
                        <div className='input-content'>
                            <img src={Down} alt='downarrow' width={20} height={20} />
                            <p className='reflection pt-2 px-3'>Mindfulness Moments</p>
                        </div>
                        <div className='pe-3'>
                            <button
                                className='plus-button'
                                style={{
                                    backgroundColor: expandedSection === 'reflection' ? '#fff' : '#678561',
                                    color: expandedSection === 'reflection' ? '#678561' : '#fff'
                                }}
                                onClick={() => toggleExpand('reflection')}
                            >
                                {expandedSection === 'reflection' ? '-' : '+'}
                            </button>
                        </div>
                    </div>
                    {expandedSection === 'reflection' && (
                        <div className='expanded-content'>
                            <p>Here is the expanded content for today's Moments...</p>
                        </div>
                    )}

                    <div className='input-texts pt-2 d-flex mb-3'>
                        <div className='input-content'>
                            <img src={Accept} alt='downarrow' width={20} height={20} />
                            <p className='reflection pt-2 px-3'>Journaling</p>
                        </div>
                        <div className='pe-3'>
                            <button
                                className='plus-button'
                                style={{
                                    backgroundColor: expandedSection === 'gratitude' ? '#fff' : '#678561',
                                    color: expandedSection === 'gratitude' ? '#678561' : '#fff'
                                }}
                                onClick={() => toggleExpand('gratitude')}
                            >
                                {expandedSection === 'gratitude' ? '-' : '+'}
                            </button>
                        </div>
                    </div>
                    {expandedSection === 'gratitude' && (
                        <div className='expanded-content'>
                            <p>Here is the expanded content for today's Journaling...</p>
                        </div>
                    )}


                </div>
            </div>

        </div>
    )
}

export default Reflection