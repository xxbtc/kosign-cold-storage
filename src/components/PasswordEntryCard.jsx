import React from 'react';
import { Card, Form, InputGroup, Button } from 'react-bootstrap';
import { FaTrash, FaEye, FaEyeSlash as FaHide } from 'react-icons/fa';

function PasswordEntryCard({ 
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
                    <h6 className="mb-0">Login #{index + 1}</h6>
                    <Button 
                        variant="outline-danger" 
                        size="sm"
                        onClick={handleRemove}
                    >
                        <FaTrash />
                    </Button>
                </div>
                
                <Form.Group className="mb-2">
                    <Form.Label>Service/Website</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="e.g., Gmail, Bank of America"
                        value={entry.service}
                        onChange={(e) => handleFieldChange('service', e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-2">
                    <Form.Label>Username/Email</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="your@email.com"
                        value={entry.username}
                        onChange={(e) => handleFieldChange('username', e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-2">
                    <Form.Label>Password</Form.Label>
                    <InputGroup>
                        <Form.Control
                            type={isFieldVisible('password') ? "text" : "password"}
                            placeholder="••••••••••"
                            value={entry.password}
                            onChange={(e) => handleFieldChange('password', e.target.value)}
                        />
                        <Button 
                            variant="outline-secondary"
                            onClick={() => handleToggleVisibility('password')}
                        >
                            {isFieldVisible('password') ? <FaHide /> : <FaEye />}
                        </Button>
                    </InputGroup>
                </Form.Group>

                <Form.Group className="mb-2">
                    <Form.Label>Website URL (optional)</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="https://example.com"
                        value={entry.url}
                        onChange={(e) => handleFieldChange('url', e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-0">
                    <Form.Label>Context Notes</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={2}
                        placeholder="Any additional context"
                        value={entry.notes}
                        onChange={(e) => handleFieldChange('notes', e.target.value)}
                    />
                </Form.Group>
            </Card.Body>
        </Card>
    );
}

export default PasswordEntryCard; 