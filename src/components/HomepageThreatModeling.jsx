import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function HomepageThreatModeling() {
    // Handle expandable sections
    useEffect(() => {
        const handleAccordionClick = (e) => {
            const accordionHeader = e.target.closest('.threat-accordion-header');
            if (accordionHeader) {
                e.preventDefault();
                const accordionItem = accordionHeader.closest('.threat-accordion-item');
                const isCurrentlyActive = accordionItem.classList.contains('active');
                
                // Close all other accordion items
                document.querySelectorAll('.threat-accordion-item').forEach(item => {
                    if (item !== accordionItem) {
                        item.classList.remove('active');
                    }
                });
                
                // Toggle the clicked accordion item
                if (isCurrentlyActive) {
                    accordionItem.classList.remove('active');
                } else {
                    accordionItem.classList.add('active');
                }
            }
        };

        document.addEventListener('click', handleAccordionClick);
        
        return () => {
            document.removeEventListener('click', handleAccordionClick);
        };
    }, []);

    return (
        <section className="threat-modeling-section">
            <Container>
                {/* Title Section */}
                <Row className="text-center mb-5">
                    <Col>
                        <h2 className="threat-modeling-title">What Could Go Wrong? (And How We Prevent It)</h2>
                        <p className="threat-modeling-subtitle">
                            Every security threat has been anticipated and addressed—see how Kosign keeps you protected
                        </p>
                    </Col>
                </Row>

                {/* Threat Categories */}
                <Row className="justify-content-center">
                    <Col lg={10} xl={10}>
                        <div className="threat-accordion">
                            {/* Physical Threats */}
                            <div className="threat-accordion-item" data-threat="physical">
                                <div className="threat-accordion-header">
                                    <div className="threat-preview">
                                        <div className="threat-icon">🔥</div>
                                        <div className="threat-text">
                                            <h3>Physical Disasters</h3>
                                            <p>Fire, flood, earthquake, or theft destroys your backup</p>
                                        </div>
                                    </div>
                                    <div className="threat-right-controls">
                                        <div className="threat-status protected">
                                            <span className="status-icon">✅</span>
                                            <span className="status-text">Protected</span>
                                        </div>
                                        <div className="threat-toggle">
                                            <span className="toggle-text">Learn More</span>
                                            <span className="toggle-icon">↓</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="threat-accordion-body">
                                    <div className="threat-solution">
                                        <h4>🛡️ Multiple Distributed Copies</h4>
                                        <div className="solution-points">
                                            <div className="solution-point">
                                                <span className="point-icon">📍</span>
                                                <div>
                                                    <strong>Geographic Distribution:</strong> Store copies in different cities, states, or countries
                                                </div>
                                            </div>
                                            <div className="solution-point">
                                                <span className="point-icon">🔒</span>
                                                <div>
                                                    <strong>Safe to Duplicate:</strong> Since they're encrypted, make as many copies as you want
                                                </div>
                                            </div>
                                            <div className="solution-point">
                                                <span className="point-icon">🏦</span>
                                                <div>
                                                    <strong>Multiple Storage Types:</strong> Home safe, bank vault, trusted family, safety deposit boxes
                                                </div>
                                            </div>
                                        </div>
                                        <div className="threat-example">
                                            <strong>Real Scenario:</strong> House fire destroys your home safe → Still have copies at the bank, your sister's house, and your lawyer's office
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Digital Threats */}
                            <div className="threat-accordion-item" data-threat="digital">
                                <div className="threat-accordion-header">
                                    <div className="threat-preview">
                                        <div className="threat-icon">💻</div>
                                        <div className="threat-text">
                                            <h3>Digital Attacks</h3>
                                            <p>Hackers, malware, or digital surveillance compromise your data</p>
                                        </div>
                                    </div>
                                    <div className="threat-right-controls">
                                        <div className="threat-status protected">
                                            <span className="status-icon">✅</span>
                                            <span className="status-text">Protected</span>
                                        </div>
                                        <div className="threat-toggle">
                                            <span className="toggle-text">Learn More</span>
                                            <span className="toggle-icon">↓</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="threat-accordion-body">
                                    <div className="threat-solution">
                                        <h4>🛡️ Encrypted Offline Storage</h4>
                                        <div className="solution-points">
                                            <div className="solution-point">
                                                <span className="point-icon">🔐</span>
                                                <div>
                                                    <strong>Military-Grade Encryption:</strong> Even if stolen or hacked, mathematically impossible to crack
                                                </div>
                                            </div>
                                            <div className="solution-point">
                                                <span className="point-icon">💾</span>
                                                <div>
                                                    <strong>Any Storage Medium:</strong> Paper, USB drives, cloud storage—all equally secure when encrypted
                                                </div>
                                            </div>
                                            <div className="solution-point">
                                                <span className="point-icon">🌐</span>
                                                <div>
                                                    <strong>No Network Dependency:</strong> Access your vault whether online services exist or not
                                                </div>
                                            </div>
                                        </div>
                                        <div className="threat-example">
                                            <strong>Real Scenario:</strong> Massive data breach exposes billions of passwords → Your encrypted vault remains completely safe, whether stored on paper, USB, or cloud
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Personal Incapacity */}
                            <div className="threat-accordion-item" data-threat="incapacity">
                                <div className="threat-accordion-header">
                                    <div className="threat-preview">
                                        <div className="threat-icon">🏥</div>
                                        <div className="threat-text">
                                            <h3>Personal Incapacity</h3>
                                            <p>Accident, illness, or death leaves family unable to access accounts</p>
                                        </div>
                                    </div>
                                    <div className="threat-right-controls">
                                        <div className="threat-status protected">
                                            <span className="status-icon">✅</span>
                                            <span className="status-text">Protected</span>
                                        </div>
                                        <div className="threat-toggle">
                                            <span className="toggle-text">Learn More</span>
                                            <span className="toggle-icon">↓</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="threat-accordion-body">
                                    <div className="threat-solution">
                                        <h4>🛡️ Social Recovery System</h4>
                                        <div className="solution-points">
                                            <div className="solution-point">
                                                <span className="point-icon">👥</span>
                                                <div>
                                                    <strong>Distributed Keys:</strong> Multiple trusted people hold recovery keys
                                                </div>
                                            </div>
                                            <div className="solution-point">
                                                <span className="point-icon">🔢</span>
                                                <div>
                                                    <strong>Quorum System:</strong> Require 3 of 5 people to cooperate—no single point of failure
                                                </div>
                                            </div>
                                            <div className="solution-point">
                                                <span className="point-icon">⚖️</span>
                                                <div>
                                                    <strong>Built-in Arbitration:</strong> Prevent family disputes with clear rules
                                                </div>
                                            </div>
                                        </div>
                                        <div className="threat-example">
                                            <strong>Real Scenario:</strong> You're in a coma → Your spouse + two siblings can recover your vault without any single person having full control
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>

                        {/* Summary Section */}
                        <div className="threat-summary">
                            <div className="summary-content">
                                <h3>🎯 Complete Protection</h3>
                                <p>
                                    These are just the most common threats. Kosign protects against many more security scenarios through distributed encryption and social recovery.
                                </p>
                                <div className="threat-cta-section">
                                    <a href="/security" className="threat-cta-button">
                                        View Complete Security Analysis
                                    </a>
                                    <p className="threat-cta-subtitle">
                                        See all 8+ threats analyzed with technical details and mitigation strategies
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}

export default HomepageThreatModeling; 