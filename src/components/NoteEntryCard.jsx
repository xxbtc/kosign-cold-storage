import React from 'react';
import { Card, Form, Button, Collapse } from 'react-bootstrap';
import { FaTrash, FaChevronDown, FaChevronUp, FaExclamationTriangle, FaCheck } from 'react-icons/fa';

function NoteEntryCard({ 
    entry, 
    index, 
    onUpdate, 
    onRemove,
    isExpanded = false,
    onToggleExpanded
}) {
    const handleFieldChange = (field, value) => {
        onUpdate(index, field, value);
    };

    const handleRemove = () => {
        onRemove(index);
    };

    // Get summary info for collapsed state (reactive to entry changes)
    const summaryInfo = React.useMemo(() => {
        const title = entry.title || 'Untitled Note';
        const hasContent = !!entry.content;
        
        return { title, hasContent };
    }, [entry.title, entry.content]);

    // Check for validation issues (reactive to entry changes)
    const hasValidationIssues = React.useMemo(() => {
        return !entry.title || !entry.content;
    }, [entry.title, entry.content]);

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
                                    {summaryInfo.title}
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
                                    {summaryInfo.hasContent ? 'Content added' : 'No content'}
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
                    </div>
                </Collapse>
            </Card.Body>
        </Card>
    );
}

export default NoteEntryCard; 