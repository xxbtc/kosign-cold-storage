import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function HomepageValueProp() {
    // Handle expandable sections
    useEffect(() => {
        const handleAccordionClick = (e) => {
            const accordionHeader = e.target.closest('.accordion-header');
            if (accordionHeader) {
                e.preventDefault();
                const accordionItem = accordionHeader.closest('.accordion-item');
                const isCurrentlyActive = accordionItem.classList.contains('active');
                
                // Close all other accordion items
                document.querySelectorAll('.accordion-item').forEach(item => {
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
        <section className="value-prop-section">
            <Container>
                <Row className="text-center mb-5">
                    <Col>
                        <h2 className="value-prop-title">Bulletproof Backup for Your Digital Life</h2>
                        <p className="value-prop-subtitle">
                            Distributed paper vaults that outlast hardware failures, company bankruptcies, and generational changes
                        </p>
                        <div className="open-source-guarantee">
                            <div className="guarantee-badge">
                                <span className="badge-icon">⚡</span>
                                <span className="badge-text">
                                    <a href="https://github.com/xxbtc/kosign-unlock" target="_blank" rel="noopener noreferrer" className="github-link">open source</a> tool for future-proof access
                                </span>
                            </div>
                        </div>
                        
                    </Col>
                </Row>
                
                {/* Accordion Cards */}
                <Row className="justify-content-center">
                    <Col lg={10} xl={10}>
                        <h3 className="use-cases-title">Why You Need Kosign</h3>
                        <div className="value-accordion">
                            {/* Foundation Card */}
                            <div className="accordion-item" data-accordion="foundation">
                                <div className="accordion-header">
                                    <div className="accordion-content-preview">
                                        <div className="value-icon">🔒</div>
                                        <div className="accordion-text">
                                            <h3>Foundational Security Layer</h3>
                                            <p>The missing piece that makes all your other security tools actually secure. Store master passwords, 2FA codes, and recovery keys safely.</p>
                                        </div>
                                    </div>
                                    <div className="accordion-toggle">
                                        <span className="toggle-text">Learn More</span>
                                        <span className="toggle-icon">↓</span>
                                    </div>
                                </div>
                                
                                <div className="accordion-body">
                                    <div className="accordion-detail-content">
                                        <div className="problem-insight">
                                            <div className="insight-header">
                                                <h4>🤔 The Impossible Questions</h4>
                                                <p>Every security setup leads to these unanswerable questions:</p>
                                            </div>
                                            
                                            <div className="impossible-scenarios">
                                                <div className="scenario-card">
                                                    <div className="scenario-icon">🔐</div>
                                                    <div className="scenario-content">
                                                        <h5>"Where do I store my password manager's master password?"</h5>
                                                        <p>
                                                        Another password manager? Then where's THAT password?</p>
                                                    </div>
                                                </div>
                                                
                                                <div className="scenario-card">
                                                    <div className="scenario-icon">📱</div>
                                                    <div className="scenario-content">
                                                        <h5>"Where do I store my 2FA backup codes?"</h5>
                                                        <p>In my password manager? But I need 2FA to GET INTO my password manager!</p>
                                                    </div>
                                                </div>
                                                
                                                <div className="scenario-card">
                                                    <div className="scenario-icon">💎</div>
                                                    <div className="scenario-content">
                                                        <h5>"Where do I safely store my crypto seed phrase?"</h5>
                                                        <p>Cleartext paper? Risky if found. Split it in half? double the trouble.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="solution-showcase">
                                            <h4>✅ Kosign Answers Every Question</h4>
                                            <div className="solution-answers">
                                                <div className="answer-item">
                                                    <span className="answer-icon">🔐</span>
                                                    <span className="answer-text">Store master passwords in encrypted passwordless vaults with distributed keys</span>
                                                </div>
                                                <div className="answer-item">
                                                    <span className="answer-icon">📱</span>
                                                    <span className="answer-text">Access 2FA codes independently - no circular dependencies</span>
                                                </div>
                                                <div className="answer-item">
                                                    <span className="answer-icon">🔄</span>
                                                    <span className="answer-text">Make unlimited secure backup copies - they're useless without distributed keys</span>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="breakthrough-highlight">
                                            <strong>💡 The Result:</strong> Make unlimited secure backup copies and store them wherever you want - they're useless without the distributed keys. No single disaster can lock you out.
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Hardware Wallet Card */}
                            <div className="accordion-item" data-accordion="hardware">
                                <div className="accordion-header">
                                    <div className="accordion-content-preview">
                                        <div className="value-icon">💎</div>
                                        <div className="accordion-text">
                                            <h3>Hardware Wallet Backup Crisis</h3>
                                            <p>Even expensive hardware wallets fail at backup and inheritance. Where do you safely store the seed phrase? Kosign solves what hardware wallets can't.</p>
                                        </div>
                                    </div>
                                    <div className="accordion-toggle">
                                        <span className="toggle-text">Learn More</span>
                                        <span className="toggle-icon">↓</span>
                                    </div>
                                </div>
                                
                                <div className="accordion-body">
                                    <div className="accordion-detail-content">
                                        <div className="problem-insight">
                                            <div className="insight-header">
                                                <h4>💎 The Hardware Wallet Paradox</h4>
                                                <p>Hardware wallets are the "gold standard" for crypto security, but they have a <strong>massive blind spot</strong></p>
                                            </div>
                                            
                                            <div className="paradox-flow">
                                                <div className="flow-step success">
                                                    <span className="step-emoji">💳</span>
                                                    <div className="step-text">
                                                        <strong>Buy Hardware Wallet</strong>
                                                        <span>Great for daily use</span>
                                                    </div>
                                                </div>
                                                <div className="flow-arrow">→</div>
                                                <div className="flow-step warning">
                                                    <span className="step-emoji">🤦‍♂️</span>
                                                    <div className="step-text">
                                                        <strong>Write Seed On Paper</strong>
                                                        <span>If found, you're robbed.<br/>If lost, you're broke.</span>
                                                    </div>
                                                </div>
                                                <div className="flow-arrow">→</div>
                                                <div className="flow-step danger">
                                                    <span className="step-emoji">😰</span>
                                                    <div className="step-text">
                                                        <strong>Impossible Choice</strong>
                                                        <span>One copy = fragile.<br/>Many copies = risky.</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="hw-comparison">
                                            <div className="comparison-section">
                                                <h4>❌ Without Kosign</h4>
                                                <div className="comparison-points">
                                                    <div className="point-item">
                                                        <span className="point-icon">📄</span>
                                                        <span>Unencrypted seed backup</span>
                                                    </div>
                                                    <div className="point-item">
                                                        <span className="point-icon">🚫</span>
                                                        <span>Risky to make backup copies</span>
                                                    </div>
                                                    <div className="point-item">
                                                        <span className="point-icon">💀</span>
                                                        <span>One backup failure = total loss</span>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="comparison-section success">
                                                <h4>✅ With Kosign</h4>
                                                <div className="comparison-points">
                                                    <div className="point-item">
                                                        <span className="point-icon">🔒</span>
                                                        <span>Seed backup encrypted</span>
                                                    </div>
                                                    <div className="point-item">
                                                        <span className="point-icon">🌍</span>
                                                        <span>Multiple safe backup copies possible</span>
                                                    </div>
                                                    <div className="point-item">
                                                        <span className="point-icon">🛡️</span>
                                                        <span>Distributed keys and social recovery</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="breakthrough-highlight">
                                            <strong>🎯 Perfect Partnership:</strong> Hardware wallets protect daily use, Kosign protects backup and inheritance. Together they solve the complete crypto security puzzle.
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Inheritance Card */}
                            <div className="accordion-item" data-accordion="inheritance">
                                <div className="accordion-header">
                                    <div className="accordion-content-preview">
                                        <div className="value-icon">👨‍👩‍👧‍👦</div>
                                        <div className="accordion-text">
                                            <h3>Digital Inheritance Without Trust</h3>
                                            <p>Give vault copies to family without worrying about their security practices. Distributed keys with social recovery keep your assets secure until needed.</p>
                                        </div>
                                    </div>
                                    <div className="accordion-toggle">
                                        <span className="toggle-text">Learn More</span>
                                        <span className="toggle-icon">↓</span>
                                    </div>
                                </div>
                                
                                <div className="accordion-body">
                                    <div className="accordion-detail-content">
                                        <div className="problem-insight">
                                            <div className="insight-header">
                                                <h4>🤔 The Digital Inheritance Dilemma</h4>
                                                <p>How do you give family access to your digital assets <strong>without trusting their security practices?</strong></p>
                                            </div>
                                            
                                            <div className="inheritance-challenge">
                                                <div className="challenge-item">
                                                    <span className="challenge-icon">🔐</span>
                                                    <div className="challenge-text">
                                                        <strong>Give them passwords</strong>
                                                        <span>Compromised if they're hacked</span>
                                                    </div>
                                                </div>
                                                <div className="challenge-item">
                                                    <span className="challenge-icon">💀</span>
                                                    <div className="challenge-text">
                                                        <strong>Give them seed phrases</strong>
                                                        <span>If lost or stolen, all funds gone forever</span>
                                                    </div>
                                                </div>
                                                <div className="challenge-item">
                                                    <span className="challenge-icon">📍</span>
                                                    <div className="challenge-text">
                                                        <strong>Single backup location</strong>
                                                        <span>One fire, theft, or mistake ruins everything</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="quorum-showcase">
                                            <h4>✅ Kosign's Solution: Distributed Trust</h4>
                                            <div className="quorum-visual">
                                                <p className="quorum-example-text">Require 3 of 5 people to cooperate - no single point of failure</p>
                                                <div className="key-holders">
                                                    <div className="key-holder">
                                                        <span className="holder-icon">👨</span>
                                                        <span>Dad</span>
                                                    </div>
                                                    <div className="key-holder">
                                                        <span className="holder-icon">👩</span>
                                                        <span>Mom</span>
                                                    </div>
                                                    <div className="key-holder">
                                                        <span className="holder-icon">👦</span>
                                                        <span>Brother</span>
                                                    </div>
                                                    <div className="key-holder">
                                                        <span className="holder-icon">👩‍💼</span>
                                                        <span>Lawyer</span>
                                                    </div>
                                                    <div className="key-holder">
                                                        <span className="holder-icon">👨‍💼</span>
                                                        <span>Friend</span>
                                                    </div>
                                                </div>
                                                <div className="quorum-result">
                                                    <span className="quorum-math">Vault + keys = access</span>
                                                    <span className="quorum-security">No single person can access alone.</span>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="breakthrough-highlight">
                                            <strong>🎯 The Result:</strong> Your family gets vault copies they can't lose, while your assets stay secure until multiple trusted parties cooperate.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}

export default HomepageValueProp; 