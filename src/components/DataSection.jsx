import React from 'react';
import { Card, Button, ButtonGroup, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FaPlus, FaExpandArrowsAlt, FaCompressArrowsAlt, FaExclamationTriangle } from 'react-icons/fa';

function DataSection({ 
    title, 
    icon: Icon, 
    count, 
    onAdd, 
    addButtonText, 
    emptyMessage, 
    children,
    onExpandAll,
    onCollapseAll,
    isAdding,
    onStartAdding,
    onCancelAdding,
    // New props for character management
    sectionCharacterUsage = 0,
    canAddNewEntry = true,
    estimatedNewEntrySize = 0,
    isNearLimit = false
}) {
    return (
        <Card className="mb-4 section-card">
            <Card.Header className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                    <Icon className="me-2" />
                    <h5 className="mb-0">{title}</h5>
                    <span className="badge bg-secondary ms-2">{count}</span>
                    {sectionCharacterUsage > 0 && (
                        <span className={`badge ms-2 ${isNearLimit ? 'bg-warning' : 'bg-info'}`}>
                            {sectionCharacterUsage} chars
                        </span>
                    )}
                </div>
                <div className="d-flex gap-2">
                    {count > 1 && (
                        <ButtonGroup size="sm">
                            <Button 
                                variant="outline-secondary"
                                onClick={onExpandAll}
                                title="Expand All"
                            >
                                <FaExpandArrowsAlt />
                            </Button>
                            <Button 
                                variant="outline-secondary"
                                onClick={onCollapseAll}
                                title="Collapse All"
                            >
                                <FaCompressArrowsAlt />
                            </Button>
                        </ButtonGroup>
                    )}
                    {!isAdding ? (
                        canAddNewEntry ? (
                            <Button 
                                variant="primary" 
                                size="sm"
                                onClick={onAdd}
                            >
                                <FaPlus className="me-1" /> {addButtonText}
                            </Button>
                        ) : (
                            <OverlayTrigger
                                placement="top"
                                overlay={
                                    <Tooltip>
                                        Cannot add new entry - would exceed character limit by ~{estimatedNewEntrySize} characters
                                    </Tooltip>
                                }
                            >
                                <span className="d-inline-block">
                                    <Button 
                                        variant="outline-secondary" 
                                        size="sm"
                                        disabled
                                        style={{ pointerEvents: 'none' }}
                                    >
                                        <FaExclamationTriangle className="me-1" /> Limit Reached
                                    </Button>
                                </span>
                            </OverlayTrigger>
                        )
                    ) : (
                        <ButtonGroup size="sm">
                            <Button 
                                variant="outline-secondary"
                                onClick={onCancelAdding}
                            >
                                Cancel
                            </Button>
                            <Button 
                                variant="primary"
                                onClick={onAdd}
                            >
                                <FaPlus className="me-1" /> Add
                            </Button>
                        </ButtonGroup>
                    )}
                </div>
            </Card.Header>
            <Card.Body>
                {count === 0 ? (
                    <p className="text-muted mb-0">{emptyMessage}</p>
                ) : (
                    children
                )}
            </Card.Body>
        </Card>
    );
}

export default DataSection; 