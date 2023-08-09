import React, { Component, useState, useEffect, useRef } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import '../style/index.css';
import '../style/homepage.css';

import Container from 'react-bootstrap/Container';
import {FaCheckCircle} from 'react-icons/fa';
import {BsArrowReturnRight} from 'react-icons/bs';
import {Button} from "reactstrap";
import {FaCheck} from 'react-icons/fa';


function HomepageUseCases(props) {
    const navigate                   = useNavigate();

    useEffect(() => {

    }, []);

    return (
        <div className={'homepageUseCasesRow'}>
            <Container style={{zIndex:100, position:'relative'}}>
                <div className={'rowTitle'}>Easy cold storage for everyone</div>


                <Row>
                    <Col className={'featureCol'} xs={{span:12, offset:0}} md={{span:4, offset:0}} lg={{span:4, offset:0}}>
                        <div className={'featureClass'}>
                            <div>
                                <span className={'featureNumber'}>
                                    1
                                </span>
                                <div className={'featureTitle'}>Create a vault</div>
                            </div>

                            <div className={'featureText'}>
                                Store passwords and secrets in a secure encrypted vault that you can print on paper
                            </div>
                            <div className={'featureTextAdditional'}>
                                <BsArrowReturnRight /> 100% offline
                            </div>
                            {/*<div className={'featureTextAdditional'}>
                                <BsArrowReturnRight /> Keep geo-separated copies for disasters
                            </div>

                            <div className={'featureTextAdditional'}>
                                <BsArrowReturnRight /> Give a copy to your successors for inheritance
                            </div>*/}

                           {/* <div className={'featureTextAdditional'}>
                                <BsArrowReturnRight />  Encryption keys are is generated in your browser to lock your vault.
                            </div>*/}
                        </div>
                    </Col>
                    <Col className={'featureCol'} xs={{span:12, offset:0}} md={{span:4, offset:0}} lg={{span:4, offset:0}}>
                        <div className={'featureClass'}>
                            <div>
                                <span className={'featureNumber'}>
                                    2
                                </span>
                                <div className={'featureTitle'}>Mint keys</div>
                            </div>
                            <div className={'featureText'}>
                                Print keys and set how many are needed to unlock
                            </div>
                            <div className={'featureTextAdditional'}>
                                <BsArrowReturnRight /> For example 5-out-of-20 keys
                            </div>
                            {/*<div className={'featureTextAdditional'}>
                                <BsArrowReturnRight /> No passwords to remember
                            </div>
                            <div className={'featureTextAdditional'}>
                                <BsArrowReturnRight /> Keep keys with friends and family for emergency
                            </div>*/}
                        </div>
                    </Col>
                    <Col className={'featureCol'} xs={{span:12, offset:0}} md={{span:4, offset:0}} lg={{span:4, offset:0}}>
                        <div className={'featureClass'}>
                            <div>
                                <span className={'featureNumber'}>
                                    3
                                </span>
                                <div className={'featureTitle'}>Unlock</div>
                            </div>
                            <div className={'featureText'}>
                                Scan keys and unlock
                            </div>
                            <div className={'featureTextAdditional'}>
                                <BsArrowReturnRight /> Open source unlock tool
                            </div>
                           {/* <div className={'featureTextAdditional'}>
                                <BsArrowReturnRight /> Unlock even if Kosign is offline
                            </div>*/}
                        </div>
                    </Col>
                </Row>


                {/*<Row>
                    <Col xs={{span:12, offset:0}} md={{span:4, offset:0}} lg={{span:4, offset:0}}>
                        <div  className={'useCase'}>
                            <span>
                                 Passwords
                            </span>
                        </div>
                        <div className={'useCase'}>
                            <span>
                               2FA backups
                            </span>
                        </div>
                    </Col>
                    <Col xs={{span:12, offset:0}} md={{span:4, offset:0}} lg={{span:4, offset:0}}>
                        <div className={'useCase'}>
                            <span>
                               Digital assets
                            </span>
                        </div>
                        <div className={'useCase'}>
                            <span>
                               Financial data
                            </span>
                        </div>
                    </Col>
                    <Col xs={{span:12, offset:0}} md={{span:4, offset:0}} lg={{span:4, offset:0}}>
                        <div className={'useCase'}>
                            <span>
                                 Account Recovery Codes
                            </span>
                        </div>
                        <div className={'useCase'}>
                            <span>
                                Private Keys
                            </span>
                        </div>
                    </Col>
                </Row>*/}

            </Container>
        </div>

    )

}

export default HomepageUseCases;
