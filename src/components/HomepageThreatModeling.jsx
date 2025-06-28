import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function HomepageThreatModeling() {
    return (
        <section className="security-overview-section">
            <Container>
                <Row className="text-center">
                    <Col lg={8} className="mx-auto">
                        <h2 className="security-overview-title">Built for Maximum Security</h2>
                        <p className="security-overview-subtitle">
                            Comprehensive protection against physical disasters, digital attacks, and inheritance challenges.
                        </p>
                        
                        {/* <div className="security-highlights">
                            <div className="security-highlight">
                                <span className="security-icon">🌍</span>
                                <span>Disaster-proof distribution</span>
                            </div>
                            <div className="security-highlight">
                                <span className="security-icon">🔐</span>
                                <span>Military-grade encryption</span>
                            </div>
                            <div className="security-highlight">
                                <span className="security-icon">👨‍👩‍👧‍👦</span>
                                <span>Social recovery system</span>
                            </div>
                        </div> */}

                        <div className="security-cta">
                            <Link to="/security" className="security-learn-more">
                                View Threat Model
                            </Link>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}

export default HomepageThreatModeling; 