// import React, { useState } from 'react';
// import Daily from "../../assets/images/daily-prompt.svg";
// import Accept from "../../assets/images/accept.svg";
// import Regenrate from "../../assets/images/regenrate.svg";
// import Shadow from "../../assets/images/accpet-2.svg";
// import Down from "../../assets/images/downarrow.svg";

// const WeeklyPrompt = ({ handleModalOpen }) => {

//     const [expandedSection, setExpandedSection] = useState(null);
//     const toggleExpand = (section) => {
//         setExpandedSection(prevSection => prevSection === section ? null : section);
//     };

//     return (
//         <div>
//             <div className='d-flex pt-3'>
//                 <div className='sparkle-img'>
//                     <img src={Daily} alt='Daily' />
//                 </div>
//                 <div className='text-start px-3'>
//                     <p className='prompt-content mb-1'>WEEKLY PROMPTS</p>
//                     <p className='prompts-text mb-1'>
//                         Prompts to follow weekly
//                     </p>
//                 </div>
//             </div>
//             <div className='prompt-card mb-4 pt-4'>
//                 <div className='today-section'>
//                     <div className='d-flex'>
//                         <div className='reflection'>
//                             <p className='text-start discovery px-3'>Self-Discovery</p>
//                         </div>
//                     </div>
//                     <div className='input-texts pt-2 d-flex mb-3'>
//                         <div className='input-content'>
//                             <img src={Regenrate} alt='downarrow' width={20} height={20} />
//                             <p className='reflection pt-2 px-3'>Personal Growth</p>
//                         </div>
//                         <div className='pe-3' onClick={handleModalOpen}>
//                             <button
//                                 className='plus-button'
//                                 style={{
//                                     backgroundColor: expandedSection === 'reflection' ? '#fff' : '#678561',
//                                     color: expandedSection === 'reflection' ? '#678561' : '#fff'
//                                 }}
//                                 onClick={() => toggleExpand('reflection')}
//                             >
//                                 {expandedSection === 'reflection' ? '-' : '+'}
//                             </button>
//                         </div>
//                     </div>
//                     {expandedSection === 'reflection' && (
//                         <div className='expanded-content'>
//                             <p>Here is the expanded content for today's reflection...</p>
//                         </div>
//                     )}
//                     <div className='input-texts pt-2 d-flex mb-3'>
//                         <div className='input-content'>
//                             <img src={Shadow} alt='downarrow' width={20} height={20} />
//                             <p className='reflection pt-2 px-3'>Shadow Work</p>
//                         </div>
//                         <div className='pe-3' onClick={handleModalOpen}>
//                             <button
//                                 className='plus-button'
//                                 style={{
//                                     backgroundColor: expandedSection === 'gratitude' ? '#fff' : '#678561',
//                                     color: expandedSection === 'gratitude' ? '#678561' : '#fff'
//                                 }}
//                                 onClick={() => toggleExpand('gratitude')}
//                             >
//                                 {expandedSection === 'gratitude' ? '-' : '+'}
//                             </button>
//                         </div>
//                     </div>
//                     {expandedSection === 'gratitude' && (
//                         <div className='expanded-content'>
//                             <p>Here is the expanded content for today's gratitude...</p>
//                         </div>
//                     )}
//                     <div className='input-texts pt-2 d-flex mb-3'>
//                         <div className='input-content'>
//                             <img src={Accept} alt='accept' width={15} height={15} />
//                             <p className='reflection pt-2 px-3'>Future Self</p>
//                         </div>
//                         <div className='pe-3' onClick={handleModalOpen}>
//                             <button
//                                 className='plus-button'
//                                 style={{
//                                     backgroundColor: expandedSection === 'acceptance' ? '#fff' : '#678561',
//                                     color: expandedSection === 'acceptance' ? '#678561' : '#fff'
//                                 }}
//                                 onClick={() => toggleExpand('acceptance')}
//                             >
//                                 {expandedSection === 'acceptance' ? '-' : '+'}
//                             </button>
//                         </div>
//                     </div>
//                     {expandedSection === 'acceptance' && (
//                         <div className='expanded-content'>
//                             <p>Here is the expanded content for today's acceptance...</p>
//                         </div>
//                     )}
//                 </div>
//             </div>

