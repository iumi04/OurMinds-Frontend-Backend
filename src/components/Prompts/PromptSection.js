

import React, { useState } from 'react';
import Daily from "../../assets/images/daily-prompt.svg";
import Down from "../../assets/images/downarrow.svg";
import Accept from "../../assets/images/accept.svg";
import WeeklyPrompt from './WeeklyPrompt';

const PromptSection = ({ handleShowReflection }) => {

    const [expandedSection, setExpandedSection] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleExpand = (section) => {
        setExpandedSection(prevSection => prevSection === section ? null : section);
    };
    const openModal = () => {
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleModalOpen = () => {
        setIsModalOpen(true);
    };

    return (
        <div>
            <div className=''>
                <div className='row mt-4 justify-content-between'>
                    <div className='col-md-6'>
                        <div className=' section-prompt overflow-hidden'>
                            <div className='position-relative  background-images'>
                                <div className='d-flex pt-3'>
                                    <div className='sparkle-img'>
                                        <img src={Daily} alt='Daily' />
                                    </div>
                                    <div className='text-start px-3'>
                                        <p className='prompt-content mb-1'>DAILY PROMPTS</p>
                                        <p className='prompts-text mb-1'>
                                            Prompts to follow every day
                                        </p>
                                    </div>
                                </div>
                                <div className='prompt-card mb-4 pt-4'>
                                    <div className='today-section' >
                                        <div className='d-flex'>
                                            <div className='reflection'>
                                                <p className='text-start discovery px-3'>Self-Discovery</p>
                                            </div>
                                        </div>
                                        <div className='input-texts pt-2 d-flex mb-3'>
                                            <div className='input-content' onClick={() => handleShowReflection("Today's Reflection")}>
                                                <img src={Down} alt='downarrow' width={20} height={20} />
                                                <p className='reflection pt-2 px-3'>Today’s reflection</p>
                                            </div>
                                            <div className='pe-3' onClick={openModal}>
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

                                        <div className='input-texts pt-2 d-flex mb-3'>
                                            <div className='input-content' onClick={() => handleShowReflection("Gratitude Log")}>
                                                <img src={Down} alt='downarrow' width={20} height={20} />
                                                <p className='reflection pt-2 px-3'>Gratitude Log</p>
                                            </div>
                                            <div className='pe-3' onClick={openModal}>
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

                                        <div className='input-texts pt-2 d-flex mb-3'>
                                            <div className='input-content' onClick={() => handleShowReflection("New Acceptance")}>
                                                <img src={Accept} alt='accept' width={15} height={15} />
                                                <p className='reflection pt-2 px-3'>New Acceptance</p>
                                            </div>
                                            <div className='pe-3' onClick={openModal}>
                                                <button
                                                    className='plus-button'
                                                    style={{
                                                        backgroundColor: expandedSection === 'acceptance' ? '#fff' : '#678561',
                                                        color: expandedSection === 'acceptance' ? '#678561' : '#fff'
                                                    }}
                                                    onClick={() => toggleExpand('acceptance')}
                                                >
                                                    {expandedSection === 'acceptance' ? '-' : '+'}
                                                </button>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div className='prompt-card mb-4'>
                                    <div className='today-section' >
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
                                            <div className='pe-3' onClick={openModal}>
                                                <button
                                                    className='plus-button'
                                                    style={{
                                                        backgroundColor: expandedSection === 'Moments' ? '#fff' : '#678561',
                                                        color: expandedSection === 'Moments' ? '#678561' : '#fff'
                                                    }}
                                                    onClick={() => toggleExpand('Moments')}
                                                >
                                                    {expandedSection === 'Moments' ? '-' : '+'}
                                                </button>
                                            </div>
                                        </div>


                                        <div className='input-texts pt-2 d-flex mb-3'>
                                            <div className='input-content'>
                                                <img src={Accept} alt='downarrow' width={20} height={20} />
                                                <p className='reflection pt-2 px-3'>Journaling</p>
                                            </div>
                                            <div className='pe-3' onClick={openModal}>
                                                <button
                                                    className='plus-button'
                                                    style={{
                                                        backgroundColor: expandedSection === 'Journaling' ? '#fff' : '#678561',
                                                        color: expandedSection === 'Journaling' ? '#678561' : '#fff'
                                                    }}
                                                    onClick={() => toggleExpand('Journaling')}
                                                >
                                                    {expandedSection === 'Journaling' ? '-' : '+'}
                                                </button>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div className='prompt-card mb-4'>
                                    <div className='today-section' >
                                        <div className='d-flex'>
                                            <div className='reflection'>
                                                <p className='text-start discovery px-3'>Moving Forward</p>
                                            </div>
                                        </div>
                                        <div className='input-texts pt-2 d-flex mb-3'>
                                            <div className='input-content'>
                                                <img src={Down} alt='downarrow' width={20} height={20} />
                                                <p className='reflection pt-2 px-3'>Letting Go</p>
                                            </div>
                                            <div className='pe-3' onClick={openModal}>
                                                <button
                                                    className='plus-button'
                                                    style={{
                                                        backgroundColor: expandedSection === 'Letting' ? '#fff' : '#678561',
                                                        color: expandedSection === 'Letting' ? '#678561' : '#fff'
                                                    }}
                                                    onClick={() => toggleExpand('Letting')}
                                                >
                                                    {expandedSection === 'reflection' ? '-' : '+'}
                                                </button>
                                            </div>
                                        </div>


                                        <div className='input-texts pt-2 d-flex mb-3'>
                                            <div className='input-content'>
                                                <img src={Accept} alt='downarrow' width={20} height={20} />
                                                <p className='reflection pt-2 px-3'>Fear Facing</p>
                                            </div>
                                            <div className='pe-3' onClick={openModal}>
                                                <button
                                                    className='plus-button'
                                                    style={{
                                                        backgroundColor: expandedSection === 'Fear' ? '#fff' : '#678561',
                                                        color: expandedSection === 'Fear' ? '#678561' : '#fff'
                                                    }}
                                                    onClick={() => toggleExpand('Fear')}
                                                >
                                                    {expandedSection === 'Fear' ? '-' : '+'}
                                                </button>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='col-md-6'>
                        <div className='section-prompts'>
                            <WeeklyPrompt handleModalOpen={handleModalOpen} />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default PromptSection;

