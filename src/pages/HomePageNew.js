import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { FaDownload, FaGithub, FaShieldAlt, FaLaptop, FaCheck, FaCode, FaUsers, FaStar } from 'react-icons/fa';
import { MdOfflineBolt, MdVerifiedUser, MdSecurity } from 'react-icons/md';
import HomepageFAQ from '../components/HomepageFAQ';

// Import images from old homepage
import paperVault from "../images/paper-vault-example.jpg";
import paperKey from "../images/paper-key-example.jpg";
import Layout from "../components/Layout";
import Footer from "../components/Footer";
import AISummarySection from "../components/AISummarySection";
import NavbarTop from "../components/NavbarTop";
import Cookies from 'universal-cookie';

import '../style/index.css';
import '../style/homepage.css';
import '../style/homepage-new.css';

function HomePageNew(props) {
    const navigate = useNavigate();
    const cookies = new Cookies();
    const paperStackRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate');
                    }
                });
            },
            { threshold: 0.3 }
        );

        if (paperStackRef.current) {
            observer.observe(paperStackRef.current);
        }

        // Cleanup observer on unmount
        return () => {
            if (paperStackRef.current) {
                observer.unobserve(paperStackRef.current);
            }
        };
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
        cookies.remove('kosign_vaultname');
        cookies.remove('kosign_vaultdesc');
        cookies.remove('kosign_totalShareholders');
        cookies.remove('kosign_consensus');
    }, []);

    return (
        <Layout>
            <div className="home-page-navbar">  
                <NavbarTop loggedIn={false}/>
            </div>
            
            {/* Hero Section - Primary Functions */}
            <section className="hero-section-new">
                <Container>
                    <Row className="align-items-center min-vh-100">
                        <Col lg={6} className="hero-content">
                            <div className="hero-badges">
                                <div className="hero-badge-pill">✓ Open source</div>
                                <div className="hero-badge-pill">✓ Non-custodial</div>
                                <div className="hero-badge-pill">✓ Cold Storage</div>
                            </div>
                            
                            <h1 className="hero-title-new">
                                Foundational Password Vault
                            </h1>
                            
                            <p className="hero-subtitle-new">
                                Backup your secrets in a distributed paper vault designed for disaster recovery and inheritance.
                            </p>

                            <div className="hero-proof-points">
                                <div className="proof-bullet">
                                    <FaCheck className="proof-icon" />
                                    <span>Back-up critical data on encrypted paper or USB</span>
                                </div>
                                <div className="proof-bullet">
                                    <FaCheck className="proof-icon" />
                                    <span>100% open source (run it on your own!)</span>
                                </div>
                                <div className="proof-bullet">
                                    <FaCheck className="proof-icon" />
                                    <span>Enable social recovery & inheritance</span>
                                </div>
                            </div>

                            <div className="hero-cta-group-new">
                                <button className="hero-cta-primary-new" onClick={() => navigate('/create')}>
                                    Create a Vault
                                </button>
                                <button className="hero-cta-secondary-new" onClick={() => navigate('/unlock')}>
                                    Unlock a Vault
                                </button>
                            </div>

                            <div className="hero-github-stats">
                                <div className="github-stat">
                                    <FaShieldAlt className="me-2" />
                                    Free Forever
                                </div>
                                <a href="https://github.com/xxbtc/kosign" target="_blank" rel="noopener noreferrer" className="github-stat">
                                    <FaGithub className="me-2" />
                                    Open Source
                                </a>
                                <div className="github-stat">
                                    <FaStar className="me-2" />
                                    MIT License
                                </div>
                            </div>
                        </Col>
                        
                        <Col lg={6} className="hero-visual">
                            <div className="hero-visual-new">
                                <div className="product-demo-new" ref={paperStackRef}>
                                    <div className="paper-stack-new">
                                        <img src={paperKey} alt="Kosign Paper Key 2" className="demo-image-new page-3" />
                                        <img src={paperKey} alt="Kosign Paper Key 1" className="demo-image-new page-2" />
                                        <img src={paperVault} alt="Kosign Paper Vault" className="demo-image-new page-1" />
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* How It Works - Workflow */}
            <section className="workflow-section">
                <Container>
                    <Row>
                        <Col className="text-center">
                            <h2 className="section-title-new">Build Your Recovery Network</h2>
                            <p className="section-subtitle-new">Create your secure distributed vault</p>
                        </Col>
                    </Row>
                    
                    <Row className="steps-grid">
                        <Col xl={4} lg={4} md={6} sm={12} className="mb-4">
                            <div className="step-card">
                                <div className="step-number">1</div>
                                <h3>Go Offline</h3>
                                <p>Add data, mint keys, and choose your unlock threshold (e.g. 3-of-5).</p>
                            </div>
                        </Col>
                        
                        <Col xl={4} lg={4} md={6} sm={12} className="mb-4">
                            <div className="step-card">
                                <div className="step-number">2</div>
                                <h3>Distribute</h3>
                                <p>Distribute copies on paper or USB, in different locations or with trusted people. </p>
                            </div>
                        </Col>
                        
                        <Col xl={4} lg={4} md={6} sm={12} className="mb-4">
                            <div className="step-card">
                                <div className="step-number">3</div>
                                <h3>Recover</h3>
                                <p>Combine vault + keys to recover your data.</p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>


            {/* Use Cases */}
            <section className="use-cases-section">
                <Container>
                    <Row>
                        <Col className="text-center">
                            <h2 className="section-title-new">Real-World Use Cases</h2>
                            <p className="section-subtitle-new">
                                Kosign solves security challenges across personal, family, and professional scenarios.
                            </p>
                        </Col>
                    </Row>
                    
                    {/* Personal Security */}
                    <Row className="use-case-category">
                        <Col className="text-center mb-4">
                            <h3 className="category-title">
                                <FaShieldAlt className="category-icon" />
                                Personal Security
                            </h3>
                        </Col>
                    </Row>
                    <Row className="use-case-examples">
                        <Col md={6} className="mb-4">
                            <div className="use-case-card">
                                <h4>Password Manager Backup</h4>
                                <p>Where do you store your password manager's master password? Writing it down creates vulnerability, memorizing it creates risk of loss.</p>
                                <div className="kosign-solution">
                                    <strong>With Kosign:</strong> Encrypted backup with distributed recovery - no single point of failure.
                                </div>
                            </div>
                        </Col>
                        <Col md={6} className="mb-4">
                            <div className="use-case-card">
                                <h4>Crypto Wallet Seeds</h4>
                                <p>Hardware wallets solve for secure signing of transactions, but seed phrase backups on paper are vulnerable to theft or loss.</p>
                                <div className="kosign-solution">
                                    <strong>With Kosign:</strong> Encrypted seed storage with social recovery - keep copies across different locations.
                                </div>
                            </div>
                        </Col>
                        <Col md={6} className="mb-4">
                            <div className="use-case-card">
                                <h4>2FA Circular Dependency</h4>
                                <p>Storing your Authy password in your password manager creates a circular dependency - you need 2FA to access the password manager, but need the password manager to access 2FA.</p>
                                <div className="kosign-solution">
                                    <strong>With Kosign:</strong> Secure offline backup of 2FA seeds and recovery codes breaks the circular dependency.
                                </div>
                            </div>
                        </Col>
                        <Col md={6} className="mb-4">
                            <div className="use-case-card">
                                <h4>Important Documents</h4>
                                <p>Critical personal records need secure backup but cloud storage has privacy risks.</p>
                                <div className="kosign-solution">
                                    <strong>With Kosign:</strong> Offline encrypted storage with distributed access for maximum privacy.
                                </div>
                            </div>
                        </Col>
                    </Row>

                    {/* Family & Inheritance */}
                    <Row className="use-case-category mt-5">
                        <Col className="text-center mb-4">
                            <h3 className="category-title">
                                <FaUsers className="category-icon" />
                                Family & Inheritance
                            </h3>
                        </Col>
                    </Row>
                    <Row className="use-case-examples">
                        <Col md={6} className="mb-4">
                            <div className="use-case-card">
                                <h4>Secure Inheritance</h4>
                                <p>"Just give your seed phrase to your spouse" creates technical burden and single points of failure. What if something happens to them too?</p>
                                <div className="kosign-solution">
                                    <strong>With Kosign:</strong> Distribute shares among multiple family members or lawyers - no one person bears the full responsibility.
                                </div>
                            </div>
                        </Col>
                        <Col md={6} className="mb-4">
                            <div className="use-case-card">
                                <h4>Family Emergency Access</h4>
                                <p>Medical emergencies, travel incidents, or unexpected situations require trusted family access to critical accounts.</p>
                                <div className="kosign-solution">
                                    <strong>With Kosign:</strong> Pre-planned emergency access without compromising day-to-day security.
                                </div>
                            </div>
                        </Col>
                    </Row>

                    {/* Professional */}
                    <Row className="use-case-category mt-5">
                        <Col className="text-center mb-4">
                            <h3 className="category-title">
                                <MdSecurity className="category-icon" />
                                Professional Use
                            </h3>
                        </Col>
                    </Row>
                    <Row className="use-case-examples">
                        <Col md={6} className="mb-4">
                            <div className="use-case-card">
                                <h4>Team Shared Secrets</h4>
                                <p>API keys, database passwords, and service credentials need secure sharing without creating security vulnerabilities.</p>
                                <div className="kosign-solution">
                                    <strong>With Kosign:</strong> Break-glass emergency backup for critical team credentials when primary systems fail.
                                </div>
                            </div>
                        </Col>
                        <Col md={6} className="mb-4">
                            <div className="use-case-card">
                                <h4>Air-Gapped Operations</h4>
                                <p>Some organizations require completely offline credential storage for sensitive operations or classified environments.</p>
                                <div className="kosign-solution">
                                    <strong>With Kosign:</strong> True offline operation with no network dependencies for maximum security isolation.
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Open Source Section */}
            <section className="open-source-section">
                <Container>
                    <Row>
                        <Col lg={6}>
                            <h2 className="section-title-new">Run It Yourself</h2>
                            <p className="section-subtitle-new">
                                Kosign is open source. Clone the repository and run it locally offline
                                for maximum security and control.
                            </p>
                            
                            <div className="open-source-cta">
                                <a href="https://github.com/xxbtc/kosign" target="_blank" rel="noopener noreferrer" className="github-cta-btn">
                                    <FaGithub className="me-2" />
                                    View Source on GitHub
                                </a>
                            </div>
                            
                        </Col>
                        
                        <Col lg={6}>
                            <div className="terminal-window">
                                <div className="terminal-header">
                                    <div className="terminal-buttons">
                                        <span className="terminal-button red"></span>
                                        <span className="terminal-button yellow"></span>
                                        <span className="terminal-button green"></span>
                                    </div>
                                    <span className="terminal-title">Terminal</span>
                                </div>
                                <div className="terminal-body">
                                    <div className="terminal-line">
                                        <span className="terminal-prompt">$</span>
                                        <span className="terminal-command">git clone https://github.com/xxbtc/kosign.git</span>
                                    </div>
                                    <div className="terminal-line">
                                        <span className="terminal-output">Cloning into 'kosign'...</span>
                                    </div>
                                    <div className="terminal-line">
                                        <span className="terminal-prompt">$</span>
                                        <span className="terminal-command">cd kosign</span>
                                    </div>
                                    <div className="terminal-line">
                                        <span className="terminal-prompt">$</span>
                                        <span className="terminal-command">npm install</span>
                                    </div>
                                    <div className="terminal-line">
                                        <span className="terminal-output">Installing dependencies...</span>
                                    </div>
                                    <div className="terminal-line">
                                        <span className="terminal-comment"># Now disconnect from internet for cold storage</span>
                                    </div>
                                    <div className="terminal-line">
                                        <span className="terminal-prompt">$</span>
                                        <span className="terminal-command">npm start</span>
                                    </div>
                                    <div className="terminal-line">
                                        <span className="terminal-output">✓ Kosign running at http://localhost:3000</span>
                                    </div>
                                    <div className="terminal-line">
                                        <span className="terminal-output">✓ Fully offline and secure</span>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* FAQ Section */}
            <section className="faq-section">
                <Container>
                    <Row>
                        <Col className="text-center">
                            <HomepageFAQ />
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Final CTA - Download Focus */}
            <section className="final-cta-section-new">
                <Container>
                    <Row>
                        <Col className="text-center">
                            <h2 className="final-cta-title-new">Get Started</h2>
                            <p className="final-cta-desc-new">
                                Use Kosign directly in your browser or download the source code to run locally. 
                            </p>
                            
                            <div className="final-cta-buttons-new">
                                <button className="final-cta-primary-new" onClick={() => navigate('/create')}>
                                    Create a Vault
                                </button>
                                <button className="final-cta-secondary-new" onClick={() => navigate('/unlock')}>
                                    Unlock a Vault
                                </button>
                            </div>
                            
                            <div className="final-cta-secondary-actions">
                                <a href="https://github.com/xxbtc/kosign" target="_blank" rel="noopener noreferrer" className="secondary-link">
                                    <FaGithub className="me-2" />
                                    View Source Code
                                </a>
                            </div>
                            
                        </Col>
                    </Row>
                </Container>
            </section>

            <AISummarySection />
            <Footer />
        </Layout>
    );
}

export default HomePageNew;
