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



function PricingPage() {

    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn]   = useState(false);
    const [isLoading, setIsLoading]     = useState(false);

    useEffect(() => {

    }, []);


    return (
        <Layout>
            <Navbar loggedIn={isLoggedIn}/>


            <div className={'pageLayout pricingPageWrapper'}>
                <Container>
                    <Row>
                        <Col xs={{span:12}} md={{span:12, offset:0}} lg={{span:12, offset:0}}>
                            <h2 style={{textAlign:'center'}}></h2>
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
                                            <div>&nbsp;</div>
                                        </div>
                                    </div>
                                    <div className={'pricingActionWrapper'}>
                                        <Button
                                            variant={'primary'}
                                            size={'lg'}
                                            onClick={() => navigate('/create')}
                                        >
                                            Get started free
                                        </Button>
                                    </div>
                                    <div className={'featureDivider'}></div>
                                    <div className={'pricingFeature'}>
                                        <FaCheck className={'pricingCheck'}/> up to {global.freeKeys} keys
                                    </div>
                                    <div className={'pricingFeature'}>
                                        <FaCheck className={'pricingCheck'}/> {global.maxCharsPerVaultFree.toLocaleString()} character limit
                                    </div>
                                </div>
                            </Col>

                            <Col xs={{span:12}} md={{span:4, offset:0}} lg={{span:4, offset:0}} style={{paddingTop:10, marginBottom:40}}>

                                <div className={'highlightColumn '}>
                                    <div style={{textAlign:'center', fontWeight:'bold', paddingTop:4, paddingBottom:4, color:'#fff'}}>One-time payment</div>
                                    <div className={'pricingColumn'}>
                                        <div className={'packageTitle'}>Pro</div>
                                        <div className={'minidivider'}></div>
                                        <div className={'packageSubtitleWrapper'}>
                                            <div className={'packageSubtitle'}>$10</div>
                                            <div className={'text-muted'}>
                                                <div>per key</div>
                                            </div>
                                        </div>
                                        <div className={'pricingActionWrapper'}>
                                            <Button
                                                variant={'primary'}
                                                className={'highlightedButton'}
                                                size={'lg'}
                                                onClick={() => navigate('/create')}
                                            >
                                                Create vault
                                            </Button>
                                        </div>
                                        <div className={'featureDivider'}></div>
                                        <div className={'pricingFeature'}>
                                            <FaCheck className={'pricingCheck'}/> up to 20 keys
                                        </div>
                                        <div className={'pricingFeature'}>
                                            <FaCheck className={'pricingCheck'}/> 2 keys free
                                        </div>
                                        <div className={'pricingFeature'}>
                                            <FaCheck className={'pricingCheck'}/> 5,000 character limit
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

