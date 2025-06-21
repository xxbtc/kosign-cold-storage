import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';

function DataSection({ 
    title, 
    icon: Icon, 
    count, 
    onAdd, 
    addButtonText, 
    emptyMessage, 
    children 
}) {
    return (
        <Card className="mb-4 section-card">
            <Card.Header className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                    <Icon className="me-2" />
                    <h5 className="mb-0">{title}</h5>
                    <span className="badge bg-secondary ms-2">{count}</span>
                </div>
                <Button 
                    variant="primary" 
                    size="sm"
                    onClick={onAdd}
                >
                    <FaPlus className="me-1" /> {addButtonText}
                </Button>
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