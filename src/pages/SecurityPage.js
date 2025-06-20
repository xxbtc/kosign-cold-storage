import React, { useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Layout from "../components/Layout";
import { Container, Row, Col } from 'react-bootstrap';
import Navbar from '../components/NavbarTop';
import Footer from '../components/Footer';

import '../style/index.css';
import '../style/homepage.css';
import '../style/security.css';
import { AnalyticsService } from '../services/AnalyticsService';

function SecurityPage() {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Handle expandable sections
    useEffect(() => {
        const handleAccordionClick = (e) => {
            const accordionHeader = e.target.closest('.security-accordion-header');
            if (accordionHeader) {
                e.preventDefault();
                const accordionItem = accordionHeader.closest('.security-accordion-item');
                const isCurrentlyActive = accordionItem.classList.contains('active');
                
                // Close all other accordion items
                document.querySelectorAll('.security-accordion-item').forEach(item => {
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
            <div className="home-page-navbar">  
                <Navbar loggedIn={false}/>
            </div>
            
            {/* Hero Section */}
            <section className="security-hero-section">
                <Container>
                    <Row className="text-center">
                        <Col>
                            <h1 className="security-hero-title">Complete Security Analysis</h1>
                            <p className="security-hero-subtitle">
                                Comprehensive threat modeling and mitigation strategies for digital asset protection
                            </p>
                            <div className="security-hero-stats">
                                <div className="security-stat">
                                    <span className="stat-number">8+</span>
                                    <span className="stat-label">Threat Categories</span>
                                </div>
                                <div className="security-stat">
                                    <span className="stat-number">100%</span>
                                    <span className="stat-label">Coverage</span>
                                </div>
                                <div className="security-stat">
                                    <span className="stat-number">AES-256</span>
                                    <span className="stat-label">Encryption</span>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Threat Matrix Section */}
            <section className="security-threats-section">
                <Container>
                    <Row>
                        <Col>
                            <h2 className="security-section-title">Threat Analysis Matrix</h2>
                            <p className="security-section-subtitle">
                                Every attack vector analyzed with specific mitigation strategies
                            </p>
                        </Col>
                    </Row>

                    <Row className="justify-content-center">
                        <Col lg={10} xl={10}>
                            <div className="security-accordion">
                                
                                {/* Physical Disasters */}
                                <div className="security-accordion-item high-risk" data-threat="physical">
                                    <div className="security-accordion-header">
                                        <div className="security-threat-preview">
                                            <div className="security-threat-icon">🔥</div>
                                            <div className="security-threat-details">
                                                <h3>Physical Disasters</h3>
                                                <p>Fire, flood, earthquake, theft, or other physical destruction of storage media</p>
                                                <div className="threat-metrics">
                                                    <span className="risk-level high">High Risk</span>
                                                    <span className="protection-level complete">Complete Protection</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="security-toggle">
                                            <span className="toggle-text">Technical Details</span>
                                            <span className="toggle-icon">↓</span>
                                        </div>
                                    </div>
                                    
                                    <div className="security-accordion-body">
                                        <div className="security-analysis">
                                            <div className="threat-breakdown">
                                                <h4>🎯 Attack Scenarios</h4>
                                                <ul className="attack-scenarios">
                                                    <li><strong>Natural Disasters:</strong> House fires, floods, earthquakes destroy storage locations</li>
                                                    <li><strong>Theft/Burglary:</strong> Physical theft of safes, storage devices, or documents</li>
                                                    <li><strong>Regional Events:</strong> Wars, civil unrest, or infrastructure collapse</li>
                                                    <li><strong>Accidental Destruction:</strong> Water damage, electrical fires, physical accidents</li>
                                                </ul>
                                            </div>
                                            
                                            <div className="kosign-mitigation">
                                                <h4>🛡️ Kosign Protection Strategy</h4>
                                                <div className="mitigation-points">
                                                    <div className="mitigation-point">
                                                        <span className="point-icon">🌍</span>
                                                                                                <div>
                                            <strong>Multiple Locations:</strong> Store vault copies in different places—home safe, bank vault, trusted family—to prevent single points of failure
                                        </div>
                                                    </div>
                                                    <div className="mitigation-point">
                                                        <span className="point-icon">🔒</span>
                                                        <div>
                                                            <strong>Safe Duplication:</strong> Encryption makes unlimited backup copies secure—create as many as needed
                                                        </div>
                                                    </div>
                                                    <div className="mitigation-point">
                                                        <span className="point-icon">🏦</span>
                                                        <div>
                                                            <strong>Multiple Storage Types:</strong> Bank vaults, home safes, trusted individuals, safety deposit boxes across institutions
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="scenario-example">
                                                <h5>Real-World Scenario</h5>
                                                <p><strong>Event:</strong> Wildfire destroys your home and personal safe containing crypto seed phrases.</p>
                                                <p><strong>Traditional Solution Impact:</strong> Total loss—seeds are gone forever, funds are unrecoverable.</p>
                                                <p><strong>Kosign Protection Result:</strong> Vault copies remain safe at bank, trusted family members, and overseas storage. Recovery proceeds normally.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Digital Attacks */}
                                <div className="security-accordion-item high-risk" data-threat="digital">
                                    <div className="security-accordion-header">
                                        <div className="security-threat-preview">
                                            <div className="security-threat-icon">💻</div>
                                            <div className="security-threat-details">
                                                <h3>Digital Attacks</h3>
                                                <p>Hacking, malware, surveillance, or digital compromise of stored data</p>
                                                <div className="threat-metrics">
                                                    <span className="risk-level high">High Risk</span>
                                                    <span className="protection-level complete">Complete Protection</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="security-toggle">
                                            <span className="toggle-text">Technical Details</span>
                                            <span className="toggle-icon">↓</span>
                                        </div>
                                    </div>
                                    
                                    <div className="security-accordion-body">
                                        <div className="security-analysis">
                                            <div className="threat-breakdown">
                                                <h4>🎯 Attack Scenarios</h4>
                                                <ul className="attack-scenarios">
                                                    <li><strong>Targeted Hacking:</strong> APT groups, nation-states, or sophisticated attackers</li>
                                                    <li><strong>Mass Data Breaches:</strong> Cloud storage, email providers, or service compromises</li>
                                                    <li><strong>Malware/Ransomware:</strong> Device infections encrypting or stealing data</li>
                                                    <li><strong>Surveillance:</strong> Government or corporate monitoring of digital activity</li>
                                                </ul>
                                            </div>
                                            
                                            <div className="kosign-mitigation">
                                                <h4>🛡️ Kosign Protection Strategy</h4>
                                                <div className="mitigation-points">
                                                    <div className="mitigation-point">
                                                        <span className="point-icon">🔐</span>
                                                                                                <div>
                                            <strong>AES-256 Encryption:</strong> Bank-standard encryption that would take billions of years to crack with current technology
                                        </div>
                                                    </div>
                                                    <div className="mitigation-point">
                                                        <span className="point-icon">💾</span>
                                                        <div>
                                                            <strong>Universal Storage:</strong> Paper, USB drives, cloud storage—all equally secure when encrypted
                                                        </div>
                                                    </div>
                                                    <div className="mitigation-point">
                                                        <span className="point-icon">🌐</span>
                                                        <div>
                                                            <strong>Offline Independence:</strong> No network dependencies—works with or without internet infrastructure
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="scenario-example">
                                                <h5>Real-World Scenario</h5>
                                                <p><strong>Event:</strong> State-sponsored hackers breach major cloud providers exposing billions of files.</p>
                                                <p><strong>Traditional Solution Impact:</strong> Unencrypted backups, passwords, and keys are immediately compromised.</p>
                                                <p><strong>Kosign Protection Result:</strong> Your encrypted vaults remain secure whether stored on paper, cloud, or compromised services. Attackers get meaningless encrypted data.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Personal Incapacity */}
                                <div className="security-accordion-item medium-risk" data-threat="incapacity">
                                    <div className="security-accordion-header">
                                        <div className="security-threat-preview">
                                            <div className="security-threat-icon">🏥</div>
                                            <div className="security-threat-details">
                                                <h3>Personal Incapacity</h3>
                                                <p>Death, illness, memory loss, or other inability to access accounts</p>
                                                <div className="threat-metrics">
                                                    <span className="risk-level medium">Medium Risk</span>
                                                    <span className="protection-level complete">Complete Protection</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="security-toggle">
                                            <span className="toggle-text">Technical Details</span>
                                            <span className="toggle-icon">↓</span>
                                        </div>
                                    </div>
                                    
                                    <div className="security-accordion-body">
                                        <div className="security-analysis">
                                            <div className="threat-breakdown">
                                                <h4>🎯 Attack Scenarios</h4>
                                                <ul className="attack-scenarios">
                                                    <li><strong>Sudden Death:</strong> Accidents, medical emergencies, or unexpected death</li>
                                                    <li><strong>Cognitive Decline:</strong> Dementia, Alzheimer's, or memory loss</li>
                                                    <li><strong>Medical Incapacity:</strong> Coma, severe illness, or temporary incapacitation</li>
                                                    <li><strong>Legal Restrictions:</strong> Imprisonment, court orders, or legal incapacity</li>
                                                </ul>
                                            </div>
                                            
                                            <div className="kosign-mitigation">
                                                <h4>🛡️ Kosign Protection Strategy</h4>
                                                <div className="mitigation-points">
                                                    <div className="mitigation-point">
                                                        <span className="point-icon">👥</span>
                                                        <div>
                                                            <strong>Social Recovery:</strong> Distribute recovery keys among trusted family, friends, and advisors
                                                        </div>
                                                    </div>
                                                    <div className="mitigation-point">
                                                        <span className="point-icon">🔢</span>
                                                        <div>
                                                            <strong>Quorum Systems:</strong> Require multiple people (e.g., 3 of 5) to cooperate for recovery—no single point of failure
                                                        </div>
                                                    </div>
                                                    <div className="mitigation-point">
                                                        <span className="point-icon">⚖️</span>
                                                        <div>
                                                            <strong>Clear Protocols:</strong> Documented procedures prevent family disputes and ensure smooth inheritance
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="scenario-example">
                                                <h5>Real-World Scenario</h5>
                                                <p><strong>Event:</strong> Car accident leaves you in a month-long coma, family needs access to funds.</p>
                                                <p><strong>Traditional Solution Impact:</strong> Assets locked indefinitely, family cannot access needed funds for medical expenses.</p>
                                                <p><strong>Kosign Protection Result:</strong> Spouse + two siblings combine their keys to unlock vault, providing immediate family access while maintaining security.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Government/Legal Seizure */}
                                <div className="security-accordion-item medium-risk" data-threat="seizure">
                                    <div className="security-accordion-header">
                                        <div className="security-threat-preview">
                                            <div className="security-threat-icon">⚖️</div>
                                            <div className="security-threat-details">
                                                <h3>Government/Legal Seizure</h3>
                                                <p>Asset forfeiture, court orders, border searches, or legal seizure of property</p>
                                                <div className="threat-metrics">
                                                    <span className="risk-level medium">Medium Risk</span>
                                                    <span className="protection-level strong">Strong Protection</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="security-toggle">
                                            <span className="toggle-text">Technical Details</span>
                                            <span className="toggle-icon">↓</span>
                                        </div>
                                    </div>
                                    
                                    <div className="security-accordion-body">
                                        <div className="security-analysis">
                                            <div className="threat-breakdown">
                                                <h4>🎯 Attack Scenarios</h4>
                                                <ul className="attack-scenarios">
                                                    <li><strong>Civil Asset Forfeiture:</strong> Government seizure of property without conviction</li>
                                                    <li><strong>Border Searches:</strong> Device confiscation and forced disclosure at borders</li>
                                                    <li><strong>Court Orders:</strong> Legal mandates to surrender access to digital assets</li>
                                                    <li><strong>Emergency Powers:</strong> Government use of emergency authorities to freeze assets</li>
                                                </ul>
                                            </div>
                                            
                                            <div className="kosign-mitigation">
                                                <h4>🛡️ Kosign Protection Strategy</h4>
                                                <div className="mitigation-points">
                                                    <div className="mitigation-point">
                                                        <span className="point-icon">🌍</span>
                                                        <div>
                                                            <strong>Jurisdictional Distribution:</strong> Store vault copies across multiple countries and legal jurisdictions
                                                        </div>
                                                    </div>
                                                    <div className="mitigation-point">
                                                        <span className="point-icon">🔒</span>
                                                        <div>
                                                            <strong>Plausible Deniability:</strong> Encrypted vaults cannot prove what they contain—could be any data
                                                        </div>
                                                    </div>
                                                    <div className="mitigation-point">
                                                        <span className="point-icon">👥</span>
                                                        <div>
                                                            <strong>Distributed Control:</strong> No single location or person has complete access to compromise
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="scenario-example">
                                                <h5>Real-World Scenario</h5>
                                                <p><strong>Event:</strong> Government freezes your assets and confiscates devices during investigation.</p>
                                                <p><strong>Traditional Solution Impact:</strong> Hardware wallets, bank accounts, and local storage all seized and accessible.</p>
                                                <p><strong>Kosign Protection Result:</strong> Vault copies in other countries remain untouchable. Distributed keys with international contacts allow eventual recovery.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Vendor Lock-in */}
                                <div className="security-accordion-item low-risk" data-threat="vendor">
                                    <div className="security-accordion-header">
                                        <div className="security-threat-preview">
                                            <div className="security-threat-icon">🏢</div>
                                            <div className="security-threat-details">
                                                <h3>Vendor Lock-in</h3>
                                                <p>Company bankruptcy, service shutdown, or technology obsolescence</p>
                                                <div className="threat-metrics">
                                                    <span className="risk-level low">Low Risk</span>
                                                    <span className="protection-level complete">Complete Protection</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="security-toggle">
                                            <span className="toggle-text">Technical Details</span>
                                            <span className="toggle-icon">↓</span>
                                        </div>
                                    </div>
                                    
                                    <div className="security-accordion-body">
                                        <div className="security-analysis">
                                            <div className="threat-breakdown">
                                                <h4>🎯 Attack Scenarios</h4>
                                                <ul className="attack-scenarios">
                                                    <li><strong>Company Bankruptcy:</strong> Service providers go out of business unexpectedly</li>
                                                    <li><strong>Service Changes:</strong> Terms of service changes, pricing increases, or feature removal</li>
                                                    <li><strong>Technology Obsolescence:</strong> Formats become unreadable, software becomes unavailable</li>
                                                    <li><strong>Corporate Acquisition:</strong> New owners change or discontinue services</li>
                                                </ul>
                                            </div>
                                            
                                            <div className="kosign-mitigation">
                                                <h4>🛡️ Kosign Protection Strategy</h4>
                                                <div className="mitigation-points">
                                                    <div className="mitigation-point">
                                                        <span className="point-icon">📖</span>
                                                        <div>
                                                            <strong>Open Source Code:</strong> Complete unlock tool available on GitHub forever—no proprietary dependencies
                                                        </div>
                                                    </div>
                                                    <div className="mitigation-point">
                                                        <span className="point-icon">🔧</span>
                                                        <div>
                                                            <strong>Standard Algorithms:</strong> Uses documented encryption that any developer can implement
                                                        </div>
                                                    </div>
                                                    <div className="mitigation-point">
                                                        <span className="point-icon">🌍</span>
                                                        <div>
                                                            <strong>Community Maintained:</strong> Multiple independent implementations ensure perpetual access
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="scenario-example">
                                                <h5>Real-World Scenario</h5>
                                                <p><strong>Event:</strong> Kosign.xyz shuts down permanently and website disappears.</p>
                                                <p><strong>Traditional Solution Impact:</strong> Proprietary solutions become inaccessible, data locked forever.</p>
                                                <p><strong>Kosign Protection Result:</strong> Vault unlock code is public on GitHub. Community maintains tools. Any programmer can help access your data.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Data Corruption */}
                                <div className="security-accordion-item medium-risk" data-threat="corruption">
                                    <div className="security-accordion-header">
                                        <div className="security-threat-preview">
                                            <div className="security-threat-icon">💽</div>
                                            <div className="security-threat-details">
                                                <h3>Data Corruption/Media Degradation</h3>
                                                <p>Storage media failure, file corruption, or gradual data degradation over time</p>
                                                <div className="threat-metrics">
                                                    <span className="risk-level medium">Medium Risk</span>
                                                    <span className="protection-level strong">Strong Protection</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="security-toggle">
                                            <span className="toggle-text">Technical Details</span>
                                            <span className="toggle-icon">↓</span>
                                        </div>
                                    </div>
                                    
                                    <div className="security-accordion-body">
                                        <div className="security-analysis">
                                            <div className="threat-breakdown">
                                                <h4>🎯 Attack Scenarios</h4>
                                                <ul className="attack-scenarios">
                                                    <li><strong>Hardware Failure:</strong> USB drives, hard drives, or solid state storage failing over time</li>
                                                    <li><strong>Paper Degradation:</strong> Ink fading, paper deteriorating, or physical damage from handling</li>
                                                    <li><strong>File System Corruption:</strong> Digital files becoming unreadable due to bit rot or filesystem errors</li>
                                                    <li><strong>Format Obsolescence:</strong> File formats becoming unreadable as technology advances</li>
                                                </ul>
                                            </div>
                                            
                                            <div className="kosign-mitigation">
                                                <h4>🛡️ Kosign Protection Strategy</h4>
                                                <div className="mitigation-points">
                                                    <div className="mitigation-point">
                                                        <span className="point-icon">📋</span>
                                                        <div>
                                                            <strong>Multiple Media Types:</strong> Store across paper, digital, and metal storage—different failure modes
                                                        </div>
                                                    </div>
                                                    <div className="mitigation-point">
                                                        <span className="point-icon">🔄</span>
                                                        <div>
                                                            <strong>Redundant Copies:</strong> Many identical copies ensure multiple backups survive any single failure
                                                        </div>
                                                    </div>
                                                    <div className="mitigation-point">
                                                        <span className="point-icon">✅</span>
                                                        <div>
                                                            <strong>Error Detection:</strong> Built-in checksums and verification detect corruption early
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="scenario-example">
                                                <h5>Real-World Scenario</h5>
                                                <p><strong>Event:</strong> After 10 years, your main USB backup fails and paper copies have faded.</p>
                                                <p><strong>Traditional Solution Impact:</strong> Single backups are lost, no redundancy means permanent data loss.</p>
                                                <p><strong>Kosign Protection Result:</strong> Multiple copies on different media types ensure survival. Metal backup, cloud copies, and distributed paper copies remain readable.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Human Error */}
                                <div className="security-accordion-item high-risk" data-threat="human-error">
                                    <div className="security-accordion-header">
                                        <div className="security-threat-preview">
                                            <div className="security-threat-icon">🤦‍♂️</div>
                                            <div className="security-threat-details">
                                                <h3>Human Error</h3>
                                                <p>Accidental deletion, lost storage locations, forgotten passwords, or user mistakes</p>
                                                <div className="threat-metrics">
                                                    <span className="risk-level high">High Risk</span>
                                                    <span className="protection-level strong">Strong Protection</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="security-toggle">
                                            <span className="toggle-text">Technical Details</span>
                                            <span className="toggle-icon">↓</span>
                                        </div>
                                    </div>
                                    
                                    <div className="security-accordion-body">
                                        <div className="security-analysis">
                                            <div className="threat-breakdown">
                                                <h4>🎯 Attack Scenarios</h4>
                                                <ul className="attack-scenarios">
                                                    <li><strong>Accidental Deletion:</strong> Mistakenly deleting files, formatting drives, or throwing away papers</li>
                                                    <li><strong>Lost Locations:</strong> Forgetting where backups are stored or losing access information</li>
                                                    <li><strong>Password Mistakes:</strong> Typos in passwords, forgetting passphrases, or incorrect recovery attempts</li>
                                                    <li><strong>Miscommunication:</strong> Family members not understanding recovery procedures or location information</li>
                                                </ul>
                                            </div>
                                            
                                            <div className="kosign-mitigation">
                                                <h4>🛡️ Kosign Protection Strategy</h4>
                                                <div className="mitigation-points">
                                                    <div className="mitigation-point">
                                                        <span className="point-icon">📝</span>
                                                        <div>
                                                            <strong>Clear Documentation:</strong> Detailed recovery instructions and storage location records
                                                        </div>
                                                    </div>
                                                    <div className="mitigation-point">
                                                        <span className="point-icon">🔄</span>
                                                        <div>
                                                            <strong>Multiple Chances:</strong> Many copies mean multiple opportunities to recover correctly
                                                        </div>
                                                    </div>
                                                    <div className="mitigation-point">
                                                        <span className="point-icon">👥</span>
                                                        <div>
                                                            <strong>Distributed Knowledge:</strong> Multiple people know locations and procedures—reducing single points of failure
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="scenario-example">
                                                <h5>Real-World Scenario</h5>
                                                <p><strong>Event:</strong> You accidentally delete your main backup and forget where you stored the paper copy.</p>
                                                <p><strong>Traditional Solution Impact:</strong> Single backup methods fail catastrophically with human error.</p>
                                                <p><strong>Kosign Protection Result:</strong> Multiple family members have location information. Cloud backup still exists. Bank safety deposit box provides final recovery option.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Social Engineering */}
                                <div className="security-accordion-item medium-risk" data-threat="social">
                                    <div className="security-accordion-header">
                                        <div className="security-threat-preview">
                                            <div className="security-threat-icon">🎭</div>
                                            <div className="security-threat-details">
                                                <h3>Social Engineering</h3>
                                                <p>Manipulation, impersonation, or psychological attacks to gain unauthorized access</p>
                                                <div className="threat-metrics">
                                                    <span className="risk-level medium">Medium Risk</span>
                                                    <span className="protection-level strong">Strong Protection</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="security-toggle">
                                            <span className="toggle-text">Technical Details</span>
                                            <span className="toggle-icon">↓</span>
                                        </div>
                                    </div>
                                    
                                    <div className="security-accordion-body">
                                        <div className="security-analysis">
                                            <div className="threat-breakdown">
                                                <h4>🎯 Attack Scenarios</h4>
                                                <ul className="attack-scenarios">
                                                    <li><strong>Emergency Impersonation:</strong> Scammers claiming to be you in crisis situations</li>
                                                    <li><strong>Authority Pretense:</strong> Fake law enforcement, lawyers, or officials demanding access</li>
                                                    <li><strong>Family Manipulation:</strong> Exploiting trust relationships between key holders</li>
                                                    <li><strong>Technical Pretense:</strong> Fake IT support or security personnel requesting information</li>
                                                </ul>
                                            </div>
                                            
                                            <div className="kosign-mitigation">
                                                <h4>🛡️ Kosign Protection Strategy</h4>
                                                <div className="mitigation-points">
                                                    <div className="mitigation-point">
                                                        <span className="point-icon">🔑</span>
                                                        <div>
                                                            <strong>Partial Information:</strong> No single person has enough information to compromise security alone
                                                        </div>
                                                    </div>
                                                    <div className="mitigation-point">
                                                        <span className="point-icon">👥</span>
                                                        <div>
                                                            <strong>Multi-Party Verification:</strong> Multiple people must cooperate, allowing cross-verification of requests
                                                        </div>
                                                    </div>
                                                    <div className="mitigation-point">
                                                        <span className="point-icon">📋</span>
                                                        <div>
                                                            <strong>Clear Protocols:</strong> Documented procedures include verification steps and warning signs
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="scenario-example">
                                                <h5>Real-World Scenario</h5>
                                                <p><strong>Event:</strong> Scammer calls your elderly parent claiming you're in jail and need immediate access to funds.</p>
                                                <p><strong>Traditional Solution Impact:</strong> Single points of access allow social engineering to succeed completely.</p>
                                                <p><strong>Kosign Protection Result:</strong> Parent cannot help alone—needs 2 other key holders to verify. Time delay allows discovery of scam.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Security Summary */}
            <section className="security-summary-section">
                <Container>
                    <Row>
                        <Col className="text-center">
                            <h2 className="security-summary-title">Comprehensive Protection Strategy</h2>
                            <p className="security-summary-desc">
                                Kosign's distributed encryption architecture addresses every major threat category through layered defense systems.
                            </p>
                            
                            <div className="protection-stats">
                                <div className="protection-stat">
                                    <span className="stat-icon">🛡️</span>
                                    <span className="stat-value">100%</span>
                                    <span className="stat-label">Threat Coverage</span>
                                </div>
                                <div className="protection-stat">
                                    <span className="stat-icon">🔒</span>
                                    <span className="stat-value">256-bit</span>
                                    <span className="stat-label">AES Encryption</span>
                                </div>
                                <div className="protection-stat">
                                    <span className="stat-icon">📍</span>
                                    <span className="stat-value">Multi-Site</span>
                                    <span className="stat-label">Storage</span>
                                </div>
                                <div className="protection-stat">
                                    <span className="stat-icon">👥</span>
                                    <span className="stat-value">Social</span>
                                    <span className="stat-label">Recovery</span>
                                </div>
                            </div>
                            
                            <div className="security-cta-section">
                                <button className="security-cta-primary" onClick={() => {
                                    AnalyticsService.trackCTAClick('security');
                                    navigate('/create');
                                }}>
                                    Create Your Secure Vault
                                </button>
                                <p className="security-cta-subtitle">
                                    Start with our threat-resistant foundation in minutes
                                </p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            <Footer />
        </Layout>
    );
}

export default SecurityPage; 