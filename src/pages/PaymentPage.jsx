import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Container, Row, Col, Alert, Spinner } from 'react-bootstrap';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Layout from '../components/Layout';
import Navbar from '../components/NavbarTop';
import Footer from '../components/Footer';
import { PaymentService } from '../services/PaymentService';
import '../style/index.css';
import '../style/payment.css';

// Load Stripe
const stripePromise = loadStripe(global.stripePubKey);

const CheckoutForm = ({ amount, onSuccess, onError }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [isProcessing, setIsProcessing] = useState(false);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsProcessing(true);
        setError('');

        try {
            // Create payment intent on your backend
            const response = await PaymentService.setupPayment(1, ''); // quantity=1, no coupon
            
            if (!response.client_secret) {
                throw new Error('Failed to create payment intent');
            }

            // Store the license key from the response
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
            } else if (paymentIntent.status === 'succeeded') {
                // Call confirmPayment to update backend with success details
                try {
                    await fetch(`${global.baseApiURL}kosign/pay/confirmPayment`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        body: new URLSearchParams({
                            client_secret: response.client_secret,
                            payment_intent_id: paymentIntent.id,
                            email: email,
                            name: name
                        })
                    });
                } catch (confirmError) {
                    console.warn('Failed to confirm payment in backend:', confirmError);
                    // Don't fail the whole process for this
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
        },
    };

    return (
        <form onSubmit={handleSubmit} className="payment-form">
            <div className="form-group mb-3">
                <label htmlFor="email" className="form-label">Email Address</label>
                <input
                    type="email"
                    id="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="your@email.com"
                />
                <small className="form-text text-muted">
                    We'll send your purchase confirmation and access details here
                </small>
            </div>

            <div className="form-group mb-3">
                <label htmlFor="name" className="form-label">Full Name</label>
                <input
                    type="text"
                    id="name"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="John Doe"
                />
            </div>

            <div className="form-group mb-4">
                
                {/* Card Number */}
                <div className="card-field-group mb-3">
                    <label className="form-label-small">Card Number</label>
                    <div className="stripe-element-container">
                        <CardNumberElement options={cardElementOptions} />
                    </div>
                </div>

                {/* Expiry and CVC in a row */}
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
                className="btn btn-primary btn-lg w-100 payment-submit-btn"
            >
                {isProcessing ? (
                    <>
                        <Spinner animation="border" size="sm" className="me-2" />
                        Processing...
                    </>
                ) : (
                    `Pay $${amount}`
                )}
            </button>

            <div className="payment-security-note mt-3 text-center">
                <small className="text-muted">
                    🔒 Secured by Stripe • Your card details are never stored on our servers
                </small>
            </div>
        </form>
    );
};

