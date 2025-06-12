import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
// import logoIMG from "../images/kosign-trefoil-small.png";

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
                {/* Title Section */}
                <Row className="text-center mb-5">
                    <Col>
                        <h2 className="value-prop-title">Bulletproof Backup for Your Digital Life</h2>
                        <p className="value-prop-subtitle">
                            Vaults that outlast hardware failures, company bankruptcies, and generational changes
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
                                        <div>
                                            <div className="insight-header">
                                                {/* <h4>🔒 The Foundational Security Paradox</h4> */}
                                                <p>Every digital security setup leads to the same impossible questions:</p>
                                            </div>
                                            <div className="foundational-problems-grid">
                                                <div className="foundational-problem">
                                                    <span className="problem-icon">🔐</span>
                                                    <div>
                                                        <strong>Master Password Trap</strong>
                                                        <div className="problem-desc">Where do you store your password manager's master password?</div>
                                                    </div>
                                                </div>
                                                <div className="foundational-problem">
                                                    <span className="problem-icon">📱</span>
                                                    <div>
                                                        <strong>2FA Backup Problem</strong>
                                                        <div className="problem-desc">If you lose your phone, you lose your 2FA codes—and access to your accounts.</div>
                                                    </div>
                                                </div>
                                                <div className="foundational-problem">
                                                    <span className="problem-icon">💎</span>
                                                    <div>
                                                        <strong>Seed Phrase Paradox</strong>
                                                        <div className="problem-desc">Split or copy your seed phrase? Both increase risk.</div>
                                                    </div>
                                                </div>
                                                <div className="foundational-problem">
                                                    <span className="problem-icon">🔑</span>
                                                    <div>
                                                        <strong>Encryption Key Dilemma</strong>
                                                        <div className="problem-desc">Where do you put keys that can't be stored on the device they protect?</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="breakthrough-highlight">
                                                <span className="breakthrough-icon" style={{display:'inline-block',verticalAlign:'middle',marginRight:'0.5em'}}>
                                                    <span role="img" aria-label="target" style={{fontSize: '1.5em', verticalAlign: 'middle'}}>🎯</span>
                                                </span>
                                                <strong>A Safer Way Forward:</strong> Encrypted paper vaults break the loop—safe to duplicate, store anywhere, and always recoverable.
                                            </div>
                                        </div>
                                        {/* <div className="key-benefits refined">
                                            <h4>The Power of Encrypted Paper</h4>
                                            <ul className="benefits-list refined">
                                                <li><span className="benefit-icon">🔒</span> <b>Safe to Duplicate:</b> Make as many backup copies as you want—they're all encrypted.</li>
                                                <li><span className="benefit-icon">🏢</span> <b>Store Anywhere:</b> Safety deposit boxes, home safes, trusted people—your choice.</li>
                                                <li><span className="benefit-icon">🛡️</span> <b>Disaster Proof:</b> No single fire, flood, or loss can lock you out.</li>
                                            </ul>
                                        </div> */}
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
                                                {/* <h4>💎 The Hardware Wallet Paradox</h4> */}
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
                                            <p>Leave secure access for family or trusted people—without giving up control today. Distributed keys keep your assets safe until the time is right.</p>
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
                                                    <span className="quorum-math">Vault + Any 3 keys = Access</span>
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