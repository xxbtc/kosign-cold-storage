import React, { useState, useEffect } from 'react';
import { Alert, Spinner, Button } from 'react-bootstrap';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { PaymentService } from '../services/PaymentService';
import { ProFeatureService } from '../services/ProFeatureService';
import '../style/payment.css';

const stripePromise = loadStripe(global.stripePubKey);

const PaymentForm = ({ onSuccess, onError, totalShareholders }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [isProcessing, setIsProcessing] = useState(false);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');

    const paymentAmount = ProFeatureService.calculateCost(totalShareholders);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsProcessing(true);
        setError('');

        try {
            // Create payment intent on backend with calculated amount
            const response = await PaymentService.setupPayment(totalShareholders, ''); // quantity=keys, coupon=empty
            
            if (!response.client_secret) {
                throw new Error('Failed to create payment intent');
            }

            const licenseKey = response.license_key;
            // Confirm payment with Stripe
            const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
                response.client_secret,
                {
                    payment_method: {
                        card: elements.getElement(CardNumberElement),
                        billing_details: {
                            name: name,
                            email: email,
                        },
                    },
                }
            );

            if (stripeError) {
                setError(stripeError.message);
                onError(stripeError.message);
            } else {
                // Confirm payment in backend
                try {
                    await PaymentService.confirmPayment(
                        response.client_secret,
                        paymentIntent.id,
                        email,
                        name
                    );
                } catch (confirmError) {
                    console.warn('Failed to confirm payment in backend:', confirmError);
                }

                onSuccess(paymentIntent, email, name, licenseKey);
            }
        } catch (err) {
            setError(err.message || 'An error occurred during payment');
            onError(err.message || 'An error occurred during payment');
        } finally {
            setIsProcessing(false);
        }
    };

    const cardElementOptions = {
        style: {
            base: {
                fontSize: '16px',
                color: '#ffffff',
                '::placeholder': {
                    color: '#888888',
                },
                fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                fontSmoothing: 'antialiased',
            },
            invalid: {
                color: '#f44336',
            },
            complete: {
                color: '#ffffff',
            },
            empty: {
                color: '#ffffff',
            },
        },
        disableLink: true,
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
                <label className="form-label">Email Address</label>
                <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="your@email.com"
                />
                <small className="form-text text-muted">
                    We'll send your license key to this email
                </small>
            </div>

            <div className="form-group mb-3">
                <label className="form-label">Full Name</label>
                <input
                    type="text"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="John Doe"
                />
            </div>

            <div className="form-group mb-4">
                                
                <div className="card-field-group mb-3">
                    <label className="form-label-small">Card Number</label>
                    <div className="stripe-element-container">
                        <CardNumberElement options={cardElementOptions} />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6">
                        <div className="card-field-group mb-3">
                            <label className="form-label-small">Expiry Date</label>
                            <div className="stripe-element-container">
                                <CardExpiryElement options={cardElementOptions} />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card-field-group mb-3">
                            <label className="form-label-small">CVC</label>
                            <div className="stripe-element-container">
                                <CardCvcElement options={cardElementOptions} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {error && (
                <Alert variant="danger" className="mb-3">
                    {error}
                </Alert>
            )}

            <button
                type="submit"
                disabled={!stripe || isProcessing}
                className="btn btn-primary btn-lg w-100 upgrade-btn"
            >
                {isProcessing ? (
                    <>
                        <Spinner animation="border" size="sm" className="me-2" />
                        Processing Payment...
                    </>
                ) : (
                    `Complete Purchase ($${paymentAmount})`
                )}
            </button>

            <div className="payment-security-note mt-3 text-center">
                <small className="text-muted">
                    🔒 Secured by Stripe • Your card details are never stored
                </small>
            </div>
        </form>
    );
};

