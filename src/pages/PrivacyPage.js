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
                            <em>Last updated: October 10, 2025</em>
                        </p>

                        <p>
                            <strong>We can't see your data.</strong> Everything happens in your browser. 
                            We don't track you, we don't use analytics, and we don't collect personal information. 
                            This page explains the minimal technical data we do collect.
                        </p>

                        <h3>How Kosign Protects Your Privacy</h3>
                        <ul>
                            <li><strong>Client-side encryption:</strong> All your sensitive data is encrypted in your browser before anything leaves your device</li>
                            <li><strong>Zero-knowledge:</strong> We literally cannot see your vault contents, passwords, or keys</li>
                            <li><strong>No tracking:</strong> No analytics, no cookies for tracking, no user profiling</li>
                            <li><strong>Open source:</strong> You can verify everything we're saying by checking the code</li>
                        </ul>

                        <h3>What We Collect</h3>
                        <ul>
                            <li><strong>If you email us:</strong> Your email address (obviously)</li>
                            <li><strong>If you use our hosted website:</strong> Basic server logs (IP address, browser type) for security and performance</li>
                            <li><strong>If you deploy your own instance:</strong> No data is collected from your usage</li>
                        </ul>
               
                        <h3>Open Source = Verifiable Privacy</h3>
                        <p>
                           You can (and should) run your own instance of Kosign and verify the code yourself.
                            The entire Kosign application is open source at{' '}
                            <a href="https://github.com/xxbtc/kosign" target="_blank" rel="noopener noreferrer">
                                github.com/xxbtc/kosign
                            </a>.                            
                        </p>

                        <h3>Questions?</h3>
                        <p>
                            Email us at <a href="mailto:support@kosign.xyz">support@kosign.xyz</a> if you have 
                            questions.
                        </p>

                    </div>

                </Container>
            </div>
        </Layout>
    );


}

export default PrivacyPage;

