import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function HomepageHowItWorks() {
    return (
        <section className="how-it-works-section">
            <Container>
                <Row>
                    <Col className="text-center">
                        <h2 className="how-it-works-title">How It Works</h2>
                        <p className="how-it-works-subtitle">Create your secure vault in 3 simple steps</p>
                    </Col>
                </Row>
                
                <Row className="steps-grid">
                    <Col xl={4} lg={4} md={6} sm={12} className="mb-4">
                        <div className="step-card">
                            <div className="step-number">1</div>
                            <h3>Go Offline</h3>
                            <p>Turn on airplane mode, then add passwords, crypto keys, and important information to your vault.</p>
                        </div>
                    </Col>
                    
                    <Col xl={4} lg={4} md={6} sm={12} className="mb-4">
                        <div className="step-card">
                            <div className="step-number">2</div>
                            <h3>Print & Distribute</h3>
                            <p>Print copies of your encrypted vault and keys. Store them in different secure locations or with trusted people to protect against loss, fire, or natural disasters.</p>
                        </div>
                    </Col>
                    
                    <Col xl={4} lg={4} md={6} sm={12} className="mb-4">
                        <div className="step-card">
                            <div className="step-number">3</div>
                            <h3>Recover</h3>
                            <p>Combine vault + keys to recover assets. Designed for emergencies, inheritance, and long term storage.</p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}

export default HomepageHowItWorks; 