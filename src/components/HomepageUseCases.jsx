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


function HomepageUseCases(props) {
    const navigate                   = useNavigate();

    useEffect(() => {

    }, []);

    return (
        <div className={'homepageUseCasesRow'}>
            <Container style={{zIndex:100, position:'relative'}}>
                <div className={'rowTitle'}>Long term backup for critical data</div>
                <Row>
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
                </Row>

            </Container>
        </div>

    )

}

export default HomepageUseCases;
