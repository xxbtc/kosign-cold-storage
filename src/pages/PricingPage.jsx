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
                            {/*<Col xs={{span:12}} md={{span:4, offset:0}} lg={{span:4, offset:0}} style={{paddingTop:10, marginBottom:40}}>
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
                                            onClick={() => navigate('create')}
                                        >
                                            Get started free
                                        </Button>
                                    </div>
                                    <div className={'featureDivider'}></div>
                                    <div className={'pricingFeature'}>
                                        <FaCheck className={'pricingCheck'}/> No credit card required
                                    </div>
                                    <div className={'pricingFeature'}>
                                        <FaCheck className={'pricingCheck'}/> 1 vault
                                    </div>
                                    <div className={'pricingFeature'}>
                                        <div>
                                            <FaCheck className={'pricingCheck'}/>
                                        </div>
                                        <div>
                                            5 keys
                                        </div>
                                    </div>
                                    <div className={'pricingFeature'}>
                                        <div>
                                            <FaCheck className={'pricingCheck'}/>
                                        </div>
                                        <div>
                                            100 characters per vault
                                        </div>
                                    </div>
                                </div>
                            </Col>*/}

                            <Col xs={{span:12}} md={{span:10, offset:1}} lg={{span:8, offset:2}} style={{paddingTop:10}}>
                                <div className={'highlightColumn '}>
                                    <div style={{textAlign:'center', fontWeight:'bold', paddingTop:4, paddingBottom:4, color:'#fff'}}>One-time payment</div>
                                    <div className={'pricingColumn'}>
                                        <div className={'packageTitle'}>${global.setupCost} per vault + ${global.costPerKey} per key </div>
                                        <div className={'minidivider'}></div>
                                        {/*<div className={'packageSubtitleWrapper'}>
                                            <div className={'packageSubtitle'}>

                                            </div>
                                        </div>*/}
                                        {/*<div className={'text-muted'}>
                                            <div>One-time payment</div>
                                        </div>*/}
                                        <div className={'pricingActionWrapper'}>
                                            <Button
                                                variant={'primary'}
                                                className={'highlightedButton'}
                                                size={'lg'}
                                                onClick={() => navigate('/create')}
                                            >
                                                Create a vault
                                            </Button>
                                        </div>
                                        <div className={'featureDivider'}></div>

                                        <div style={{display:'flex', flex:1, flexDirection:'row', alignItems:'center'}}>
                                            <div style={{display:'flex', flex:1, flexDirection:'column', alignItems:'start'}}>
                                                <div className={'pricingFeature'}>
                                                    <div><FaCheck className={'pricingCheck'}/> No signup </div>
                                                    {/*<div className={'text-muted'}>&nbsp;</div>*/}
                                                </div>
                                                <div className={'pricingFeature'}>
                                                    <div><FaCheck className={'pricingCheck'}/> Cold data storage</div>
                                                </div>
                                                {/*<div className={'pricingFeature'}>
                                                    <div><FaCheck className={'pricingCheck'}/> Keep it forever</div>
                                                </div>*/}
                                               {/* <div className={'pricingFeature'}>
                                                    <div><FaCheck className={'pricingCheck'}/> your custom unlock settings</div>
                                                    <div className={'text-muted'}>Print your vault for offline storage</div>
                                                </div>*/}
                                            </div>
                                            <div style={{display:'flex', flex:1, flexDirection:'column', alignItems:'start'}}>
                                                <div className={'pricingFeature'}>
                                                    <div><FaCheck className={'pricingCheck'}/> Print your vault on paper</div>
                                                </div>
                                                <div className={'pricingFeature'}>
                                                    <div><FaCheck className={'pricingCheck'}/> Distribute keys to delegates</div>
                                                </div>
                                               {/* <div className={'pricingFeature'}>
                                                    <div><FaCheck className={'pricingCheck'}/> up to {global.maxCharsPerVault} characters per vault</div>
                                                </div>*/}
                                            </div>
                                        </div>



                                    </div>
                                </div>
                            </Col>

                            {/* <Col xs={{span:12}} md={{span:4, offset:0}} lg={{span:4, offset:0}} style={{paddingTop:40}}>
                                <div>
                                    <div className={'pricingColumn'}>
                                        <div className={'packageTitle'}>Enterprise</div>
                                        <div className={'minidivider'}></div>
                                        <div className={'packageSubtitleWrapper'}>
                                            <div className={'packageSubtitle'}>
                                                $199
                                            </div>
                                            <div className={'text-muted'}>
                                                <div>per month</div>
                                            </div>
                                        </div>
                                        <div className={'pricingActionWrapper'}>
                                            <Button
                                                variant={'primary'}
                                                className={'highlightedButton'}
                                                size={'lg'}
                                                onClick={() => navigate('enterprise')}
                                            >
                                                Start 30 day free trial
                                            </Button>
                                        </div>
                                        <div className={'featureDivider'}></div>
                                        <div className={'pricingFeature'}>
                                            <FaCheck className={'pricingCheck'}/> Includes all Pro features
                                        </div>
                                        <div className={'pricingFeature'}>
                                            <FaCheck className={'pricingCheck'}/> 100 vaults
                                        </div>
                                        <div className={'pricingFeature'}>
                                            <FaCheck className={'pricingCheck'}/> 20 keys per vault
                                        </div>
                                        <div className={'pricingFeature'}>
                                            <div>
                                                <FaCheck className={'pricingCheck'}/>
                                            </div>
                                            <div>
                                                Webhooks
                                                <span className={'text-muted'}>coming soon</span>
                                            </div>
                                        </div>
                                        <div className={'pricingFeature'}>
                                        <div>
                                            <FaCheck className={'pricingCheck'}/>
                                        </div>
                                        <div>
                                            SSO Authentication
                                            <span className={'text-muted'}>coming soon</span>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            </Col>*/}

                        </Row>
                    </div>
                </Container>
            </div>

            <Footer/>


        </Layout>
    )

}

export default PricingPage;

