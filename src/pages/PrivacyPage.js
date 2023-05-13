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
                            Last update: 13 May 2023
                            <br/><br/>
                            Our privacy policy applies to information we collect when you use or access our website,
                            application, or just interact with us. We may change this privacy policy from time to time.
                            Whenever we make changes to this privacy policy, the changes are effective immediately
                            after we post the revised privacy policy (as indicated by revising the date at the top of
                            our privacy policy). We encourage you to review our privacy policy whenever you access
                            our services to stay informed about our information practices and the ways you can
                            help protect your privacy.
                        </p>

                        <h3>INFORMATION YOU PROVIDE TO US</h3>
                        <p>
                            We collect information you provide directly to us.
                            For example, we collect information when you participate in any
                            interactive features of our services, fill out a form, request customer
                            support, provide any contact or identifying information or otherwise
                            communicate with us. The types of information we may collect include your name,
                            email address, postal address, credit card information and other contact or
                            identifying information you choose to provide.
                        </p>

                        <h3>INFORMATION WE COLLECT</h3>
                        <p>
                            When you access or use our services, we automatically collect information about you, including:
                            <ul>
                                <li>
                                    Log Information: We log information about your use of our services, including the type of browser you use, access times, pages viewed, your IP address and the page you visited before navigating to our services.
                                </li>
                                <li>
                                    Device Information: We may collect information about the computer or mobile device you use to access our services, including the hardware model, and operating system and version.
                                </li>
                                <li>
                                    Location Information: We may collect information about the location of your device each time you access or use one of our mobile applications or otherwise consent to the collection of this information.
                                </li>
                                <li>
                                    Information Collected by Cookies and Other Tracking Technologies:
                                    We use various technologies to collect information,
                                    and this may include sending cookies to your computer.
                                    Cookies are small data files stored on your hard drive or in your device memory
                                    that helps us to improve our services and your experience, see which areas
                                    and features of our services are popular and count visits.
                                    We may also collect information using web beacons (also known as "tracking pixels").
                                    Web beacons are electronic images that may be used in our services or emails and to track count visits or
                                    understand usage and campaign effectiveness.
                                </li>
                            </ul>
                        </p>

                        <h3>INFORMATION FROM OTHER SOURCES</h3>
                        <p>
                            In order to provide you with access to the Service, or to provide you with better
                            service in general, we may combine information obtained from other sources
                            (for example, a third-party service whose application you have authorized or used
                            to sign in) and combine that with information we collect through our services.
                        </p>

                        <h3>USE OF INFORMATION</h3>
                        <p>
                            We use information about you for various purposes, including to:
                            <ul>
                                <li>
                                    Provide, maintain and improve our services;
                                </li>
                                <li>
                                    Provide services you request, process transactions
                                    and to send you related information;
                                </li>
                                <li>
                                    Send you technical notices, updates, security alerts
                                    and support and administrative messages;
                                </li>
                                <li>
                                    Respond to your comments, questions and requests and provide customer service;
                                </li>
                                <li>
                                    Communicate with you about news and information related to our service;
                                </li>
                                <li>
                                    Monitor and analyze trends, usage and activities in
                                    connection with our services; and
                                </li>
                                <li>
                                    Personalize and improve our services.
                                </li>
                            </ul>
                            By accessing and using our services, you consent to the processing and
                            transfer of your information in and to the United States and other countries.
                        </p>

                        <h3>SHARING OF INFORMATION</h3>
                        <p>
                            <ul>
                                <li>
                                    With third party vendors and other service providers who need access to
                                    your information to carry out work on our behalf.
                                </li>
                                <li>
                                    If we believe disclosure is reasonably necessary to comply with any
                                    applicable law, regulation, legal process or governmental request;
                                </li>
                                <li>
                                    To enforce applicable user agreements or policies, including our Terms of Service;
                                    and to protect us, our users or the public from harm or illegal activities;
                                </li>
                                <li>
                                    In connection with any merger, sale of our assets, financing or acquisition of
                                    all or a portion of our business to another company; and
                                </li>
                                <li>
                                    If we notify you through our services (or in our privacy policy)
                                    that the information you provide will be shared in a particular
                                    manner and you provide such information.
                                </li>
                            </ul>
                            We may also share aggregated or anonymized information that does not directly identify you.

                        </p>

                        <h3>THIRD PARTY ANALYTICS</h3>
                        <p>
                            We may allow third parties to provide analytics services.
                            These third parties may use cookies, web beacons and other technologies to
                            collect information about your use of the services and other websites,
                            including your IP address, web browser, pages viewed, time spent
                            on pages, links clicked and conversion information. This information may be
                            used by us and third parties to, among other things, analyze and track data,
                            determine the popularity of certain content and other websites and better
                            understand your online activity. Our privacy policy does not apply to,
                            and we are not responsible for, third party cookies, web beacons or other
                            tracking technologies and we encourage you to check the privacy policies of
                            these third parties to learn more about their privacy practices.
                        </p>

                        <h3>SECURITY</h3>
                        <p>
                            We take reasonable measures to help protect personal information from loss,
                            theft, misuse and unauthorized access, disclosure, alteration and destruction.
                        </p>


                        <h3>COOKIES</h3>
                        <p>
                            Most web browsers are set to accept cookies by default.
                            If you prefer, you can usually choose to set your browser to remove or
                            reject browser cookies. Please note that if you choose to remove or
                            reject cookies, this could affect the availability and functionality of our services.
                        </p>

                        <h3>PROMOTIONAL MATERIAL</h3>
                        <p>
                            You may opt out of receiving any promotional emails from us by following the
                            instructions in those emails. If you opt out, we may still send you non-promotional
                            communications, such as those about your account or our ongoing business relations.
                        </p>

                        <h3>
                            QUESTIONS
                        </h3>
                        <p>
                            Questions or comments about the Privacy Policy you may contact us at: support@kosign.xyz.
                        </p>

                    </div>

                </Container>
            </div>
        </Layout>
    );


}

export default PrivacyPage;

