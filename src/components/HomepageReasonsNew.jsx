import React, { Component, useState, useEffect, useRef } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import '../style/index.css';
import '../style/homepage.css';

import Container from 'react-bootstrap/Container';
import Lottie from 'lottie-react-web'
import LottieAnimationVault from '../animations/31217-vault'
import LottieAnimationKey from '../animations/6370-keys'
import LottieAnimationUnlock from '../animations/using-key-to-unlock'
import LottieAnimationPaper from '../animations/paper-tray'

import emergencyImg from "../images/fire-in-a-building--white-background.png";


import {BsArrowReturnRight} from 'react-icons/bs';
import {FaArrowRight} from 'react-icons/fa';

import peoplepaper from "../images/people-making-an-inheritance-plan-with-a-qr-code.jpg";
import tweet2fa from "../images/tweet2fa.png";
import tweet2fa2 from "../images/tweet2fa-2.png";
import safeWithQR from "../images/a-safe-with-a-qr-code.jpg";
import peopleSafe from "../images/diverse-people-lifting-a-safe.jpg";


import Accordion from "./HomepageFAQ";
import layerPeaks from "../images/wave-haikei.svg";


function HomepageReasonsNew(props) {
    const navigate                   = useNavigate();
    const [isLoading, setIsLoading]  = useState(false);


    return (
        <div  >
            <Container>

                <Row className={'homepageReasonsRow'}>
                    <Col className={'homepageReasonsCol'} xs={{span:12, offset:0}} md={{span:6, offset:0}} lg={{span:6, offset:0}}>
                        <div className={'rowTitle'}>Disaster resilient</div>
                        <div className={'rowSubtitle'}>
                            Download or print your vault onto paper to easily store copies in geo-separate locations in case of disaster or emergencies.
                        </div>
                        <div className={'featureClass'}>
                            <div className={'featureText'}>
                                <BsArrowReturnRight /> &nbsp;
                                It's encrypted so you can store it anywhere trustlessly
                            </div>
                        </div>
                    </Col>
                    <Col xs={{span:12, offset:0}} md={{span:6, offset:0}} lg={{span:6, offset:0}}
                    style={{textAlign:'right'}}>
                        <img src={emergencyImg} className={'homepageReasonImage'}/>
                    </Col>
                </Row>

                <Row className={'homepageReasonsRow'}>
                    <Col className={'homepageReasonsCol'} xs={{span:12, offset:0}} md={{span:6, offset:0}} lg={{span:6, offset:0}}>
                        <div className={'rowTitle'}>100% in your control</div>
                        <div className={'rowSubtitle'}>
                            Your vault is created in your browser and is 100% in your
                            control. No clouds or servers are involved.
                        </div>
                        <div className={'featureClass'}>
                            <div className={'featureText'}>
                                <BsArrowReturnRight /> &nbsp;
                                Create your vault while being offline
                            </div>
                        </div>
                    </Col>
                    <Col xs={{span:12, offset:0}} md={{span:6, offset:0}} lg={{span:6, offset:0}}
                         style={{textAlign:'right'}}>
                        <img src={safeWithQR} className={'homepageReasonImage'}/>
                    </Col>
                </Row>



                <Row className={'homepageReasonsRow'}>
                    <Col className={'homepageReasonsCol'} xs={{span:12, offset:0}} md={{span:6, offset:0}} lg={{span:6, offset:0}}>
                        <div className={'rowTitle'}>Social recovery</div>
                        <div className={'rowSubtitle'}>
                            Give a copy of your vault to your successors,
                            without worrying about their cyber security posture.
                            There are no passwords to write down or remember.
                            Successors can recover the vault in emergencies by collecting
                             keys from your circle of trust.
                        </div>
                        <div className={'featureClass'}>
                            <div className={'featureText'}>
                                <BsArrowReturnRight /> &nbsp;
                               For example, 5-out-of-20 keys
                            </div>
                        </div>
                        {/*<div className={'featureClass'}>
                            <div className={'featureText'}>
                                <BsArrowReturnRight /> &nbsp;
                                No passwords to remember or write down
                            </div>
                            <div className={'featureText'}>
                                <BsArrowReturnRight /> &nbsp;
                                Social recovery secured by your quorum of delegates
                            </div>
                        </div>*/}
                    </Col>
                    <Col xs={{span:12, offset:0}} md={{span:6, offset:0}} lg={{span:6, offset:0}}
                         style={{textAlign:'right'}}>
                        <img src={peoplepaper} className={'homepageReasonImage'}/>
                    </Col>
                </Row>







                <Row className={'homepageReasonsRow'}>
                    <Col className={'homepageReasonsCol'} xs={{span:12, offset:0}} md={{span:6, offset:0}} lg={{span:6, offset:0}}>
                        <div className={'rowTitle'}>Secure by design</div>
                        <div className={'rowSubtitle'}>
                           <ul className={'homepageReasonsList'}>
                               <li>
                                   <FaArrowRight />
                                   &nbsp;
                                   <b>Cold storage</b>
                                   &nbsp;
                                   Your vault and keys are created 100% offline, and can be
                                    printed on paper for offline cold storage
                               </li>
                               <li>
                                   <FaArrowRight />
                                   &nbsp;
                                   <b>Open source</b>
                                   &nbsp;
                                   Our unlock utility is &nbsp;
                                   <a className={'linkage'} target="_blank" href="https://github.com/xxbtc/kosign-unlock">available on Github</a>
                                   &nbsp; making your vault future-proof
                               </li>
                               <li>
                                   <FaArrowRight />
                                   &nbsp;
                                   <b>Strong encryption</b>
                                   &nbsp;
                                   Secured with
                                   bank grade AES 256 bits encryption
                               </li>
                           </ul>
                        </div>
                    </Col>
                    <Col xs={{span:12, offset:0}} md={{span:6, offset:0}} lg={{span:6, offset:0}}
                         style={{textAlign:'right'}}>
                        <img src={peopleSafe} className={'homepageReasonImage'}/>
                    </Col>
                </Row>
            </Container>

            <div style={{position:'relative', marginTop:-50}}>
                <img src={layerPeaks} style={{width:'100%', marginBottom:-2}}  />
            </div>

            <div style={{backgroundColor:'#1786ff'}}>
                <Container>
                    <Row className={'homepageReasonsRow'} style={{padding:0, paddingBottom:50}}>
                        <Col className={'homepageReasonsCol'} xs={{span:12, offset:0}} md={{span:12, offset:0}} lg={{span:12, offset:0}}>
                            <div className={'rowTitle'} style={{color:'#fff', textAlign:'center'}}>Solve cyclic dependencies in password management</div>
                            <div className={'rowSubtitle'} style={{color:'#fff', textAlign:'center'}}>
                                The only good way to backup wallet seeds, 2FA keys,
                                and the password to your password manager.
                            </div>
                           {/* <div className={'featureClass'}>
                                <div className={'featureText'}>
                                    <BsArrowReturnRight /> &nbsp;
                                   Never store 2FA keys or your authy password in a password manager
                                </div>
                            </div>*/}
                        </Col>
                    </Row>
                </Container>
            </div>

            <div style={{position:'relative', marginTop:-70, marginBottom:-3}}>
                <img src={layerPeaks} style={{width:'100%'}} className={'flipImage'} />
            </div>


        </div>

    )

}

export default HomepageReasonsNew;
