import React, { useState } from 'react';
import { Badge, Button, Collapse, Form, Alert, Spinner } from 'react-bootstrap';
import { ProFeatureService } from '../services/ProFeatureService';

const ProStatusIndicator = ({ onUpgradeClick, onLicenseActivated }) => {
    const isProUser = ProFeatureService.isProUser();
    const limits = ProFeatureService.getCurrentLimits();
    
    const [showLicenseInput, setShowLicenseInput] = useState(false);
    const [licenseKey, setLicenseKey] = useState('');
    const [isValidating, setIsValidating] = useState(false);
    const [error, setError] = useState('');

    const handleLicenseSubmit = async (e) => {
        e.preventDefault();
        
        if (!licenseKey.trim()) {
            setError('Please enter your license key');
            return;
        }

        setIsValidating(true);
        setError('');

        try {
            const result = await ProFeatureService.activateLicense(licenseKey.trim());
            
            if (result.success) {
                onLicenseActivated(result.features);
                setShowLicenseInput(false);
                setLicenseKey('');
            } else {
                setError(result.error);
            }
        } catch (err) {
            setError('Failed to validate license key');
        } finally {
            setIsValidating(false);
        }
    };

    if (isProUser) {
        return (
            <div className="pro-status-indicator">
                <div className="d-flex align-items-center p-3 pro-status-pro">
                    <Badge bg="success" className="me-2">
                        ✨ PRO
                    </Badge>
                    <small className="pro-status-muted-text">
                        Up to {limits.maxShares} shares • {limits.maxStorage.toLocaleString()} chars
                    </small>
                </div>
            </div>
        );
    }

    return (
        <div className="pro-status-indicator">
            <div className="d-flex align-items-center justify-content-between p-3 pro-status-free">
                <div>
                    <Badge bg="secondary" className="me-2">FREE</Badge>
                    <small className="pro-status-muted-text">
                        {limits.maxShares} shares • {limits.maxStorage} chars
                    </small>
                </div>
                <div>
                    <Button 
                        size="sm" 
                        onClick={onUpgradeClick}
                        className="me-2 pro-upgrade-btn"
                    >
                        Need more keys? ($5 each)
                    </Button>
                    <Button 
                        variant="link" 
                        size="sm" 
                        onClick={() => setShowLicenseInput(!showLicenseInput)}
                        className="p-0 text-decoration-none license-link-btn"
                    >
                        Have a license key?
                    </Button>
                </div>
            </div>

            <Collapse in={showLicenseInput}>
                <div className="mt-3 p-3 license-input-container">
                    <Form onSubmit={handleLicenseSubmit}>
                        <div className="d-flex gap-2 align-items-end">
                            <Form.Group className="flex-grow-1">
                                <Form.Label className="small fw-bold license-key-label">
                                    License Key
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="KSGN-XXXX-XXXX-XXXX"
                                    value={licenseKey}
                                    onChange={(e) => setLicenseKey(e.target.value.toUpperCase())}
                                    disabled={isValidating}
                                    className="license-key-input"
                                />
                            </Form.Group>
                            <Button 
                                type="submit" 
                                disabled={isValidating || !licenseKey.trim()}
                                className="pro-upgrade-btn"
                            >
                                {isValidating ? (
                                    <Spinner animation="border" size="sm" />
                                ) : (
                                    'Activate'
                                )}
                            </Button>
                        </div>
                        
                        {error && (
                            <Alert className="mt-2 mb-0 small license-error-alert">
                                {error}
                            </Alert>
                        )}
                    </Form>
                </div>
            </Collapse>
        </div>
    );
};

export default ProStatusIndicator; 