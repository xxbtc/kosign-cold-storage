import React, {useEffect, useRef} from 'react'
import { Link , useNavigate, useLocation, useSearchParams, useParams} from 'react-router-dom'
import Layout from "../components/Layout";

import '../style/index.css';
import '../style/homepage.css';
import {Button, Container, Row, Col} from 'react-bootstrap';

import Navbar from '../components/NavbarTop';
import Footer from '../components/Footer';
import CreateVault from "../components/CreateVault";
import {PaymentService} from "../services/PaymentService";

import layerWaves from '../images/layer-waves.svg';
import layerPeaks from '../images/wave-haikei.svg';
import {BsArrowReturnRight} from 'react-icons/bs';
import paperVault from '../images/paper-vault-example.jpg';
import paperKey from '../images/paper-key-example.jpg';
import personWithLock from '../images/personwithlock.png';
import printerqr from '../images/printerqr.png';
import peoplepaper from '../images/happy-people-holding-a-paper-with-a-qr-code.jpg';

import groupQR from '../images/groupqr.png';

import HomepageUseCases from '../components/HomepageUseCases';
import HomepageFAQ from '../components/HomepageFAQ';
import HomepageReasons from '../components/HomepageReasons';
import HomepageTestimonials from '../components/HomepageTestimonials';
import {FaCheck} from 'react-icons/fa';
import Cookies from "universal-cookie";
import {FaTwitter, FaMedium} from 'react-icons/fa';
import HomepageReasonsNew from "../components/HomepageReasonsNew";