//             <div className='prompt-card mb-4'>
//                 <div className='today-section'>
//                     <div className='d-flex'>
//                         <div className='reflection'>
//                             <p className='text-start discovery px-3'>Emotional Exploration</p>
//                         </div>
//                     </div>
//                     <div className='input-texts pt-2 d-flex mb-3'>
//                         <div className='input-content'>
//                             <img src={Down} alt='downarrow' width={20} height={20} />
//                             <p className='reflection pt-2 px-3'>Mindfulness Moments</p>
//                         </div>
//                         <div className='pe-3' onClick={handleModalOpen}>
//                             <button
//                                 className='plus-button'
//                                 style={{
//                                     backgroundColor: expandedSection === 'Mindfulness' ? '#fff' : '#678561',
//                                     color: expandedSection === 'Mindfulness' ? '#678561' : '#fff'
//                                 }}
//                                 onClick={() => toggleExpand('Mindfulness')}
//                             >
//                                 {expandedSection === 'Mindfulness' ? '-' : '+'}
//                             </button>
//                         </div>
//                     </div>
//                     {expandedSection === 'Mindfulness' && (
//                         <div className='expanded-content'>
//                             <p>Here is the expanded content for today's Moments...</p>
//                         </div>
//                     )}
//                     <div className='input-texts pt-2 d-flex mb-3'>
//                         <div className='input-content'>
//                             <img src={Accept} alt='downarrow' width={20} height={20} />
//                             <p className='reflection pt-2 px-3'>Journaling</p>
//                         </div>
//                         <div className='pe-3' onClick={handleModalOpen}>
//                             <button
//                                 className='plus-button'
//                                 style={{
//                                     backgroundColor: expandedSection === 'Journaling' ? '#fff' : '#678561',
//                                     color: expandedSection === 'Journaling' ? '#678561' : '#fff'
//                                 }}
//                                 onClick={() => toggleExpand('Journaling')}
//                             >
//                                 {expandedSection === 'Journaling' ? '-' : '+'}
//                             </button>
//                         </div>
//                     </div>
//                     {expandedSection === 'Journaling' && (
//                         <div className='expanded-content'>
//                             <p>Here is the expanded content for today's Journaling...</p>
//                         </div>
//                     )}
//                 </div>
//             </div>
//             <div className='prompt-card mb-4'>
//                 <div className='today-section'>
//                     <div className='d-flex'>
//                         <div className='reflection'>
//                             <p className='text-start discovery px-3'>Moving Forward</p>
//                         </div>
//                     </div>
//                     <div className='input-texts pt-2 d-flex mb-3'>
//                         <div className='input-content'>
//                             <img src={Down} alt='downarrow' width={20} height={20} />
//                             <p className='reflection pt-2 px-3'>Letting Go</p>
//                         </div>
//                         <div className='pe-3' onClick={handleModalOpen}>
//                             <button
//                                 className='plus-button'
//                                 style={{
//                                     backgroundColor: expandedSection === 'Letting' ? '#fff' : '#678561',
//                                     color: expandedSection === 'Letting' ? '#678561' : '#fff'
//                                 }}
//                                 onClick={() => toggleExpand('Letting')}
//                             >
//                                 {expandedSection === 'Letting' ? '-' : '+'}
//                             </button>
//                         </div>
//                     </div>
//                     {expandedSection === 'Letting' && (
//                         <div className='expanded-content'>
//                             <p>Here is the expanded content for today'sLetting Go...</p>
//                         </div>
//                     )}
//                     <div className='input-texts pt-2 d-flex mb-3'>
//                         <div className='input-content'>
//                             <img src={Accept} alt='downarrow' width={20} height={20} />
//                             <p className='reflection pt-2 px-3'>Fear Facing</p>
//                         </div>
//                         <div className='pe-3' onClick={handleModalOpen}>
//                             <button
//                                 className='plus-button'
//                                 style={{
//                                     backgroundColor: expandedSection === 'Facing' ? '#fff' : '#678561',
//                                     color: expandedSection === 'Facing' ? '#678561' : '#fff'
//                                 }}
//                                 onClick={() => toggleExpand('Facing')}
//                             >
//                                 {expandedSection === 'Facing' ? '-' : '+'}
//                             </button>
//                         </div>
//                     </div>
//                     {expandedSection === 'Facing' && (
//                         <div className='expanded-content'>
//                             <p>Here is the expanded content for today's Fear Facing...</p>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default WeeklyPrompt


