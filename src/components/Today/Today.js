import React, { useState, useEffect } from 'react';
import "./Today.css";
import Login from '../Login/Login';
import { useNavigate, useLocation } from 'react-router-dom';
import Polly from "../../assets/images/polly.svg";
import Plus from "../../assets/images/button.svg";
import Arrow from "../../assets/images/arrow.svg";
import PromptSection from '../Prompts/PromptSection';
import { Modal } from 'react-bootstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import apiService from '../../services/apiService';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const Today = () => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const [reflectionContent, setReflectionContent] = useState('');
    const [mindfulnessContent, setMindfulnessContent] = useState('');
    const [gratitudeContent, setGratitudeContent] = useState('');
    const [showPrompts, setShowPrompts] = useState(false);
    const [dailyPrompt, setDailyPrompt] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const [reflectionError, setReflectionError] = useState(false);
    const [mindfulnessError, setMindfulnessError] = useState(false);
    const [gratitudeError, setGratitudeError] = useState(false);

    const [currentDate, setCurrentDate] = useState(
        location.state?.selectedDate ? new Date(location.state.selectedDate) : new Date()
    );

    const handleEditorChange = (section, value) => {
        if (section === 'reflection') {
            setReflectionContent(value);
            if (value) setReflectionError(false);
        } else if (section === 'mindfulness') {
            setMindfulnessContent(value);
            if (value) setMindfulnessError(false);
        } else if (section === 'gratitude') {
            setGratitudeContent(value);
            if (value) setGratitudeError(false);
        }
    };

    const fetchEntryForDate = async (date) => {
    try {
        const entry = await apiService.getJournalEntryByDate(date.toISOString());
        if (entry) {
            setReflectionContent(entry.reflection || '');
            setMindfulnessContent(entry.mindfulness || '');
            setGratitudeContent(entry.gratitude || '');
        } else {
            // If no entry for this date, clear the fields
            setReflectionContent('');
            setMindfulnessContent('');
            setGratitudeContent('');
        }
    } catch (error) {
        console.error('Error fetching journal entry:', error);
        // Clear fields if there's an error
        setReflectionContent('');
        setMindfulnessContent('');
        setGratitudeContent('');
    }
};

    const handleClosePrompts = () => setShowPrompts(false);
    const handleShowPrompts = () => setShowPrompts(true);

    const handleLogout = () => {
      localStorage.removeItem("token");
      setToken(null);
      navigate("/login");
    };

    const changeDate = (direction) => {
        setCurrentDate(prevDate => {
            const newDate = new Date(prevDate);
            if (direction === 'next') {
                newDate.setDate(newDate.getDate() + 1);
            } else if (direction === 'prev') {
                newDate.setDate(newDate.getDate() - 1);
            }
            fetchEntryForDate(newDate);
            return newDate;
        });
    };

    useEffect(() => {
        localStorage.setItem('formattedDate', currentDate.toDateString());
    }, [currentDate]);

    useEffect(() => {
        if (process.env.NODE_ENV === 'development') {
            setIsAuthenticated(true);
        } else if (token) {
            apiService.verifyToken(token)
                .then(() => {
                    setIsAuthenticated(true);
                })
                .catch(() => {
                    localStorage.removeItem('token');
                    setToken(null);
                    setIsAuthenticated(false);
                    navigate('/login');
                });
        } else {
            setIsAuthenticated(false);
            navigate('/login');
        }
    }, [token, navigate]);

    if (!isAuthenticated && process.env.NODE_ENV !== 'development') {
        return <Login setToken={setToken} />;
    }

    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const formattedDate = `${dayNames[currentDate.getDay()]} ${currentDate.getDate()} ${monthNames[currentDate.getMonth()]}`;

    const handleSave = async ()  => {
        let isValid = true;
        if (!reflectionContent) {
            setReflectionError(true);
            isValid = false;
        }
        if (!mindfulnessContent) {
            setMindfulnessError(true);
            isValid = false;
        }
        if (!gratitudeContent) {
            setGratitudeError(true);
            isValid = false;
        }

        if (isValid) {
            try {
                const journalEntry = {
                    date: currentDate.toISOString(),
                    reflection: reflectionContent,
                    mindfulness: mindfulnessContent,
                    gratitude: gratitudeContent
                };

                const savedEntry = await apiService.createJournalEntry(journalEntry);
                console.log('Journal entry saved:', savedEntry);
                
                await fetchEntryForDate(currentDate);
               

            } catch (error) {
                console.error('Error saving journal entry:', error);
            }
        }
    };

    return (
        <div>
            <div id="dashboard">
                <div className='container'>
                    <div className='row mt-4 mb-3'>
                        <div className='col-md-12'>
                            <div className='d-flex justify-content-between align-items-center'>
                                <div className='d-flex align-items-center'>
                                    <div className='d-block'>
                                        <div className='heading-content d-flex align-items-center gap-3'>
                                            <FaArrowLeft className='date-nav-icon' onClick={() => changeDate('prev')} />
                                            <h1>{formattedDate}</h1>
                                            <FaArrowRight className='date-nav-icon' onClick={() => changeDate('next')} />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <button onClick={handleLogout} className="btn btn-outline-primary">Logout</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='s-section decor-img'>
                        <div className='row mt-4'>
                            <div className='col-md-12 d-flex justify-content-between'>
                                <div className='d-flex gap-3'>
                                    <div className='sparkle-img'>
                                        <img src={Polly} alt='sparkle' />
                                    </div>
                                    <div className='text-start'>
                                        <p className='prompt-content mb-1'>TODAY'S PROMPT</p>
                                        {isLoading && <p>Loading prompt...</p>}
                                        {error && <p className="error-message">{error}</p>}
                                        {dailyPrompt && <p className='prompts-text mb-1'>{dailyPrompt}</p>}
                                    </div>
                                </div>
                                <div className='text-end' onClick={handleShowPrompts}>
                                    <img src={Plus} alt='plus' width={35} height={35} />
                                </div>
                            </div>
                        </div>
                        <div className='row mt-3'>
                            <div className='col-md-12 d-flex justify-content-between gap-3'>
                                <div className='today-section'>
                                    <div className='d-flex'>
                                        <div className='arrow-img'>
                                            <img src={Arrow} alt='Arrow' />
                                        </div>
                                        <div className='reflection'>
                                            <p>Prompt1</p>
                                        </div>
                                    </div>
                                    <ReactQuill
                                        value={reflectionContent}
                                        onChange={(value) => handleEditorChange('reflection', value)}
                                        placeholder="For 30day Challenge: Follow the prompt1 from the email..."
                                        theme="snow"
                                        modules={{
                                            toolbar: [
                                                [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                                                [{ size: [] }],
                                                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                                                [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
                                                ['link', 'image', 'video'],
                                                ['clean']
                                            ],
                                        }}
                                    />
                                    {reflectionError && <p className='error-message text-start pt-2 text-danger'>Reflection is required.</p>}
                                </div>
                            </div>
                            <div className='row mt-3'>
                                <div className='col-md-12 d-flex justify-content-between gap-3'>
                                    <div className='today-section'>
                                        <div className='d-flex'>
                                            <div className='arrow-img'>
                                                <img src={Arrow} alt='Arrow' />
                                            </div>
                                            <div className='mindfulness'>
                                                <p>Prompt2</p>
                                            </div>
                                        </div>
                                        <ReactQuill
                                            value={mindfulnessContent}
                                            onChange={(value) => handleEditorChange('mindfulness', value)}
                                            placeholder="For 30day Challenge: Follow the prompt2 from the email..."
                                            theme="snow"
                                            modules={{
                                                toolbar: [
                                                    [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                                                    [{ size: [] }],
                                                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                                                    [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
                                                    ['link', 'image', 'video'],
                                                    ['clean']
                                                ],
                                            }}
                                        />
                                        {mindfulnessError && <p className='error-message text-start pt-2 text-danger'>Mindfulness is required.</p>}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='row mt-3'>
                            <div className='col-md-12'>
                                <div className='today-section'>
                                    <div className='d-flex'>
                                        <div className='arrow-img'>
                                            <img src={Arrow} alt='Arrow' />
                                        </div>
                                        <div className='gratitude'>
                                            <p>Dream Log</p>
                                        </div>
                                    </div>
                                    <ReactQuill
                                        value={gratitudeContent}
                                        onChange={(value) => handleEditorChange('gratitude', value)}
                                        placeholder="Write about your dreams..."
                                        theme="snow"
                                        modules={{
                                            toolbar: [
                                                [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                                                [{ size: [] }],
                                                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                                                [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
                                                ['link', 'image', 'video'],
                                                ['clean']
                                            ],
                                        }}
                                    />
                                    {gratitudeError && <p className='error-message text-start pt-2 text-danger'>Gratitude is required.</p>}
                                </div>
                            </div>
                        </div>
                        <div className='row mt-3'>
                            <div className='col-md-12 text-center'>
                                <button onClick={handleSave} className="btn btn-primary save-reflection-data">Save</button>
                            </div>
                        </div>
                    </div>
                </div>
                <Modal show={showPrompts} onHide={handleClosePrompts}>
                    <Modal.Header closeButton>
                        <Modal.Title>Select Prompt</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <PromptSection />
                    </Modal.Body>
                    <Modal.Footer>
                        <button variant="secondary" onClick={handleClosePrompts}>
                            Close
                        </button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
};

export default Today;
