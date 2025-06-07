import React, {Component, useEffect, useState} from 'react'
import { Link , useNavigate} from 'react-router-dom'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Layout from "../components/Layout";

import '../style/index.css';
import '../style/homepage.css';
import '../style/pricing.css';

import {Button} from 'react-bootstrap';
//import {FaTelegram, FaTwitter} from 'react-icons/fa';

import Container from 'react-bootstrap/Container';
import Navbar from '../components/NavbarTop';
import Footer from '../components/Footer';

import {MdCancel} from 'react-icons/md';
import {FaCheck} from 'react-icons/fa';
import Cookies from 'universal-cookie';
import {FaTwitter, FaMedium} from 'react-icons/fa';
import { ProFeatureService } from '../services/ProFeatureService';

function PricingPage() {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isProUser, setIsProUser] = useState(false);

    useEffect(() => {
        setIsProUser(ProFeatureService.isProUser());
    }, []);

    return (
        <Layout>
            <Navbar loggedIn={isLoggedIn}/>

            <div className={'pageLayout pricingPageWrapper'}>
                <Container>
                    <Row>
                        <Col xs={{span:12}} md={{span:12, offset:0}} lg={{span:12, offset:0}}>
                            <h2 style={{textAlign:'center'}}>Simple, Fair Pricing</h2>
                            <p style={{textAlign:'center', color: '#888', marginBottom: '40px'}}>
                                No subscriptions. Pay once, own forever.
                            </p>
                        </Col>
                    </Row>
                    <div style={{paddingLeft:30, paddingRight:30, marginTop:10}}>
                        <Row>
                            <Col xs={{span:12}} md={{span:4, offset:2}} lg={{span:4, offset:2}} style={{paddingTop:10, marginBottom:40}}>
                                <div className={'pricingColumn'} style={{marginTop:30}}>
                                    <div className={'packageTitle'}>Free</div>
                                    <div className={'minidivider'}></div>
                                    <div className={'packageSubtitleWrapper'}>
                                        <div className={'packageSubtitle'}>$0</div>
                                        <div className={'text-muted'}>
                                            <div>Forever</div>
                                        </div>
                                    </div>
                                    <div className={'pricingActionWrapper'}>
                                        <Button
                                            variant={'outline-primary'}
                                            size={'lg'}
                                            onClick={() => navigate('/create')}
                                        >
                                            Get started free
                                        </Button>
                                    </div>
                                    <div className={'featureDivider'}></div>
                                    <div className={'pricingFeature'}>
                                        <FaCheck className={'pricingCheck'}/> Up to {ProFeatureService.FREE_LIMITS.maxShares} key shares
                                    </div>
                                    <div className={'pricingFeature'}>
                                        <FaCheck className={'pricingCheck'}/> {ProFeatureService.FREE_LIMITS.maxStorage} character limit
                                    </div>
                                </div>
                            </Col>

                            <Col xs={{span:12}} md={{span:4, offset:0}} lg={{span:4, offset:0}} style={{paddingTop:10, marginBottom:40}}>
                                <div className={'highlightColumn '}>
                                    <div style={{textAlign:'center', fontWeight:'bold', paddingTop:4, paddingBottom:4, color:'#fff'}}>
                                        {isProUser ? '✨ You have Pro!' : 'One-time payment'}
                                    </div>
                                    <div className={'pricingColumn'}>
                                        <div className={'packageTitle'}>Pro</div>
                                        <div className={'minidivider'}></div>
                                        <div className={'packageSubtitleWrapper'}>
                                            <div className={'packageSubtitle'}>$49</div>
                                            <div className={'text-muted'}>
                                                <div>One-time</div>
                                            </div>
                                        </div>
                                        <div className={'pricingActionWrapper'}>
                                            {isProUser ? (
                                                <Button
                                                    variant={'success'}
                                                    size={'lg'}
                                                    onClick={() => navigate('/create')}
                                                >
                                                    Create Pro vault
                                                </Button>
                                            ) : (
                                                <Button
                                                    variant={'primary'}
                                                    className={'highlightedButton'}
                                                    size={'lg'}
                                                    onClick={() => navigate('/payment')}
                                                >
                                                    Upgrade to Pro
                                                </Button>
                                            )}
                                        </div>
                                        <div className={'featureDivider'}></div>
                                        <div className={'pricingFeature'}>
                                            <FaCheck className={'pricingCheck'}/> Up to {ProFeatureService.PRO_LIMITS.maxShares} key shares
                                        </div>
                                        <div className={'pricingFeature'}>
                                            <FaCheck className={'pricingCheck'}/> {ProFeatureService.PRO_LIMITS.maxStorage.toLocaleString()} character limit
                                        </div>
                                        <div className={'pricingFeature'}>
                                            <FaCheck className={'pricingCheck'}/> All features included
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Container>
            </div>

            <Footer/>
        </Layout>
    )
}

export default PricingPage;

