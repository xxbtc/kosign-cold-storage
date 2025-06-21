import React from 'react';
import { Card, Form, InputGroup, Button } from 'react-bootstrap';
import { FaTrash, FaEye, FaEyeSlash as FaHide } from 'react-icons/fa';

function ApiKeyEntryCard({ 
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
                    <h6 className="mb-0">API Key #{index + 1}</h6>
                    <Button 
                        variant="outline-danger" 
                        size="sm"
                        onClick={handleRemove}
                    >
                        <FaTrash />
                    </Button>
                </div>
                
                <Form.Group className="mb-2">
                    <Form.Label>Service/Platform</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="e.g., AWS, Google Cloud, GitHub"
                        value={entry.service}
                        onChange={(e) => handleFieldChange('service', e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-2">
                    <Form.Label>API Key</Form.Label>
                    <InputGroup>
                        <Form.Control
                            type={isFieldVisible('key') ? "text" : "password"}
                            placeholder="••••••••••"
                            value={entry.key}
                            onChange={(e) => handleFieldChange('key', e.target.value)}
                        />
                        <Button 
                            variant="outline-secondary"
                            onClick={() => handleToggleVisibility('key')}
                        >
                            {isFieldVisible('key') ? <FaHide /> : <FaEye />}
                        </Button>
                    </InputGroup>
                </Form.Group>

                <Form.Group className="mb-2">
                    <Form.Label>Secret/Token (optional)</Form.Label>
                    <InputGroup>
                        <Form.Control
                            type={isFieldVisible('secret') ? "text" : "password"}
                            placeholder="••••••••••"
                            value={entry.secret}
                            onChange={(e) => handleFieldChange('secret', e.target.value)}
                        />
                        <Button 
                            variant="outline-secondary"
                            onClick={() => handleToggleVisibility('secret')}
                        >
                            {isFieldVisible('secret') ? <FaHide /> : <FaEye />}
                        </Button>
                    </InputGroup>
                </Form.Group>

                <Form.Group className="mb-0">
                    <Form.Label>Context Notes</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={2}
                        placeholder="Permissions, usage, expiration info, etc..."
                        value={entry.notes}
                        onChange={(e) => handleFieldChange('notes', e.target.value)}
                    />
                </Form.Group>
            </Card.Body>
        </Card>
    );
}

export default ApiKeyEntryCard; 