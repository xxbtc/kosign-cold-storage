import React, { Component, useState, useEffect } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Layout from "../components/Layout";
import {Button, Carousel, CarouselItem, Form, FormGroup, FormLabel, FormText} from 'react-bootstrap';
import '../style/index.css';
import '../style/forms.css';
import '../style/dashboardPage.css';
import {BiError} from 'react-icons/bi';
import {FaLock} from 'react-icons/fa';

import moment from 'moment-timezone';

import { jsPDF } from "jspdf";
import QRCode from 'qrcode.react';

const PDFVaultBackup = (props) => {

    useEffect(()=>{

    },[]);

    let metadata = JSON.stringify({
        vaultIdent: props.vaultIdent,
        description: props.description,
        /*ownerLocked: props.ownerLocked,*/
        shares: props.shares.length,
        threshold: props.threshold,
        vaultName: props.vaultName,
        cipherIV: props.cipherIV
    });

    const formatTime = (timestamp) => {
        return moment.tz(new Date(timestamp*1000), 'YYYY-MM-DD', moment.tz.guess()).format('YYYY-MM-DD HH:mm:ss')
    };

    return (
        <Layout>

            <div className={'pageWrapper PDFDocument'}>

                <Container>
                    <div className={'pageNavWrapper'}>
                        <Row>
                            <Col xs={{span: 12}} md={{span: 6, offset: 0}} lg={{span: 6, offset: 0}}>
                                <h2 className={'pageTitle'}>Kosign Vault: {props.vaultName}</h2>
                            </Col>
                            <Col xs={{span: 12}} md={{span: 6, offset: 0}} lg={{span: 6, offset: 0}}>
                                {/*<div className={'PDFInstructions'}>
                                    Recover at: <Link to={'/recover'}>https://kosign.xyz/recover</Link>
                                </div>*/}
                            </Col>
                        </Row>
                    </div>

                    <Row>
                        <Col xs={{span: 12}} md={{span: 12, offset: 0}} lg={{span: 12, offset: 0}}>
                            <div className={'vaultPageInnerWrapper'}>
                                <div className={'vaultBodyRow'}>
                                    <Row>
                                        <Col xs={{span: 12}} md={{span: 4, offset: 0}} lg={{span: 2, offset: 0}}>
                                            <div className={'tableTitle'}>Vault Name</div>
                                        </Col>
                                        <Col xs={{span: 12}} md={{span: 8, offset: 0}} lg={{span: 10, offset: 0}}>
                                            <div className={'longHash'}>{props.vaultName}</div>
                                        </Col>
                                    </Row>
                                </div>
                                <div className={'vaultBodyRow'}>
                                    <Row>
                                        <Col xs={{span: 12}} md={{span: 4, offset: 0}} lg={{span: 2, offset: 0}}>
                                            <div className={'tableTitle'}>Vault ID</div>
                                        </Col>
                                        <Col xs={{span: 12}} md={{span: 8, offset: 0}} lg={{span: 10, offset: 0}}>
                                            <div className={'longHash'}>{props.vaultIdent}</div>
                                        </Col>
                                    </Row>
                                </div>
                                <div className={'vaultBodyRow'}>
                                    <Row>
                                        <Col xs={{span: 12}} md={{span: 4, offset: 0}} lg={{span: 2, offset: 0}}>
                                            <div className={'tableTitle'}>Description</div>
                                        </Col>
                                        <Col xs={{span: 12}} md={{span: 8, offset: 0}} lg={{span: 10, offset: 0}}>
                                            <div className={'longHash'}>{props.description}</div>
                                        </Col>
                                    </Row>
                                </div>
                               {/* <div className={'vaultBodyRow'}>
                                    <Row>
                                        <Col xs={{span: 12}} md={{span: 4, offset: 0}} lg={{span: 2, offset: 0}}>
                                            <div className={'tableTitle'}>Owner
                                            </div>
                                        </Col>
                                        <Col xs={{span: 12}} md={{span: 8, offset: 0}} lg={{span: 10, offset: 0}}>
                                            <div style={{display: 'inline-block'}}>
                                                <Avatar name={owner.username} size={40} round="60px"
                                                    color={'#999'}/>
                                                <span>{props.owner.username}</span>
                                            </div>
                                        </Col>

                                    </Row>
                                </div>*/}
                                <div className={'vaultBodyRow'}>
                                    <Row>
                                        <Col xs={{span: 12}} md={{span: 4, offset: 0}} lg={{span: 2, offset: 0}}>
                                            <div className={'tableTitle'}>Created</div>
                                        </Col>
                                        <Col xs={{span: 12}} md={{span: 8, offset: 0}} lg={{span: 10, offset: 0}}>
                                            <div style={{display: 'inline-block'}}>
                                                {formatTime(props.createdTimestamp)}
                                            </div>
                                        </Col>
                                    </Row>
                                </div>


                                <div className={'vaultBodyRow'}>
                                    <Row>
                                        <Col xs={{span: 12}} md={{span: 4, offset: 0}} lg={{span: 2, offset: 0}}>
                                            <div className={'tableTitle'}>Threshold</div>
                                        </Col>
                                        <Col xs={{span: 12}} md={{span: 8, offset: 0}} lg={{span: 10, offset: 0}}>
                                            <div style={{display: 'inline-block'}}>{props.threshold} of {props.shares.length}</div>
                                        </Col>
                                    </Row>
                                </div>


                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={{span: 6}} md={{span: 6, offset: 0}} lg={{span: 6, offset: 0}}>
                            <div className={'PDFQRWrapper'} style={{paddingTop:0}}>
                                <div className="alert alert-success">Encrypted</div>
                                <div><h3>Vault Contents</h3></div>
                                <QRCode id='qrcodeciphertext' value={props.cipherText} size={350}/>
                            </div>
                        </Col>
                        <Col xs={{span: 6}} md={{span: 6, offset: 0}} lg={{span: 6, offset: 0}}>
                            <div className={'PDFQRWrapper'} style={{paddingTop:0}}>
                                <div className="alert">&nbsp;</div>
                                <div><h3>Metadata</h3></div>
                                <QRCode id='qrcodemetadata' value={metadata} size={350}/>
                            </div>
                        </Col>
                        {/*<Col xs={{span: 12}} md={{span: 6, offset: 0}} lg={{span: 6, offset: 0}}>
                            <div className={'PDFQRWrapper'}>
                                <div><h3>Cipher IV</h3></div>
                                <QRCode id='qrcodecipheriv' value={props.cipherIV} size={300}/>
                            </div>
                        </Col>*/}
                    </Row>




                </Container>
            </div>
        </Layout>
    )
};

export default PDFVaultBackup;
