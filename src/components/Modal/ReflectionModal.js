import React, { useState, useEffect } from 'react';
import { Button, Modal } from "react-bootstrap";
import DownArrow from "../../assets/images/arrow-down.svg";
import Tick from "../../assets/images/tick.svg";
import Delete from "../../assets/images/trash.svg";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import "./Modal.css";
import apiService from '../../services/apiService';

const ReflectionModal = ({ show, handleClose, sectionTitle }) => {
    const [editorContent, setEditorContent] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [entries, setEntries] = useState([]);

    useEffect(() => {
        if (show) {
            fetchEntries();
            setEditorContent('');
            setError(null);
        }
    }, [show]);

    useEffect(() => {
        console.log('handleSave called');
        console.log('Error state:', error);
      }, [error]);

    const handleEditorChange = (value) => {
        setEditorContent(value);
    };

    const handleSave = async () => {
        console.log('handleSave called');

        if (!editorContent.trim()) {
            setError('Cannot save empty entry. Please add some content.');
            return;
        }

        setIsLoading(true);
        setError(null);
        try {
            console.log('Attempting to save journal entry:', { content: editorContent, sectionTitle: sectionTitle });
            const response = await apiService.createJournalEntry({
                content: editorContent,
                sectionTitle: sectionTitle
            });
            console.log('Save response:', response);
            fetchEntries();  // Refresh entries after save
            handleClose();
        } catch (error) {
            console.error('Error saving journal entry:', error);
            if (error.response) {
                console.error('Server error:', error.response.data);
                setError(`Server error: ${error.response.data.message || 'Unknown error'}`);
            } else if (error.request) {
                console.error('Network error:', error.request);
                setError('Network error. Please check your connection and try again.');
            } else {
                console.error('Unexpected error:', error.message);
                setError('An unexpected error occurred. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const fetchEntries = async () => {
        try {
            const response = await apiService.getPreviousJournalEntry();
            setEntries(response);
        } catch (error) {
            console.error('Error fetching journal entries:', error);
            setError('Failed to fetch entries. Please try again.');
        }
    };

    const handleCancel = () => {
        try {
            handleClose();
        } catch (error) {
            console.error('Error cancelling:', error);
            setError('Failed to cancel: An unexpected error occurred.');
        }
    };

    const handleDelete = () => {
        try {
            localStorage.removeItem(sectionTitle);
            handleClose();
        } catch (error) {
            console.error('Error deleting entry:', error);
            setError('Failed to delete entry: An unexpected error occurred.');
        }
    };

    return (
        <Modal show={show} onHide={handleCancel} size="lg" backdrop="static" centered>
            <Modal.Header closeButton>
                <Modal.Title>
                    <img src={DownArrow} alt='DownArrow' width={30} height={30} />
                    <span>{sectionTitle}</span>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ReactQuill
                    value={editorContent}
                    onChange={handleEditorChange}
                    placeholder="Today my day was ..."
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
                {error && <p className="text-danger mt-2">{error}</p>}
                <div className="entries-list">
                    {Array.isArray(entries) && entries.length > 0 ? (
                        entries.map((entry, index) => (
                            <div key={index} className="entry">
                                <h5>{entry.sectionTitle}</h5>
                                <div dangerouslySetInnerHTML={{ __html: entry.content }} />
                            </div>
                        ))
                    ) : (
                        <p>No entries found.</p>
                    )}
                </div>
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-between">
                <div className='delete' onClick={handleDelete}>
                    <img src={Delete} alt='delete' width={25} height={25} />
                </div>
                <div className='d-flex gap-3'>
                    <Button variant="secondary" className='cancel-btn' onClick={handleCancel}>
                        Cancel
                    </Button>
                    <Button variant="primary" className='save-btn' onClick={handleSave} disabled={isLoading}>
                        {isLoading ? 'Saving...' : 'Save'} <img src={Tick} alt='tick' width={25} height={25} />
                    </Button>
                </div>
            </Modal.Footer>
        </Modal>
    );
};

export default ReflectionModal;
