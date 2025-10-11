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



function LegalPage() {

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
                            <h2 className={'pageTitle'}>Terms of Use</h2>
                        </div>
                        <div className={'backButtonWrapper'}>
                            <Link className='backButton' to={'/'}>
                                <FaChevronLeft className={'backButtonIcon'}/> Back
                            </Link>
                        </div>
                    </div>

                    <div className={'pageWrapperInner'}>
                        <p>
                            <em>Last updated: October 10, 2025</em>
                        </p>

                        <h3>What is Kosign?</h3>
                        <p>
                            Kosign is a free, open source tool for creating secure offline vaults for your passwords, 2FA codes, 
                            crypto keys, and other sensitive data. Everything happens in your browser - we never see your data.
                            The entire application is available under the MIT License at{' '}
                            <a href="https://github.com/xxbtc/kosign" target="_blank" rel="noopener noreferrer">
                                github.com/xxbtc/kosign
                            </a>.
                        </p>

                        <h3>How it Works</h3>
                        <ul>
                            <li>All encryption happens in your browser (client-side)</li>
                            <li>We never have access to your vault contents or keys</li>
                            <li>You get printable QR codes for offline storage</li>
                            <li>Uses threshold cryptography for social recovery</li>
                            <li>Works completely offline once downloaded</li>
                        </ul>

                        <h3>Your Responsibilities</h3>
                        <p>
                            Since Kosign works offline and we can't access your data, you're responsible for:
                        </p>
                        <ul>
                            <li><strong>Backup your vaults:</strong> Print and store your QR codes safely</li>
                            <li><strong>Distribute key shares:</strong> Give shares to trusted people according to your threshold</li>
                            <li><strong>Test recovery:</strong> Make sure you can unlock your vaults before storing important data</li>
                            <li><strong>Legal compliance:</strong> Only store content that's legal in your jurisdiction</li>
                            <li><strong>Security:</strong> Keep your printed materials secure and private</li>
                        </ul>

                        <h3>What We Cannot Do</h3>
                        <p>
                            <strong>We cannot recover your data.</strong> This is by design for your security. If you lose 
                            your vault backups and key shares, your data is gone forever.
                        </p>

                        <h3>Open Source License</h3>
                        <p>
                            Kosign is released under the <strong>MIT License</strong>. This means you can:
                        </p>
                        <ul>
                            <li>Use it for any purpose (personal, commercial, etc.)</li>
                            <li>Modify the code however you want</li>
                            <li>Distribute your own versions</li>
                            <li>Run your own instance of Kosign</li>
                        </ul>
                        <p>
                            The only requirement is to include the original license notice. 
                            See the full license at{' '}
                            <a href="https://github.com/xxbtc/kosign/blob/main/LICENSE" target="_blank" rel="noopener noreferrer">
                                github.com/xxbtc/kosign/blob/main/LICENSE
                            </a>.
                        </p>

                        <h3>Website vs. Code</h3>
                        <p>
                            The Kosign <strong>application code</strong> is open source (MIT License). 
                            Our <strong>website content, logo, and branding</strong> remain our property. 
                            Feel free to link to us, but please don't copy our branding or scrape our website.
                        </p>

                        <h3>No Warranty (Use at Your Own Risk)</h3>
                        <p>
                            Kosign is provided "as is" without any warranties. While we've built it with care, 
                            we can't guarantee it's bug-free or perfect for your needs. Use it at your own risk.
                        </p>
                        <p>
                            <strong>Important:</strong> Always test with non-critical data first. Make sure you can 
                            successfully create and unlock vaults before storing anything important.
                        </p>

                        <h3>Limitation of Liability</h3>
                        <p>
                            We're not liable for any damages from using Kosign, including lost data. 
                            Since the tool is free and open source, you're using it at your own risk.
                        </p>
                        <p>
                            <strong>Maximum liability:</strong> Since Kosign is provided free of charge, 
                            our total liability is limited to the amount you paid for the software ($0).
                        </p>

                        <h3>Service Availability</h3>
                        <p>
                            Our hosted website may experience downtime or become unavailable. Since Kosign is open source, 
                            you can always:
                        </p>
                        <ul>
                            <li>Download and run it locally</li>
                            <li>Use your existing vault backups</li>
                            <li>Run your own instance</li>
                            <li>Fork the project if needed</li>
                        </ul>

                        <h3>Privacy</h3>
                        <p>
                            We respect your privacy. Check out our{' '}
                            <Link to={'/privacy'}>Privacy Policy</Link> for details, but the short version is:
                        </p>
                        <ul>
                            <li>We can't see your vault contents (client-side encryption)</li>
                            <li>We don't use analytics or tracking</li>
                            <li>We collect minimal technical data for security</li>
                        </ul>

                        <h3>User Conduct</h3>
                        <p>
                            You agree not to use Kosign for any unlawful purposes or to store illegal content. 
                            Since we cannot access your vault contents, you are solely responsible for ensuring 
                            your use complies with applicable laws and regulations.
                        </p>

                        <h3>Termination</h3>
                        <p>
                            We reserve the right to suspend access to our hosted service at any time. 
                            However, since Kosign is open source, you can continue using the software 
                            independently of our hosted service.
                        </p>

                        <h3>Governing Law</h3>
                        <p>
                            These terms are governed by the laws of Israel. Any disputes will be resolved 
                            in the courts of Israel.
                        </p>

                        <h3>Changes to These Terms</h3>
                        <p>
                            We may update these terms occasionally. We'll update the date at the top when we do. 
                            Since this is open source, you can always check the git history to see what changed.
                        </p>

                        <h3>Contact and Support</h3>
                        <p>
                            For questions or support, you can:
                        </p>
                        <ul>
                            <li>Email us: <a href="mailto:support@kosign.xyz">support@kosign.xyz</a></li>
                            <li>Open an issue on <a href="https://github.com/xxbtc/kosign/issues" target="_blank" rel="noopener noreferrer">GitHub</a></li>
                            <li>Check the documentation in the repo</li>
                        </ul>


                    </div>

                </Container>
            </div>
        </Layout>
    );

}

export default LegalPage;