const KosignPaymentStep = ({ totalShareholders, onPaymentSuccess, onLicenseActivated, onBack }) => {
    const [paymentComplete, setPaymentComplete] = useState(false);
    const [showLicenseInput, setShowLicenseInput] = useState(false);
    const [licenseKey, setLicenseKey] = useState('');
    const [licenseError, setLicenseError] = useState('');
    const [validatingLicense, setValidatingLicense] = useState(false);
    const [customerEmail, setCustomerEmail] = useState('');
    const [licenseInfo, setLicenseInfo] = useState(null);
    const [isConsumingLicense, setIsConsumingLicense] = useState(false);

    // Auto-scroll to top when payment completes
    useEffect(() => {
        if (paymentComplete && window.scrollY > 100) {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    }, [paymentComplete]);

    // Auto-scroll to top when switching to license input
    useEffect(() => {
        if (showLicenseInput && window.scrollY > 100) {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    }, [showLicenseInput]);

    const handlePaymentSuccess = (paymentIntent, email, name, licenseKey) => {
        setPaymentComplete(true);
        setLicenseKey(licenseKey);
        setCustomerEmail(email);
        
        // Just activate (validate) the license, don't consume yet
        activateLicenseOnly(licenseKey);
    };

    const handlePaymentError = (error) => {
        console.error('Payment error:', error);
        // You could add additional error handling here if needed
    };

    const activateLicenseOnly = async (licenseKey) => {
        try {
            const result = await ProFeatureService.activateLicense(licenseKey);
            if (!result.success) {
                console.error('Failed to activate license:', result.error);
            }
        } catch (error) {
            console.error('Error activating license:', error);
        }
    };

    const handleContinueToVault = async () => {
        setIsConsumingLicense(true);
        
        try {
            // Now consume the license for the requested number of keys
            const result = await ProFeatureService.consumeLicense(totalShareholders);
            if (result.success) {
                console.log('License consumed successfully for', totalShareholders, 'keys');
                onPaymentSuccess();
            } else {
                console.error('Failed to consume license:', result.error);
                // Still continue - user paid, so let them proceed
                onPaymentSuccess();
            }
        } catch (error) {
            console.error('Error consuming license:', error);
            // Still continue - user paid, so let them proceed
            onPaymentSuccess();
        } finally {
            setIsConsumingLicense(false);
        }
    };

    const handleLicenseSubmit = async () => {
        if (!licenseKey.trim()) {
            setLicenseError('Please enter a license key');
            return;
        }

        setValidatingLicense(true);
        setLicenseError('');
        setLicenseInfo(null);

        try {
            // First validate/activate the license
            const result = await ProFeatureService.activateLicense(licenseKey.trim());
            
            if (result.success) {
                const licenseMaxKeys = result.features?.max_shares || 1;
                
                if (totalShareholders > licenseMaxKeys) {
                    // Only show license info for incompatible licenses
                    setLicenseInfo({
                        maxKeys: licenseMaxKeys,
                        isCompatible: false
                    });
                    setLicenseError(
                        `This license allows ${licenseMaxKeys} key${licenseMaxKeys === 1 ? '' : 's'} but you've configured ${totalShareholders} keys. ` +
                        `Please reduce your vault to ${licenseMaxKeys} key${licenseMaxKeys === 1 ? '' : 's'} or upgrade your license.`
                    );
                    return;
                }
                
                // License is compatible - consume immediately and continue (no flash of success message)
                const consumeResult = await ProFeatureService.consumeLicense(totalShareholders);
                
                if (consumeResult.success) {
                    // License consumed successfully, go directly to security step
                    onLicenseActivated();
                } else {
                    setLicenseError('License activated but failed to consume. Please try again.');
                }
            } else {
                setLicenseError(result.error || 'Invalid license key');
            }
        } catch (error) {
            setLicenseError('Failed to validate license key');
        } finally {
            setValidatingLicense(false);
        }
    };

    const copyLicenseKey = () => {
        navigator.clipboard.writeText(licenseKey);
        // You could add a toast notification here
    };

    if (paymentComplete) {
        return (
            <div className="wizard-step-container">
                <div className="create-vault-header">
                    <h3 style={{ color: '#ffffff' }}>🎉 Payment Successful!</h3>
                    <p style={{ color: '#b0b0b0' }}>Your Kosign Pro license is ready to use.</p>
                </div>

                <div className="createSectionWrapper">
                    {/* License Key Display - Simplified */}
                    <div style={{
                        textAlign: 'center',
                        marginBottom: '2rem'
                    }}>
                        <div style={{ color: '#4caf50', marginBottom: '0.75rem', fontWeight: 'bold', fontSize: '1.1rem' }}>
                            Your License Key:
                        </div>
                        <div style={{
                            fontFamily: 'Monaco, Menlo, monospace',
                            fontSize: '1.1rem',
                            color: '#ffffff',
                            letterSpacing: '1px',
                            marginBottom: '1rem',
                            padding: '1rem',
                            background: '#1a1a1a',
                            border: '1px solid #333',
                            borderRadius: '8px'
                        }}>
                            {licenseKey}
                        </div>
                        
                        <div style={{ 
                            fontSize: '0.9rem', 
                            color: '#888888' 
                        }}>
                            📧 License key sent to: {customerEmail}
                        </div>
                    </div>

                    {/* Next Steps - Positive tone */}
                    <div style={{
                        background: 'rgba(76, 175, 80, 0.1)',
                        border: '1px solid rgba(76, 175, 80, 0.3)',
                        borderRadius: '8px',
                        padding: '1rem',
                        marginBottom: '1.5rem',
                        textAlign: 'center'
                    }}>
                        <div style={{ color: '#4caf50', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                            🚀 Ready to create your Pro vault
                        </div>
                        <div style={{ color: '#ffffff', fontSize: '0.9rem', lineHeight: '1.4' }}>
                            Continue to activate your license and create your vault
                        </div>
                    </div>

                    <div className="wizard-footer">
                        <Button 
                            variant="primary" 
                            size="lg" 
                            className="w-100"
                            onClick={handleContinueToVault}
                            disabled={isConsumingLicense}
                        >
                            {isConsumingLicense ? (
                                <>
                                    <Spinner animation="border" size="sm" className="me-2" />
                                    Activating license...
                                </>
                            ) : (
                                'Continue to Create Vault'
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    if (showLicenseInput) {
        return (
            <div className="wizard-step-container">
                <div className="create-vault-header">
                    <h3 style={{ color: '#ffffff' }}>Enter License Key</h3>
                    <p style={{ color: '#b0b0b0' }}>Already have a Kosign Pro license? Enter it below to continue.</p>
                </div>

                <div className="createSectionWrapper">
                    <div style={{ maxWidth: '400px', margin: '0 auto' }}>
                        <div className="form-group mb-3">
                            <label className="form-label">License Key</label>
                            <input
                                type="text"
                                className="form-control"
                                value={licenseKey}
                                onChange={(e) => {
                                    setLicenseKey(e.target.value);
                                    setLicenseError('');
                                    setLicenseInfo(null);
                                }}
                                placeholder="KSGN-XXXX-XXXX-XXXX"
                                style={{ fontFamily: 'Monaco, Menlo, monospace' }}
                            />
                            {licenseError && (
                                <Alert variant="danger" className="mt-2">
                                    {licenseError}
                                </Alert>
                            )}

                            {licenseInfo && (
                                <Alert variant={licenseInfo.isCompatible ? "success" : "warning"} className="mt-2">
                                    {licenseInfo.isCompatible ? (
                                        <>
                                            ✅ License validated! Allows {licenseInfo.maxKeys} key{licenseInfo.maxKeys === 1 ? '' : 's'} 
                                            (you need {totalShareholders})
                                        </>
                                    ) : (
                                        <>
                                            ⚠️ License allows {licenseInfo.maxKeys} key{licenseInfo.maxKeys === 1 ? '' : 's'} but you need {totalShareholders}
                                        </>
                                    )}
                                </Alert>
                            )}
                        </div>

                        <Button 
                            variant="primary" 
                            size="lg" 
                            className="w-100 mb-3"
                            onClick={handleLicenseSubmit}
                            disabled={validatingLicense || (licenseInfo && !licenseInfo.isCompatible)}
                        >
                            {validatingLicense ? (
                                <>
                                    <Spinner animation="border" size="sm" className="me-2" />
                                    Validating...
                                </>
                            ) : licenseInfo && licenseInfo.isCompatible ? (
                                'Continue with License'
                            ) : licenseInfo && !licenseInfo.isCompatible ? (
                                'License Insufficient'
                            ) : (
                                'Validate License'
                            )}
                        </Button>

                        <Button 
                            variant="outline-secondary" 
                            size="lg"
                            className="w-100"
                            onClick={() => setShowLicenseInput(false)}
                        >
                            ← Back to Payment
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    const paymentAmount = ProFeatureService.calculateCost(totalShareholders);
    const additionalKeys = totalShareholders - 1;

    return (
        <div className="wizard-step-container">
            <div className="create-vault-header">
                <h3 style={{ color: '#ffffff' }}>Complete Your Purchase</h3>
                <p style={{ color: '#b0b0b0' }}>Pay for {additionalKeys} additional key{additionalKeys !== 1 ? 's' : ''} to create your {totalShareholders}-key vault</p>
            </div>

            <div className="createSectionWrapper">
                {/* Compact Order Summary */}
                <div style={{
                    background: '#222222',
                    border: '1px solid #444444',
                    borderRadius: '8px',
                    padding: '1rem',
                    marginBottom: '1.5rem',
                    maxWidth: '400px',
                    margin: '0 auto 1.5rem auto'
                }}>
                    <div className="d-flex justify-content-between mb-2">
                        <span style={{ color: '#b0b0b0' }}>First key</span>
                        <span style={{ color: '#4caf50' }}>Free</span>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                        <span style={{ color: '#b0b0b0' }}>{additionalKeys} additional key{additionalKeys !== 1 ? 's' : ''}</span>
                        <span style={{ color: '#ffffff', fontWeight: 'bold' }}>${paymentAmount}</span>
                    </div>
                    <hr style={{ border: '1px solid #444', margin: '0.5rem 0' }} />
                    <div className="d-flex justify-content-between">
                        <span style={{ color: '#ffffff', fontWeight: 'bold' }}>Total</span>
                        <span style={{ color: '#ffffff', fontWeight: 'bold' }}>${paymentAmount}</span>
                    </div>
                    <div style={{ color: '#888888', fontSize: '0.85rem', marginTop: '0.5rem' }}>
                        ${ProFeatureService.PRICING.pricePerKey} per additional key • No monthly fees
                    </div>
                </div>

                {/* Payment Form */}
                <div style={{ maxWidth: '400px', margin: '0 auto' }}>
                    <Elements stripe={stripePromise}>
                        <PaymentForm
                            onSuccess={handlePaymentSuccess}
                            onError={handlePaymentError}
                            totalShareholders={totalShareholders}
                        />
                    </Elements>
                </div>

                {/* License Key Option */}
                <div style={{ textAlign: 'center', margin: '1.5rem 0' }}>
                    <Button 
                        variant="link" 
                        onClick={() => setShowLicenseInput(true)}
                        style={{ color: '#1786ff', textDecoration: 'none' }}
                    >
                        Already have a license key? Click here
                    </Button>
                </div>

                {/* Back Button */}
                <div className="wizard-footer" style={{ marginTop: '1.5rem' }}>
                    <Button 
                        variant="outline-secondary" 
                        size="lg"
                        className="w-100"
                        onClick={onBack}
                    >
                        ← Back
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default KosignPaymentStep; 