function PaymentPage() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [paymentError, setPaymentError] = useState('');
    const [purchaseDetails, setPurchaseDetails] = useState(null);

    // Check if returning from successful payment
    useEffect(() => {
        const paymentIntent = searchParams.get('payment_intent');
        const paymentIntentClientSecret = searchParams.get('payment_intent_client_secret');
        
        if (paymentIntent && paymentIntentClientSecret) {
            // Handle successful payment return
            setPaymentSuccess(true);
            setPurchaseDetails({
                paymentIntent,
                paymentIntentClientSecret
            });
        }
    }, [searchParams]);

    const handlePaymentSuccess = (paymentIntent, email, name, licenseKey) => {
        setPaymentSuccess(true);
        setPurchaseDetails({ 
            paymentIntent, 
            email, 
            name, 
            licenseKey 
        });
        
        // Store purchase info in localStorage for vault creation
        localStorage.setItem('kosign_pro_purchase', JSON.stringify({
            paymentIntentId: paymentIntent.id,
            email: email,
            name: name,
            licenseKey: licenseKey,
            purchaseDate: new Date().toISOString(),
            features: ['extended_storage', 'multiple_shares']
        }));
    };

    const handlePaymentError = (error) => {
        setPaymentError(error);
    };

    const copyLicenseKey = () => {
        navigator.clipboard.writeText(purchaseDetails.licenseKey);
        // You could add a toast notification here
    };

    if (paymentSuccess) {
        return (
            <Layout>
                <div className="payment-page">
                    <Navbar loggedIn={false} />
                    
                    <section className="payment-success-section">
                        <Container>
                            <Row className="justify-content-center">
                                <Col lg={8} md={10}>
                                    <div className="payment-success-card text-center">
                                        <div className="success-icon mb-4">
                                            <div className="success-checkmark">✓</div>
                                        </div>
                                        
                                        <h1 className="success-title">Payment Successful!</h1>
                                        <p className="success-subtitle">
                                            Welcome to Kosign Pro! Your payment has been processed successfully.
                                        </p>

                                        {/* License Key Display */}
                                        {purchaseDetails?.licenseKey && (
                                            <div className="license-key-section mb-4">
                                                <h4 className="license-key-title">Your License Key</h4>
                                                <div className="license-key-container">
                                                    <div className="license-key-display">
                                                        <code className="license-key-code">
                                                            {purchaseDetails.licenseKey}
                                                        </code>
                                                        <button 
                                                            className="btn btn-outline-secondary btn-sm ms-2"
                                                            onClick={copyLicenseKey}
                                                            title="Copy license key"
                                                        >
                                                            📋 Copy
                                                        </button>
                                                    </div>
                                                    <p className="license-key-note">
                                                        <strong>Important:</strong> Save this license key! You'll need it to activate Pro features.
                                                        <br />
                                                        <small className="text-muted">
                                                            We've also sent this to your email: {purchaseDetails.email}
                                                        </small>
                                                    </p>
                                                </div>
                                            </div>
                                        )}

                                        <div className="success-features mb-4">
                                            <h4>You now have access to:</h4>
                                            <ul className="feature-list">
                                                <li>✓ Up to 20 key shares</li>
                                                <li>✓ Extended storage (5,000 chars)</li>
                                                <li>✓ Flexible thresholds (2-of-3, 3-of-5, etc.)</li>
                                            </ul>
                                        </div>

                                        <div className="success-actions">
                                            <button 
                                                className="btn btn-primary btn-lg me-3"
                                                onClick={() => navigate('/create')}
                                            >
                                                Create Your Pro Vault
                                            </button>
                                            <button 
                                                className="btn btn-outline-secondary"
                                                onClick={() => navigate('/')}
                                            >
                                                Back to Home
                                            </button>
                                        </div>

                                        {purchaseDetails?.email && (
                                            <div className="success-note mt-4">
                                                <small className="text-muted">
                                                    A confirmation email has been sent to {purchaseDetails.email}
                                                </small>
                                            </div>
                                        )}
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </section>

                    <Footer />
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="payment-page">
                <Navbar loggedIn={false} />
                
                <section className="payment-section">
                    <Container>
                        <Row className="justify-content-center">
                            <Col lg={8} md={10}>
                                <div className="payment-header text-center mb-5">
                                    <h1 className="payment-title">Upgrade to Kosign Pro</h1>
                                    <p className="payment-subtitle">
                                        One-time payment • No subscriptions • Own it forever
                                    </p>
                                </div>

                                <Row>
                                    <Col lg={6} className="mb-4">
                                        <div className="payment-summary-card">
                                            <h3>Order Summary</h3>
                                            <div className="order-item">
                                                <div className="item-details">
                                                    <h4>Kosign Pro Vault</h4>
                                                    <p>Yours forever</p>
                                                </div>
                                                <div className="item-price">$49</div>
                                            </div>
                                            
                                            <div className="features-included">
                                                <h5>What's included:</h5>
                                                <ul>
                                                    <li>✓ Up to 20 key shares</li>
                                                    <li>✓ Extended storage (5,000 chars)</li>
                                                    <li>✓ Flexible thresholds <br/>(2-of-3, 3-of-5, etc.)</li>
                                                </ul>
                                            </div>

                                            {/* <div className="total-section">
                                                <div className="total-line">
                                                    <span>Total</span>
                                                    <span className="total-amount">$49.00</span>
                                                </div>
                                            </div> */}
                                        </div>
                                    </Col>

                                    <Col lg={6}>
                                        <div className="payment-form-card">
                                            <h3>Payment Details</h3>
                                            <Elements stripe={stripePromise}>
                                                <CheckoutForm
                                                    amount={49}
                                                    onSuccess={handlePaymentSuccess}
                                                    onError={handlePaymentError}
                                                />
                                            </Elements>
                                        </div>
                                    </Col>
                                </Row>

                                {paymentError && (
                                    <Row className="mt-4">
                                        <Col>
                                            <Alert variant="danger">
                                                <strong>Payment Error:</strong> {paymentError}
                                            </Alert>
                                        </Col>
                                    </Row>
                                )}
                            </Col>
                        </Row>
                    </Container>
                </section>

                <Footer />
            </div>
        </Layout>
    );
}

export default PaymentPage; 