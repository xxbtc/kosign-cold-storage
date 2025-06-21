import React from 'react';
import { Card, Form, InputGroup, Button } from 'react-bootstrap';
import { FaTrash, FaEye, FaEyeSlash as FaHide } from 'react-icons/fa';

function CustomEntryCard({ 
    entry, 
    index, 
    onUpdate, 
    onRemove, 
    isFieldVisible, 
    onToggleVisibility 
}) {
    const handleFieldChange = (field, value) => {
        onUpdate(index, field, value);
    };

    const handleRemove = () => {
        onRemove(index);
    };

    const handleToggleVisibility = (field) => {
        onToggleVisibility(field);
    };

    return (
        <Card className="mb-3 entry-card">
            <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-2">
                    <h6 className="mb-0">Custom Entry #{index + 1}</h6>
                    <Button 
                        variant="outline-danger" 
                        size="sm"
                        onClick={handleRemove}
                    >
                        <FaTrash />
                    </Button>
                </div>
                
                <Form.Group className="mb-2">
                    <Form.Label>Label</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="e.g., SSH Key, License Key, etc."
                        value={entry.label}
                        onChange={(e) => handleFieldChange('label', e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-2">
                    <Form.Label>Value</Form.Label>
                    <InputGroup>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            type={isFieldVisible('value') ? "text" : "password"}
                            placeholder="Your sensitive data..."
                            value={entry.value}
                            onChange={(e) => handleFieldChange('value', e.target.value)}
                        />
                        <Button 
                            variant="outline-secondary"
                            onClick={() => handleToggleVisibility('value')}
                        >
                            {isFieldVisible('value') ? <FaHide /> : <FaEye />}
                        </Button>
                    </InputGroup>
                </Form.Group>

                <Form.Group className="mb-0">
                    <Form.Label>Context Notes</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={2}
                        placeholder="What this is for, how to use it, etc..."
                        value={entry.notes}
                        onChange={(e) => handleFieldChange('notes', e.target.value)}
                    />
                </Form.Group>
            </Card.Body>
        </Card>
    );
}

export default CustomEntryCard; 