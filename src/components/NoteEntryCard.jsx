import React from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';

function NoteEntryCard({ 
    entry, 
    index, 
    onUpdate, 
    onRemove 
}) {
    const handleFieldChange = (field, value) => {
        onUpdate(index, field, value);
    };

    const handleRemove = () => {
        onRemove(index);
    };

    return (
        <Card className="mb-3 entry-card">
            <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-2">
                    <h6 className="mb-0">Note #{index + 1}</h6>
                    <Button 
                        variant="outline-danger" 
                        size="sm"
                        onClick={handleRemove}
                    >
                        <FaTrash />
                    </Button>
                </div>
                
                <Form.Group className="mb-2">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Note title"
                        value={entry.title}
                        onChange={(e) => handleFieldChange('title', e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-2">
                    <Form.Label>Content</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={4}
                        placeholder="Your secure note content..."
                        value={entry.content}
                        onChange={(e) => handleFieldChange('content', e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-0">
                    <Form.Label>Context Notes</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={2}
                        placeholder="Why this note is important, when to use it, etc..."
                        value={entry.notes}
                        onChange={(e) => handleFieldChange('notes', e.target.value)}
                    />
                </Form.Group>
            </Card.Body>
        </Card>
    );
}

export default NoteEntryCard; 