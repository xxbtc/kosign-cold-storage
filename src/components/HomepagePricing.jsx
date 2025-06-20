import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { ProFeatureService } from '../services/ProFeatureService';
import { AnalyticsService } from '../services/AnalyticsService';

function HomepagePricing({ pricingRef }) {
    const navigate = useNavigate();
    
    // Get limits from single source of truth
    const freeLimits = ProFeatureService.FREE_LIMITS;
    const proLimits = ProFeatureService.PRO_LIMITS;

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
                                <li>✓ Up to {freeLimits.maxShares} key shares</li>
                                <li>✓ Limited storage ({freeLimits.maxStorage} chars)</li>
                                <li>✓ Basic thresholds (1-of-1, 2-of-2)</li>
                            </ul>
                            <button className="pricing-cta primary" onClick={() => {
                                AnalyticsService.trackCTAClick('pricing');
                                navigate('/create');
                            }}>
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
                                <li>✓ Up to {proLimits.maxShares} key shares</li>
                                <li>✓ Extended storage ({proLimits.maxStorage.toLocaleString()} chars)</li>
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