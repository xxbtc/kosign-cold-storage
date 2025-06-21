import React from 'react';
import { Card, Form, InputGroup, Button, Collapse } from 'react-bootstrap';
import { FaTrash, FaEye, FaEyeSlash as FaHide, FaChevronDown, FaChevronUp, FaExclamationTriangle, FaCheck } from 'react-icons/fa';

function CustomEntryCard({ 
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
        const label = entry.label || 'Untitled Entry';
        const hasValue = !!entry.value;
        
        return { label, hasValue };
    }, [entry.label, entry.value]);

    // Check for validation issues (reactive to entry changes)
    const hasValidationIssues = React.useMemo(() => {
        return !entry.label || !entry.value;
    }, [entry.label, entry.value]);

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
                                    {summaryInfo.label}
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
                                    {summaryInfo.hasValue ? 'Value set' : 'No value'}
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
                    </div>
                </Collapse>
            </Card.Body>
        </Card>
    );
}

export default CustomEntryCard; 