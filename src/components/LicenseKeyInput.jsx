import React, { useState } from 'react';
import { Button, Form, Alert, Spinner } from 'react-bootstrap';
import { ProFeatureService } from '../services/ProFeatureService';

const LicenseKeyInput = ({ onLicenseActivated }) => {
    const [licenseKey, setLicenseKey] = useState('');
    const [isValidating, setIsValidating] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
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
                onLicenseActivated(licenseKey); // Just pass the license key
            } else {
                setError(result.error || 'Invalid license key');
            }
        } catch (err) {
            setError('Failed to validate license key');
        } finally {
            setIsValidating(false);
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <div className="d-flex gap-2 align-items-end">
                <Form.Group className="flex-grow-1">
                    <Form.Control
                        type="text"
                        placeholder="KSGN-XXXX-XXXX-XXXX"
                        value={licenseKey}
                        onChange={(e) => setLicenseKey(e.target.value.toUpperCase())}
                        disabled={isValidating}
                        style={{
                            background: '#222222',
                            border: '1px solid #555555',
                            color: '#ffffff',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            fontFamily: 'Monaco, Menlo, monospace'
                        }}
                    />
                </Form.Group>
                <Button 
                    type="submit" 
                    disabled={isValidating || !licenseKey.trim()}
                    variant="outline-primary"
                >
                    {isValidating ? (
                        <Spinner animation="border" size="sm" />
                    ) : (
                        'Activate'
                    )}
                </Button>
            </div>
            
            {error && (
                <Alert variant="danger" className="mt-2 mb-0 small">
                    {error}
                </Alert>
            )}
        </Form>
    );
};

export default LicenseKeyInput; 