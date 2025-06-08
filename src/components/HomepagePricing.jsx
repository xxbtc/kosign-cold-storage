import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

function HomepagePricing({ pricingRef }) {
    const navigate = useNavigate();

    return (
        <section className="pricing-section" ref={pricingRef}>
            <Container>
                <Row>
                    <Col className="text-center">
                        <h2 className="pricing-title">Get Started Free</h2>
                        <p className="pricing-subtitle">Upgrade as your needs grow</p>
                    </Col>
                </Row>
                
                <Row className="pricing-grid justify-content-center">
                    <Col xl={5} lg={6} md={10} sm={12} className="mb-4">
                        <div className="pricing-card ">
                            <div className="pricing-header">
                                <h3>Free</h3>
                                <div className="price">$0<span> forever</span></div>
                            </div>
                            <ul className="pricing-features">
                                <li>✓ Single vault</li>
                                <li>✓ Up to 2 key shares</li>
                                <li>✓ Limited storage (~800 chars)</li>
                                <li>✓ Basic thresholds (1-of-1, 2-of-2)</li>
                                <li>✓ Open source & auditable</li>
                            </ul>
                            <button className="pricing-cta primary" onClick={() => navigate('/create')}>
                                Start Free
                            </button>
                            <p className="pricing-note">Perfect for most users • No credit card required</p>
                        </div>
                    </Col>
                    
                    <Col xl={5} lg={6} md={10} sm={12} className="mb-4">
                        <div className="pricing-card one-time-purchase ">
                            <div className="pricing-header">
                                <h3>Pro</h3>
                                <div className="price">$49<span> one-time</span></div>
                            </div>
                            <ul className="pricing-features">
                                <li>✓ Everything in Free</li>
                                <li>✓ Up to 20 key shares</li>
                                <li>✓ Extended storage (5,000 chars)</li>
                                <li>✓ Flexible thresholds (2-of-3, 3-of-5, etc.)</li>
                            </ul>
                            <button className="pricing-cta primary" onClick={() => navigate('/payment')}>
                                Buy Once, Own Forever
                            </button>
                            <p className="pricing-note">Pay once • Keep forever • No monthly fees </p>
                        </div>
                    </Col>
                </Row>
                
                <Row className="mt-4">
                    <Col className="text-center">
                        <p className="pricing-guarantee">
                            <strong>No subscriptions. No monthly fees. No recurring charges.</strong><br/>                        
                        </p>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}

export default HomepagePricing; 