function Homepage(props) {

    const navigate      = useNavigate();
    const cookies       = new Cookies();
    const pricingRef    = useRef(null);

    /* const navigate = useNavigate();
     const location = useLocation();

     const [searchParams, setSearchParams] = useSearchParams();
     const payment_intent                = searchParams.get("payment_intent");
     const payment_intent_client_secret  = searchParams.get("payment_intent_client_secret");

     if (payment_intent) {
         console.log('payment recevied');
         PaymentService.getIntent(payment_intent_client_secret).then((response)=>{
             console.log('payment intent response is ', response);
         }).catch(error => {
             console.log('payment intent response ERROR');
             console.log(error.response.data);
             console.log(error.response.status);
             console.log(error.response.headers);
         });
     }
 */

    useEffect(() => {
        if (props.showPricing){
            pricingRef.current.scrollIntoView();
            return;
        }
        window.scrollTo(0, 0);

        cookies.remove('kosign_vaultname');
        cookies.remove('kosign_threshold');
        cookies.remove('kosign_shares');
        cookies.remove('kosign_vaultdescription');

    }, [props]);

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
        <Layout>
            <Navbar />
            
            {/* Hero Area */}
            <section className="hero-area">
                <Container>
                    <Row className="align-items-center">
                        <Col lg={6} className="hero-content-col">
                            <div className="hero-badges">
                                <div className="hero-badge-pill">✓ No Cloud</div>
                                <div className="hero-badge-pill">✓ No Custodians</div>
                                <div className="hero-badge-pill">✓ 100% Offline</div>
                            </div>
                            <h1 className="hero-title">
                                The Foundational Backup for Your Digital Life
                            </h1>
                            <p className="hero-subtitle">
                                Create passwordless vaults secured by distributed physical keys. No master passwords to remember, 
                                no single points of failure. Designed for emergency access and inheritance planning.
                            </p>
                            
                            {/* Social Proof Bullets */}
                            <div className="hero-proof-bullets">
                                <div className="proof-bullet">
                                    <FaCheck className="proof-icon" />
                                    <span>Open source cold storage technology</span>
                                </div>
                                <div className="proof-bullet">
                                    <FaCheck className="proof-icon" />
                                    <span>Distributed keys for social recovery</span>
                                </div>
                                <div className="proof-bullet">
                                    <FaCheck className="proof-icon" />
                                    <span>Designed for secure inheritance</span>
                                </div>
                            </div>

                            <div className="hero-cta-group">
                                <button className="hero-cta-primary" onClick={() => navigate('/create')}>
                                    Create Your Vault
                                </button>
                                <button className="hero-cta-secondary" onClick={() => navigate('/demo')}>
                                    Watch Demo
                                </button>
                            </div>
                        </Col>
                        
                        <Col lg={6} className="hero-visual-col">
                            <div className="hero-visual">
                                <div className="product-demo">
                                    <div className="paper-stack">
                                        <img src={paperKey} alt="Kosign Paper Key 2" className="demo-image page-3" />
                                        <img src={paperKey} alt="Kosign Paper Key 1" className="demo-image page-2" />
                                        <img src={paperVault} alt="Kosign Paper Vault" className="demo-image page-1" />
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Core Value Proposition */}
            <section className="value-prop-section">
                <Container>
                    <Row className="text-center mb-5">
                        <Col>
                            <h2 className="value-prop-title">Secure Your Digital Legacy Forever</h2>
                            <p className="value-prop-subtitle">
                                Distributed paper vaults that outlast hardware failures, company bankruptcies, and generational changes
                            </p>
                            <div className="open-source-guarantee">
                                <div className="guarantee-badge">
                                    <span className="badge-icon">⚡</span>
                                    <span className="badge-text">
                                        <strong>Forever Guarantee:</strong> Unlock tool is <a href="https://github.com/xxbtc/kosign-unlock" target="_blank" rel="noopener noreferrer" className="github-link">open source on GitHub</a> - your vaults work even if Kosign disappears
                                    </span>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    
                    {/* Accordion Cards */}
                    <Row className="justify-content-center">
                        <Col lg={10} xl={10}>
                            <div className="value-accordion">
                                {/* Foundation Card */}
                                <div className="accordion-item active" data-accordion="foundation">
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
                                                            <h5>"Where do I write down my password manager's master password?"</h5>
                                                            <p>Paper in drawer? That's a single point of failure.<br/>
                                                            Another password manager? Then where's THAT password?</p>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="scenario-card">
                                                        <div className="scenario-icon">📱</div>
                                                        <div className="scenario-content">
                                                            <h5>"Where do I store my 2FA backup codes?"</h5>
                                                            <p>In my password manager? But I need 2FA to GET INTO my password manager!<br/>
                                                            Written down on a post-it? That's unencrypted and a single point of failure.</p>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="scenario-card">
                                                        <div className="scenario-icon">💀</div>
                                                        <div className="scenario-content">
                                                            <h5>"What if I get hit by a bus tomorrow?"</h5>
                                                            <p>My family needs my crypto, photos, and accounts.<br/>
                                                            But giving them passwords now makes everything insecure.</p>
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
                                                        <span className="answer-icon">👨‍👩‍👧‍👦</span>
                                                        <span className="answer-text">Family gets vault copies but needs multiple people to open them</span>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="breakthrough-highlight">
                                                <strong>💡 The Result:</strong> Your family and friends become part of your security foundation, not a weakness. Distributed keys ensure no single point of failure.
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
                                                <h3>Inheritance Without Trust</h3>
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
                                                        <span className="quorum-math">Any 3 keys = Access</span>
                                                        <span className="quorum-security">No single person can access alone</span>
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

            {/* How It Works Section */}
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
                                {/* <img src={personWithLock} alt="Create vault" className="step-image" /> */}
                            </div>
                        </Col>
                        
                        <Col xl={4} lg={4} md={6} sm={12} className="mb-4">
                            <div className="step-card">
                                <div className="step-number">2</div>
                                <h3>Print</h3>
                                <p>Print your vault and keys. Physically distribute copies across locations or trusted people/services.</p>
                                {/* <img src={printerqr} alt="Print shares" className="step-image" /> */}
                            </div>
                        </Col>
                        
                        <Col xl={4} lg={4} md={6} sm={12} className="mb-4">
                            <div className="step-card">
                                <div className="step-number">3</div>
                                <h3>Recover</h3>
                                <p>Combine vault + keys to recover assets. Designed for emergencies, inheritance, and long term storage.</p>
                                {/* <img src={groupQR} alt="Recover vault" className="step-image" /> */}
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Trusted By / Partners Section */}
            <section className="partners-section">
                <Container>
                    <Row>
                        <Col className="text-center">
                            <p className="partners-label">Trusted by security-conscious individuals and families worldwide</p>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Pricing Section */}
            <section className="pricing-section" ref={pricingRef}>
                <Container>
                    <Row>
                        <Col className="text-center">
                            <h2 className="pricing-title">Get Started Today</h2>
                            <p className="pricing-subtitle">Choose the plan that fits your security needs</p>
                        </Col>
                    </Row>
                    
                    <Row className="pricing-grid justify-content-center">
                        <Col xl={4} lg={5} md={8} sm={12} className="mb-4">
                            <div className="pricing-card featured">
                                <div className="pricing-header">
                                    <h3>Complete Protection</h3>
                                    <div className="price">Free<span> to start</span></div>
                                </div>
                                <ul className="pricing-features">
                                    <li>✓ Unlimited vaults</li>
                                    <li>✓ Up to 10 shares per vault</li>
                                    <li>✓ Inheritance planning templates</li>
                                    <li>✓ Secure password & crypto storage</li>
                                    <li>✓ Community support</li>
                                    <li>✓ Open source & auditable</li>
                                </ul>
                                <button className="pricing-cta primary" onClick={() => navigate('/create')}>
                                    Create Your First Vault
                                </button>
                                <p className="pricing-note">No credit card required • Upgrade when you need premium features</p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Testimonials Section */}
            <section className="testimonials-section">
                <Container>
                    <Row>
                        <Col className="text-center">
                            <h2 className="testimonials-title">Trusted by Security Experts Worldwide</h2>
                            <p className="testimonials-subtitle">See how Kosign is changing digital security</p>
                            <HomepageTestimonials />
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* FAQ Section */}
            <section className="faq-section">
                <Container>
                    <Row>
                        <Col className="text-center">
                            <h2 className="faq-title">Your Questions Answered</h2>
                            <HomepageFAQ />
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Final CTA Section */}
            <section className="final-cta-section">
                <Container>
                    <Row>
                        <Col className="text-center">
                            <h2 className="final-cta-title">Don't Wait Until It's Too Late</h2>
                            <p className="final-cta-desc">
                                Every day without proper backup is a day your digital life is at risk. 
                                <br/>
                                Secure your passwords, crypto, and digital legacy in 10 minutes.
                            </p>
                            <div className="final-cta-buttons">
                                <button className="final-cta-primary" onClick={() => navigate('/create')}>
                                    Create Your Vault Now
                                </button>
                                <button className="final-cta-secondary" onClick={() => navigate('/demo')}>
                                    Watch Demo First
                                </button>
                            </div>
                            <div className="final-cta-guarantee">
                                <span className="guarantee-icon">✓</span>
                                <span>Free to start • Open source • No vendor lock-in</span>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            <Footer />
        </Layout>
    );
}

export default Homepage;


