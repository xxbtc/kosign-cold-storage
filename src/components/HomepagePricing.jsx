import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { ProFeatureService } from '../services/ProFeatureService';
import { AnalyticsService } from '../services/AnalyticsService';

function HomepagePricing({ pricingRef }) {
    const navigate = useNavigate();
    
    const pricing = ProFeatureService.PRICING;

    return (
        <section className="pricing-section" ref={pricingRef}>
            <Container>
                <Row>
                    <Col className="text-center">
                        <p className="pricing-subtitle">One-time payment • No subscriptions • Pay only for what you need</p>
                    </Col>
                </Row>
                
                <Row className="pricing-grid justify-content-center">
                    <Col xl={8} lg={10} md={12} className="mb-4">
                        <div className="pricing-card large-card">
                            <div className="pricing-header text-center mb-4">
                                <h3>Pay Per Key</h3>
                                <div className="price-structure">
                                    <div className="price-item">
                                        <span className="key-count">First key:</span>
                                        <span className="price-text">Free</span>
                                    </div>
                                    <div className="price-item">
                                        <span className="key-count">Each additional key:</span>
                                        <span className="price-text">${pricing.pricePerKey}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Simple Examples */}
                            <div className="pricing-examples-simple">
                                <div className="examples-list">
                                    <div className="example-item">
                                        <span className="example-type">Solo:</span>
                                        <span className="example-desc">1 key = Free</span>
                                    </div>
                                    <div className="example-item">
                                        <span className="example-type">Family:</span>
                                        <span className="example-desc">5 keys = $20</span>
                                    </div>
                                    <div className="example-item">
                                        <span className="example-type">Team:</span>
                                        <span className="example-desc">10 keys = $45</span>
                                    </div>
                                </div>
                            </div>

                            <ul className="pricing-features">
                                <li>Up to {pricing.maxStorage} characters storage per vault</li>
                                <li>One-time payment, own forever</li>
                                <li>No monthly fees or subscriptions</li>
                            </ul>
                            
                            <button className="pricing-cta primary" onClick={() => {
                                AnalyticsService.trackCTAClick('pricing');
                                navigate('/create');
                            }}>
                                Create Your Vault
                            </button>
                            <p className="pricing-note">Choose your keys upfront • Pay once, own forever</p>
                        </div>
                    </Col>
                </Row>
                
                <Row className="mt-4">
                    <Col className="text-center">
                        <p className="pricing-guarantee">
                            <strong>Simple and transparent.</strong> No hidden fees. No recurring charges.<br/>
                            Pay once for the keys you need, then own your vault forever.
                        </p>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}

export default HomepagePricing; 