import React, { useEffect } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Layout from "../components/Layout";
import '../style/index.css';
import '../style/forms.css';
import '../style/dashboardPage.css';

import moment from 'moment-timezone';
import QRCode from 'qrcode.react';

const PDFKeyBackup = (props) => {

    useEffect(()=>{

    },[]);


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
                                <h2 className={'pageTitle'}>Kosign Vault Key: {props.vaultName}</h2>
                            </Col>
                            <Col xs={{span: 12}} md={{span: 6, offset: 0}} lg={{span: 6, offset: 0}}>
                                <div className={'PDFInstructions'}>
                                    Important! Please keep this document secure.
                                </div>
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
                                            <div className={'tableTitle'}>Key ID</div>
                                        </Col>
                                        <Col xs={{span: 12}} md={{span: 8, offset: 0}} lg={{span: 10, offset: 0}}>
                                            <div className={'longHash'}>{props.keyId}</div>
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
                                {/*<div className={'vaultBodyRow'}>
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


                               {/* <div className={'vaultBodyRow'}>
                                    <Row>
                                        <Col xs={{span: 12}} md={{span: 4, offset: 0}} lg={{span: 2, offset: 0}}>
                                            <div className={'tableTitle'}>Threshold</div>
                                        </Col>
                                        <Col xs={{span: 12}} md={{span: 8, offset: 0}} lg={{span: 10, offset: 0}}>
                                            <div style={{display: 'inline-block'}}>{props.threshold} of {props.shares}</div>
                                        </Col>
                                    </Row>
                                </div>*/}

                                {/*<div className={'vaultBodyRow'} style={{borderBottom:0}}>
                                    <Row>
                                        <Col xs={{span: 12}} md={{span: 4, offset: 0}} lg={{span: 2, offset: 0}}>
                                            <div className={'tableTitle'}>Key Guardians</div>
                                        </Col>
                                        <Col xs={{span: 12}} md={{span: 8, offset: 0}} lg={{span: 10, offset: 0}}>
                                            <div>
                                                <div className={'keyholdersSectionWrapper'} >
                                                    {props.unlockShares.map((share, i) => {
                                                        if (props.vaultUsers[i]) {
                                                            return (
                                                                <div key={'share_' + i} className={'keyholderWrapper alert-success'}>
                                                                    <span className={'avatarWrapper'}>
                                                                        {props.vaultUsers[i].hasKeys ?
                                                                            <FaLock className={'avatarBadge hasKeys'}/> :
                                                                            <BiError className={'avatarBadge noKeys'}/>}
                                                                    </span>
                                                                    {props.vaultUsers[i].username}
                                                                    <div className={'keyStatusAlertWrapper'}>{props.vaultUsers[i].hasKeys ?
                                                                        <div className={'text-success keyStatusAlert'}>Accepted</div> :
                                                                        <div className={'text-danger keyStatusAlert'}>Pending</div>}
                                                                    </div>
                                                                </div>
                                                            );
                                                        } else {
                                                            return (
                                                                <div key={'share_' + i} className={'keyholderWrapper alert-danger'}>
                                                                    <span className={'avatarWrapper'}>
                                                                        <BiError className={'avatarBadge noKeys'}/>
                                                                    </span>
                                                                    <i>?????</i>
                                                                    <div className={'keyStatusAlertWrapper'}>
                                                                        <div className={'text-danger keyStatusAlert'}>Pending</div>
                                                                    </div>
                                                                </div>
                                                            )
                                                        }
                                                    })}
                                                </div>

                                            </div>
                                        </Col>
                                    </Row>
                                </div>*/}
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={{span: 12}} md={{span: 12, offset: 0}} lg={{span: 12, offset: 0}}>
                            <div className={'PDFQRWrapper'} style={{paddingTop:0}}>
                                <div className="alert alert-danger">Unencrypted key. Keep secure. Keep away from cameras.</div>
                                <div style={{marginTop:50}}>
                                <QRCode id='qrcodekey' value={props.myDecryptedKey} size={300} />
                                </div>
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

export default PDFKeyBackup;
