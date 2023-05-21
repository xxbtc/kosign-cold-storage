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
import QRCode2 from 'qrcode'

import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

const PDFKeyBackup = (props) => {



    useEffect(()=>{

    },[]);


    const formatTime = (timestamp) => {
        return moment.tz(new Date(timestamp*1000), 'YYYY-MM-DD', moment.tz.guess()).format('YYYY-MM-DD HH:mm:ss')
    };


    const styles = StyleSheet.create({
        page: {
            backgroundColor: '#fff',

        },
        sectionTop: {
            marginTop:0,
            padding: 40,
            paddingBottom:0,
            paddingTop:40,
            backgroundColor:'#fff',
            marginBottom:20,
            whiteSpace:'normal',
            overflowWrap:'break-word',
           /* borderWidth:4,
            borderColor:'gold',
            borderStyle:'solid',*/
        },
        sectionMiddle: {
            display:'flex',
            flexDirection:'row',
            flex:1,
            paddingTop:0,
            padding:40,
           /* borderWidth:4,
            borderColor:'blue',
            borderStyle:'solid',*/
        },
        sectionBottom: {
            textAlign:'center',
            marginTop:10,
            marginBottom:0,
            fontFamily: "Helvetica-Oblique",
            fontSize:20,
            color:'red',
        },
        sectionRight: {
            textAlign:'center',
            marginBottom:0,
            fontFamily: "Helvetica-Oblique",
            fontSize:20,
            color:'red',
            width:'60%',
        },
        QRWrapper: {
            display:'block',
            paddingTop:60,
            paddingBottom:60,
            marginLeft:'auto',
            marginRight:'auto',
            borderWidth: 4,
            borderColor: 'pink',
            borderStyle: 'solid',
        },
        vaultText: {
            marginBottom:10,
            fontFamily: "Helvetica",
            fontSize:20,
            display:'block',
            overflowWrap:'break-word',
        },
        detailWrapper: {
            borderWidth:1,
            borderRadius:4,
            borderColor:'#ccc',
            borderStyle:'solid',
            padding:20,
            width:'40%'
        },
        vaultTitleWrapper: {
            borderBottomWidth:1,
            borderBottomColor:'#ccc',
            borderBottomStyle:'solid',
            marginBottom:0,
            position:'relative',
        },
        vaultTitle: {
            fontFamily: "Helvetica-BoldOblique",
            fontSize:30,
        },
        vaultTextBold: {
            fontFamily: "Helvetica-Bold",
        },
        timestamp: {
            fontFamily: "Helvetica",
            fontSize:10,
            color:'#999',
            position:'absolute',
            right:0,
            top:6,
        },
        keyAlias: {
            display:'inline-block',
            margin:4,
            marginLeft:0,
            borderWidth:1,
            borderColor:'#ccc',
            borderStyle:'solid',
            fontSize:16,
            paddingTop:1,
            paddingRight:6,
            paddingLeft:6,
            paddingBottom:1,
            backgroundColor:'#ddd',
            borderRadius:15,
            webkitBorderRadius:15,
        }
    });


    let canvas;
    // For QR Code

    let qrdata = JSON.stringify({
        ident:props.keyAlias,
        key: props.myDecryptedKey
    });

    canvas = document.createElement('canvas');
   // console.log('decrypted key is ', props.myDecryptedKey);
    QRCode2.toCanvas(canvas, qrdata);
    const qr = canvas.toDataURL();

//console.log('qr  is ', qr);
    return (
        <div className={props.qrtype==='printable'?'printPage':null}>
            <div style={styles.page}>
                 <div style={styles.sectionTop}>
                    <div style={{display:'flex',flex:1,flexDirection:'row',justifyContent:'space-between'}}>
                        <div style={styles.vaultTitle}>
                            Kosign Vault Key
                            <span className={'alert alert-danger'} style={{display:'inline-block', fontSize:20, padding:8, marginLeft:40, marginBottom:0}}>
                          <b>!! IMPORTANT !!</b>
                      </span>
                        </div>
                        <div>
                            <div style={{display:'inline-block', marginTop:15}}>
                                Page 1 of 1
                            </div>
                        </div>
                    </div>
                 </div>

                 <div style={styles.sectionMiddle}>
                    <div style={styles.detailWrapper}>
                        <div style={styles.vaultText}>
                            <div style={styles.vaultTextBold}>Vault Name:</div>
                            <div>{props.vaultName}</div>
                        </div>
                        {/*<div style={styles.vaultText}>
                            <div style={styles.vaultTextBold}>Description:</div>
                            <div>{props.description}</div>
                        </div>*/}
                        <div style={styles.vaultText}>
                            <div style={styles.vaultTextBold}>Key Alias:</div>
                            <div style={styles.keyAlias}>{props.keyAlias}</div>
                        </div>
                        <div style={styles.vaultText}>
                            <div style={styles.vaultTextBold}>Created:</div>
                            <div>{formatTime(props.createdTimestamp)}</div>
                        </div>
                    </div>
                    <div style={styles.sectionRight}>
                        <div style={styles.QRWrapper}>
                            <div style={{marginBottom:40}}>
                                Keep secure away from cameras.
                            </div>
                            {props.qrtype==='printable'?<QRCode id='qrcodekey' value={qrdata} size={250} />:null}
                            {props.qrtype==='downloadable'?<Image src={qr} style={{maxHeight:350, maxWidth:350}}/>:null}
                        </div>
                    </div>
                </div>

            </div>
            {/*<div className={'pagebreak'}></div>*/}
        </div>
    )

    /*return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.sectionTop}>
                    <View style={styles.vaultTitleWrapper}>
                        <Text style={styles.vaultTitle}>Kosign - Key</Text>
                        <Text style={styles.timestamp}>
                            {formatTime(props.createdTimestamp)}
                        </Text>
                    </View>
                    <View style={styles.vaultText}><Text style={styles.vaultTextBold}>Vault Name:</Text><Text>{props.vaultName}</Text></View>
                    <View style={styles.vaultText}><Text style={styles.vaultTextBold}>Description:</Text><Text>{props.description}</Text></View>
                    {/!*<View><Text>{props.threshold} of {props.shares}</Text></View>*!/}
                </View>
                <View style={styles.sectionBottom}>
                    <View>
                        <Text>
                            Keep secure away from cameras.
                        </Text>
                    </View>
                    <View style={styles.QRWrapper}>
                        <Image src={qr} />
                    </View>
                </View>
            </Page>
        </Document>
    );*/

    /**
     *
     *
     *
     *


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
     {/!*<div className={'vaultBodyRow'}>
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
                                </div>*!/}
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


     {/!* <div className={'vaultBodyRow'}>
                                    <Row>
                                        <Col xs={{span: 12}} md={{span: 4, offset: 0}} lg={{span: 2, offset: 0}}>
                                            <div className={'tableTitle'}>Threshold</div>
                                        </Col>
                                        <Col xs={{span: 12}} md={{span: 8, offset: 0}} lg={{span: 10, offset: 0}}>
                                            <div style={{display: 'inline-block'}}>{props.threshold} of {props.shares}</div>
                                        </Col>
                                    </Row>
                                </div>*!/}

     {/!*<div className={'vaultBodyRow'} style={{borderBottom:0}}>
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
                                </div>*!/}
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
     {/!*<Col xs={{span: 12}} md={{span: 6, offset: 0}} lg={{span: 6, offset: 0}}>
                            <div className={'PDFQRWrapper'}>
                                <div><h3>Cipher IV</h3></div>
                                <QRCode id='qrcodecipheriv' value={props.cipherIV} size={300}/>
                            </div>
                        </Col>*!/}
     </Row>




     </Container>
     </div>



     *
     *
     *
     */
};

export default PDFKeyBackup;
