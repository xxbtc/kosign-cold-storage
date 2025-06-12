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
import HomepagePricing from '../components/HomepagePricing';
import HomepageValueProp from '../components/HomepageValueProp';
import HomepageThreatModeling from '../components/HomepageThreatModeling';
import HomepageHowItWorks from '../components/HomepageHowItWorks';
import HomepageEncryptedPaperBenefits from '../components/HomepageEncryptedPaperBenefits';
import {FaCheck} from 'react-icons/fa';
import Cookies from "universal-cookie";
import {FaTwitter, FaMedium} from 'react-icons/fa';
import HomepageReasonsNew from "../components/HomepageReasonsNew";


function Homepage(props) {

    const navigate      = useNavigate();
    const cookies       = new Cookies();
    const pricingRef    = useRef(null);
    const paperStackRef = useRef(null);

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

        // Intersection Observer for paper stack animation on mobile
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        // Add opened class when element comes into view
                        entry.target.classList.add('stack-opened');
                    } else {
                        // Remove opened class when element goes out of view
                        entry.target.classList.remove('stack-opened');
                    }
                });
            },
            {
                threshold: 0.3, // Trigger when 30% of the element is visible
                rootMargin: '0px 0px -100px 0px' // Trigger slightly before fully in view
            }
        );

        // Observe the paper stack on all screen sizes for cool scroll effect
        if (paperStackRef.current) {
            observer.observe(paperStackRef.current);
        }

        // Cleanup observer on unmount
        return () => {
            if (paperStackRef.current) {
                observer.unobserve(paperStackRef.current);
            }
        };

    }, [props]);

    return (
        <Layout>
            <div className="home-page-navbar">  
                <Navbar loggedIn={false}/>
            </div>
            
            {/* Hero Area */}
            <section className="hero-area">
                
                <Container>
                    <Row className="align-items-center">
                        <Col md={6} lg={6} className="hero-content-col">
                            <div className="hero-badges">
                                <div className="hero-badge-pill">✓ Open source</div>
                                <div className="hero-badge-pill">✓ Non-custodial</div>
                                <div className="hero-badge-pill">✓ 100% Offline</div>
                            </div>
                            <h1 className="hero-title">
                                Foundational Vault for Digital Assets
                            </h1>
                            <p className="hero-subtitle">
                                Store passwords and digital assets offline in a cold storage paper vault. Designed to last generations.
                            </p>
                            
                            {/* Social Proof Bullets */}
                            <div className="hero-proof-bullets">
                                <div className="proof-bullet">
                                    <FaCheck className="proof-icon" />
                                    <span>Back-up critical data</span>
                                </div>
                                <div className="proof-bullet">
                                    <FaCheck className="proof-icon" />
                                    <span>Social recovery & inheritance</span>
                                </div>
                                <div className="proof-bullet">
                                    <FaCheck className="proof-icon" />
                                    <span>Open source unlock app</span>
                                </div>
                            </div>

                            <div className="hero-cta-group">
                                <button className="hero-cta-primary" onClick={() => navigate('/create')}>
                                    Create Your Vault
                                </button>
                            </div>
                        </Col>
                        
                        <Col md={6} lg={6} className="hero-visual-col">
                            <div className="hero-visual">
                                <div className="product-demo" ref={paperStackRef}>
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
            <HomepageValueProp />

            {/* Threat Modeling Section */}
            <HomepageThreatModeling />

            {/* Encrypted Paper Benefits Section
            <HomepageEncryptedPaperBenefits /> */}

            {/* How It Works Section */}
            <HomepageHowItWorks />

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
            <HomepagePricing pricingRef={pricingRef} />

            {/* <section className="testimonials-section">
                <Container>
                    <Row>
                        <Col className="text-center">
                            <h2 className="testimonials-title">Trusted by Security Experts Worldwide</h2>
                            <p className="testimonials-subtitle">See how Kosign is changing digital security</p>
                            <HomepageTestimonials />
                        </Col>
                    </Row>
                </Container>
            </section> */}

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


