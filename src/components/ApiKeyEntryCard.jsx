import React from 'react';
import { Card, Form, InputGroup, Button, Collapse } from 'react-bootstrap';
import { FaTrash, FaEye, FaEyeSlash as FaHide, FaChevronDown, FaChevronUp, FaExclamationTriangle, FaCheck } from 'react-icons/fa';

function ApiKeyEntryCard({ 
    entry, 
    index, 
    onUpdate, 
    onRemove, 
    isFieldVisible, 
    onToggleVisibility,
    isExpanded = false,
    onToggleExpanded
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

    // Get summary info for collapsed state (reactive to entry changes)
    const summaryInfo = React.useMemo(() => {
        const service = entry.service || 'Untitled API Key';
        const hasKey = !!entry.key;
        const hasSecret = !!entry.secret;
        
        return { service, hasKey, hasSecret };
    }, [entry.service, entry.key, entry.secret]);

    // Check for validation issues (reactive to entry changes)
    const hasValidationIssues = React.useMemo(() => {
        return !entry.service || !entry.key;
    }, [entry.service, entry.key]);

    return (
        <Card className="mb-3 entry-card">
            <Card.Body>
                {/* Accordion Header */}
                <div 
                    className="d-flex justify-content-between align-items-center accordion-header"
                    style={{ cursor: 'pointer' }}
                    onClick={() => onToggleExpanded && onToggleExpanded(index)}
                >
                    <div className="d-flex align-items-center flex-grow-1">
                        <div className="me-2">
                            {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
                        </div>
                        <div className="flex-grow-1">
                            <div className="d-flex align-items-center">
                                <h6 className="mb-0 me-2">
                                    {summaryInfo.service}
                                </h6>
                                {hasValidationIssues && (
                                    <FaExclamationTriangle className="text-warning me-2" size={14} />
                                )}
                                {!hasValidationIssues && (
                                    <FaCheck className="text-success me-2" size={14} />
                                )}
                            </div>
                            {!isExpanded && (
                                <small className="text-muted">
                                    {summaryInfo.hasKey ? 'API key set' : 'No API key'}
                                    {summaryInfo.hasSecret && ' • Secret set'}
                                </small>
                            )}
                        </div>
                    </div>
                    <Button 
                        variant="outline-danger" 
                        size="sm"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleRemove();
                        }}
                    >
                        <FaTrash />
                    </Button>
                </div>

                {/* Accordion Content */}
                <Collapse in={isExpanded}>
                    <div className="mt-3">
                
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
                    </div>
                </Collapse>
            </Card.Body>
        </Card>
    );
}

export default ApiKeyEntryCard; 