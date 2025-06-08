import React, {Component, useEffect} from 'react'
import { Link , useNavigate} from 'react-router-dom'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Layout from "../components/Layout";

import '../style/index.css';
import '../style/homepage.css';
import {Button, NavItem} from 'reactstrap';
//import {FaTelegram, FaTwitter} from 'react-icons/fa';

import Container from 'react-bootstrap/Container';
import Navbar from '../components/NavbarTop';
import Footer from '../components/Footer';

//import {ContractService} from '../services/ContractService';
import Cookies from 'universal-cookie';

import {MdCancel} from 'react-icons/md';
import {FaCheckCircle} from 'react-icons/fa';
import {RiErrorWarningLine} from 'react-icons/ri';
import {FaChevronLeft} from 'react-icons/fa';



function PrivacyPage() {

    const navigate = useNavigate();
    //const cookies  = new Cookies();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);



    return (
        <Layout>
            <Navbar loggedIn={false}/>
            <div className={'pageWrapper'}>

                <Container>
                    <div className={'pageNavWrapper'}>
                        <div>
                            <h2 className={'pageTitle'}>Privacy Policy</h2>
                        </div>
                        <div className={'backButtonWrapper'}>
                            <Link className='backButton' to={'/'}>
                                <FaChevronLeft className={'backButtonIcon'}/> Back
                            </Link>
                        </div>
                    </div>

                    <div className={'pageWrapperInner'}>
                        <p>
                            Last update: 08 June 2025
                            <br/><br/>
                            Our privacy policy applies to information we collect when you use or access our website,
                            application, or just interact with us. We may change this privacy policy from time to time.
                            Whenever we make changes to this privacy policy, the changes are effective immediately
                            after we post the revised privacy policy (as indicated by revising the date at the top of
                            our privacy policy). We encourage you to review our privacy policy whenever you access
                            our services to stay informed about our information practices and the ways you can
                            help protect your privacy.
                        </p>

                        <h3>KOSIGN'S PRIVACY-FIRST DESIGN</h3>
                        <p>
                            <strong>Your vault contents never leave your device.</strong> Kosign uses client-side encryption, 
                            meaning all sensitive data is encrypted and decrypted directly in your browser. We cannot access, 
                            read, or recover your vault contents - this is by design for your security and privacy.
                        </p>

                        <h3>INFORMATION YOU PROVIDE TO US</h3>
                        <p>
                            We collect minimal information you provide directly to us, including:
                            <ul>
                                <li><strong>Contact Information:</strong> Email addresses when you contact support</li>
                                <li><strong>Payment Information:</strong> Processed securely through third-party payment processors (we do not store payment details)</li>
                            </ul>
                        </p>

                        <h3>INFORMATION WE COLLECT AUTOMATICALLY</h3>
                        <p>
                            When you access our services, we automatically collect standard web analytics information:
                            <ul>
                                <li>
                                    <strong>Basic Analytics:</strong> We use third-party analytics services to understand how users interact with our website (page views, session duration, general location data). This helps us improve the service.
                                </li>
                                <li>
                                    <strong>Technical Information:</strong> Browser type, operating system, IP address, and access times for security and performance monitoring.
                                </li>
                                <li>
                                    <strong>Cookies:</strong> We use essential cookies for website functionality and temporary storage during vault creation. We do not use tracking cookies for advertising.
                                </li>
                            </ul>
                        </p>

                        <h3>WHAT WE DO NOT COLLECT</h3>
                        <p>
                            <ul>
                                <li><strong>Vault Contents:</strong> Your encrypted data, passwords, private keys, or any sensitive information you store in vaults</li>
                                <li><strong>Vault Metadata:</strong> We do not store vault names, descriptions, or any information about your vault structure or contents</li>
                                <li><strong>Decryption Keys:</strong> The keys needed to unlock your vaults remain with you and your trusted contacts</li>
                                <li><strong>Detailed Location Data:</strong> We do not collect precise location information</li>
                                <li><strong>Biometric Data:</strong> We do not collect fingerprints, facial recognition, or other biometric data</li>
                            </ul>
                        </p>

                        <h3>USE OF INFORMATION</h3>
                        <p>
                            We use collected information solely to:
                            <ul>
                                <li>Provide and maintain our vault creation services</li>
                                <li>Process payments for Pro features</li>
                                <li>Respond to support requests</li>
                                <li>Improve website performance and user experience</li>
                                <li>Detect and prevent security threats</li>
                                <li>Send important service updates (security notices, etc.)</li>
                            </ul>
                            We do not use your information for advertising, marketing, or selling to third parties.
                        </p>

                        <h3>SHARING OF INFORMATION</h3>
                        <p>
                            We share information only in these limited circumstances:
                            <ul>
                                <li><strong>Payment Processing:</strong> With payment processors to handle Pro subscriptions</li>
                                <li><strong>Analytics:</strong> Anonymized usage data with third-party analytics providers to improve our service</li>
                                <li><strong>Legal Requirements:</strong> When required by law or to protect against illegal activities</li>
                                <li><strong>Business Transfers:</strong> In connection with mergers or acquisitions (with user notification)</li>
                            </ul>
                            <strong>We never share, sell, or provide access to your vault contents or decryption keys.</strong>
                        </p>

                        <h3>SECURITY</h3>
                        <p>
                            Security is fundamental to Kosign's design:
                            <ul>
                                <li><strong>Client-Side Encryption:</strong> AES-256 encryption happens in your browser before any data transmission</li>
                                <li><strong>Zero-Knowledge Architecture:</strong> We cannot decrypt your vaults even if we wanted to</li>
                                <li><strong>Open Source Unlock Tool:</strong> The decryption software is open source and auditable</li>
                                <li><strong>Standard Security Measures:</strong> We use industry-standard security practices to protect our systems</li>
                            </ul>
                        </p>

                        <h3>OPEN SOURCE TRANSPARENCY</h3>
                        <p>
                            Our unlock utility is completely open source and available at 
                            <a href="https://github.com/xxbtc/kosign-unlock" target="_blank" rel="noopener noreferrer" className="linkage"> github.com/xxbtc/kosign-unlock</a>. 
                            This allows security researchers and users to verify our cryptographic implementation and ensures 
                            your vaults remain accessible even if our service becomes unavailable.
                        </p>

                        <h3>COOKIES</h3>
                        <p>
                            We use cookies for:
                            <ul>
                                <li><strong>Essential Functions:</strong> Temporary storage during vault creation (automatically deleted)</li>
                                <li><strong>Analytics:</strong> Third-party analytics cookies to understand website usage</li>
                                <li><strong>User Preferences:</strong> Remembering your settings and preferences</li>
                            </ul>
                            You can disable cookies in your browser, though this may affect website functionality.
                        </p>

                        <h3>DATA RETENTION</h3>
                        <p>
                            <ul>
                                <li><strong>Website Analytics:</strong> Automatically deleted according to our analytics provider's retention settings</li>
                                <li><strong>Support Communications:</strong> Retained for reasonable period to provide ongoing support</li>
                                <li><strong>Payment Records:</strong> Retained as required by law and payment processors</li>
                                <li><strong>Vault Contents & Metadata:</strong> Never stored on our servers - retained only by you</li>
                            </ul>
                        </p>

                        <h3>YOUR RIGHTS</h3>
                        <p>
                            You have the right to:
                            <ul>
                                <li>Request information about data we collect</li>
                                <li>Request deletion of your personal information</li>
                                <li>Opt out of non-essential data collection</li>
                                <li>Access your vault contents independently using our open source tools</li>
                            </ul>
                        </p>

                        <h3>PROMOTIONAL COMMUNICATIONS</h3>
                        <p>
                            We may occasionally send important security updates or service announcements. 
                            You can opt out of non-essential communications by contacting us, though we recommend 
                            staying informed about security updates.
                        </p>

                        <h3>CONTACT US</h3>
                        <p>
                            Questions about this Privacy Policy? Contact us at: 
                            <a href="mailto:support@kosign.xyz" className="linkage"> support@kosign.xyz</a>
                        </p>

                    </div>

                </Container>
            </div>
        </Layout>
    );


}

export default PrivacyPage;