import React, { useState } from 'react';
import Daily from "../../assets/images/daily-prompt.svg";
import Accept from "../../assets/images/accept.svg";
import Regenrate from "../../assets/images/regenrate.svg";
import Shadow from "../../assets/images/accpet-2.svg";
import Down from "../../assets/images/downarrow.svg";

const WeeklyPrompt = ({ handleModalOpen }) => {

    const [expandedSection, setExpandedSection] = useState(null);
    const toggleExpand = (section) => {
        setExpandedSection(prevSection => prevSection === section ? null : section);
    };

    return (
        <div>
            <div className='d-flex pt-3'>
                <div className='sparkle-img'>
                    <img src={Daily} alt='Daily' />
                </div>
                <div className='text-start px-3'>
                    <p className='prompt-content mb-1'>WEEKLY PROMPTS</p>
                    <p className='prompts-text mb-1'>
                        Prompts to follow weekly
                    </p>
                </div>
            </div>
            <div className='prompt-card mb-4 pt-4'>
                <div className='today-section'>
                    <div className='d-flex'>
                        <div className='reflection'>
                            <p className='text-start discovery px-3'>Self-Discovery</p>
                        </div>
                    </div>
                    <div className='input-texts pt-2 d-flex mb-3'>
                        <div className='input-content'>
                            <img src={Regenrate} alt='downarrow' width={20} height={20} />
                            <p className='reflection pt-2 px-3'>Personal Growth</p>
                        </div>
                        <div className='pe-3' onClick={handleModalOpen}>
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
                        <div className='input-content'>
                            <img src={Shadow} alt='downarrow' width={20} height={20} />
                            <p className='reflection pt-2 px-3'>Shadow Work</p>
                        </div>
                        <div className='pe-3' onClick={handleModalOpen}>
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
                        <div className='input-content'>
                            <img src={Accept} alt='accept' width={15} height={15} />
                            <p className='reflection pt-2 px-3'>Future Self</p>
                        </div>
                        <div className='pe-3' onClick={handleModalOpen}>
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
                        <div className='pe-3' onClick={handleModalOpen}>
                            <button
                                className='plus-button'
                                style={{
                                    backgroundColor: expandedSection === 'Mindfulness' ? '#fff' : '#678561',
                                    color: expandedSection === 'Mindfulness' ? '#678561' : '#fff'
                                }}
                                onClick={() => toggleExpand('Mindfulness')}
                            >
                                {expandedSection === 'Mindfulness' ? '-' : '+'}
                            </button>
                        </div>
                    </div>

                    <div className='input-texts pt-2 d-flex mb-3'>
                        <div className='input-content'>
                            <img src={Accept} alt='downarrow' width={20} height={20} />
                            <p className='reflection pt-2 px-3'>Journaling</p>
                        </div>
                        <div className='pe-3' onClick={handleModalOpen}>
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
                <div className='today-section'>
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
                        <div className='pe-3' onClick={handleModalOpen}>
                            <button
                                className='plus-button'
                                style={{
                                    backgroundColor: expandedSection === 'Letting' ? '#fff' : '#678561',
                                    color: expandedSection === 'Letting' ? '#678561' : '#fff'
                                }}
                                onClick={() => toggleExpand('Letting')}
                            >
                                {expandedSection === 'Letting' ? '-' : '+'}
                            </button>
                        </div>
                    </div>

                    <div className='input-texts pt-2 d-flex mb-3'>
                        <div className='input-content'>
                            <img src={Accept} alt='downarrow' width={20} height={20} />
                            <p className='reflection pt-2 px-3'>Fear Facing</p>
                        </div>
                        <div className='pe-3' onClick={handleModalOpen}>
                            <button
                                className='plus-button'
                                style={{
                                    backgroundColor: expandedSection === 'Facing' ? '#fff' : '#678561',
                                    color: expandedSection === 'Facing' ? '#678561' : '#fff'
                                }}
                                onClick={() => toggleExpand('Facing')}
                            >
                                {expandedSection === 'Facing' ? '-' : '+'}
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default WeeklyPrompt