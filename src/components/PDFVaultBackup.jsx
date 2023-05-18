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

import QRCode2 from 'qrcode';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

const PDFVaultBackup = (props) => {
     //   console.log(props);
        //lets break up the encrypted text into managable qrcode blocks
        if (!props.cipherText) return;
        let maxLengthPerQRCode = props.maxLengthPerQRCode; //characters
        let tmpQRArray = [];
        let canvas;
        let QRText;
        let c = 1;
        let qrPerRow = 2;

        let totalQRCodes = 1;
        for (let i = 0; i < props.cipherText.length; i += maxLengthPerQRCode) {
            totalQRCodes++;
        }
        let metadata = JSON.stringify({
            id:1,
            about:'Kosign Vault',
            qrcodes: totalQRCodes,
            version:1,
            vaultName: props.vaultName,
            description: props.description,
            shares: props.shares.length,
            threshold: props.threshold,
            cipherIV: props.cipherIV,
            keys:props.keyAliasArray
        });

        canvas = document.createElement('canvas');
        QRCode2.toCanvas(canvas, metadata);
        tmpQRArray.push({qrCode:canvas.toDataURL(), id:c, raw:metadata});

        for (let i = 0; i < props.cipherText.length; i += maxLengthPerQRCode) {
            //result.push(props.cipherText.substr(i, maxLengthPerQRCode));
            canvas = document.createElement('canvas');
            c++;
            QRText = JSON.stringify({
                id: c,
                data: props.cipherText.substr(i, maxLengthPerQRCode)
            });
            QRCode2.toCanvas(canvas, QRText);
            tmpQRArray.push({qrCode:canvas.toDataURL(), id:c, raw:(JSON.stringify({id:i+2, data:props.cipherText.substr(i, maxLengthPerQRCode) } ))});
        }

        //console.log('prechunked array is ',tmpQRArray);
        const chunkedArray = [];

        for (let i = 0; i < tmpQRArray.length; i += qrPerRow) {
            chunkedArray.push(tmpQRArray.slice(i, i + qrPerRow));
        }
       //console.log('chunked array is ', chunkedArray);

        //setCipherArray(result);
       // setQRArray(chunkedArray);

    const qrArray = chunkedArray;



    let pageNumber = 0;

    const qrPerPage     = 4;
    const firstPageQR   = 2;

    const totalQRs = qrArray.length*qrPerRow;
    const remainingQRs = totalQRs - firstPageQR;

    const totalPages = 1 + Math.ceil(remainingQRs / qrPerPage);



    //const [qrArray, setQRArray] = useState(chunkedArray);
    //const [cipherArray, setCipherArray] = useState();

    const formatTime = (timestamp) => {
        return moment.tz(new Date(timestamp*1000), 'YYYY-MM-DD', moment.tz.guess()).format('YYYY-MM-DD HH:mm:ss')
    };

    const styles = StyleSheet.create({
        page: {
            flexDirection: 'column',
            backgroundColor: '#fff',
            flex:1,
            width:'100%',
            height:'100%',
            padding:50,
            flexGrow:1,
            display:'flex',
        },
        sectionTop: {
            backgroundColor:'#fff',

            display:'flex',
            flexDirection:'column',
            textAlign:'left',

        },
        detailWrapper: {
            borderWidth:1,
            borderRadius:4,
            borderColor:'#ccc',
            borderStyle:'solid',
            padding:20,
        },
        sectionBottom: {
            display:'block',
            flex:1,
            textAlign:'center',
        },
        QRRow: {
            flexDirection:'row',
            width:'100%',
            display:'flex',
            flex:1,
            justifyContent:'space-around',
            marginTop:0,
            marginBottom:20,

        },
        QRWrapper: {
            display:'flex',
            flexDirection:'column',
            flex:1,
            flexGrow:1,
            padding:0,
            marginTop:10,
            width:'100%',
           /* borderWidth: 4,
            borderColor: 'pink',
            borderStyle: 'solid',*/
            textAlign:'center',
            alignItems:'center',
        },
        QRWrapperMiddle: {
            display:'flex',
            flexDirection:'column',
            flex:1,
            width:'100%',
        },
        QRWrapperInner: {
            /*backgroundColor:'red',*/
            display:'block',
            padding:0,
            marginRight:0,
            marginBottom:0,
            paddingTop:20,
            textAlign:'center',
        },
        QRText: {
            textAlign:'center',
            fontFamily: 'Helvetica-Oblique',
            fontSize:20,
            display:'inline-block',
            marginBottom:20,
        },
        QRImage: {
            width:230,
            height:230,
        },
        vaultText: {
            marginBottom:10,
            fontFamily: "Helvetica",
            fontSize:20,
            display:'block',

        },
        vaultTitleWrapper: {
            marginBottom:0,
            position:'relative',
        },
        vaultTitle: {
            fontFamily: "Helvetica-BoldOblique",
            fontSize:30,

        },
        vaultTextBold: {
            fontFamily: "Helvetica-Bold",
            display:'block',

        },
        vaultVariable: {
            whiteSpace:'normal',
            overflowWrap:'break-word',
            paddingRight:10,
        },
        timestamp: {
            fontFamily: "Helvetica",
            fontSize:10,
            color:'#999',
            position:'absolute',
            right:0,
            top:6,
        },

        alert: {
            backgroundColor:'#cfe2ff',
            color:'#084298',
            padding:20,
            borderColor:'#b6d4fe',
            borderRadius:4,
            fontSize:12,
            fontFamily: "Helvetica",
            marginBottom:20,
            marginTop:20,
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

    const renderQR = (qrData, ii, i) => {

        return (
            <div key={'qrkey'+ii} style={styles.QRWrapperInner}>
                {qrData.id===1?
                    <div style={styles.QRText}>
                        Metadata
                    </div>
                    :
                    <div style={styles.QRText}>Shard #{qrData.id-1}</div>
                }

                <div>
                    {props.qrtype==='printable'?<QRCode id='qrcodekey' value={qrData.raw} size={230} />:null}
                    {props.qrtype==='downloadable'?
                        <Image src={qrData.qrCode} style={styles.QRImage}/>
                        :
                        null
                    }
                </div>
            </div>
        )
    };

    const renderVaultHeader = (page, forceShowFullHeader) => {
        pageNumber++;
        //console.log('xxPAGE IS ', page);
      return (
          <div key={'rowvaultheader_'+pageNumber} style={styles.sectionTop}>
              <div style={{height:60,display:'flex',flex:1,flexDirection:'row',justifyContent:'space-between', alignItems:'center'}}>
                    <div style={styles.vaultTitle}>
                        Kosign Data Vault
                        <span className={'alert alert-danger'} style={{display:'inline-block', fontSize:20, padding:4, paddingTop:0, paddingBottom:0, paddingLeft:10, paddingRight:10, marginLeft:20, marginBottom:0}}>
                            <b>!! IMPORTANT !!</b>
                        </span>
                    </div>
                    <div style={{display:'inline-block'}}>
                        Page {pageNumber}-of-{totalPages}
                    </div>
              </div>
              {forceShowFullHeader?
              <div className={'alert alert-default'} style={{margin:0, padding:10, paddingLeft:0}}>
                  Unlock at <a className={'linkage'} href={'https://kosign.xyz/unlock'}>https://kosign.xyz/unlock</a>
              </div>
              :null}
              <div style={styles.detailWrapper}>
                  <div>
                      <div>
                          <div style={styles.vaultText}>
                              <div style={styles.vaultTextBold}>Vault </div>
                              <div style={styles.vaultVariable}>{props.vaultName}</div>
                          </div>

                          {forceShowFullHeader?
                              <div>
                                  <div style={styles.vaultText}>
                                      <div style={styles.vaultTextBold}>Description </div>
                                      <div style={styles.vaultVariable}>{props.description}</div>
                                  </div>
                                  <div style={styles.vaultText}>
                                      <div style={styles.vaultTextBold}>Keys: </div>
                                      <div style={styles.vaultVariable}>
                                          {props.keyAliasArray.map((val,i)=>
                                              <div key={'aliaskey_'+i} style={styles.keyAlias}>
                                                  {val}
                                              </div>
                                          )}
                                      </div>
                                  </div>
                                  <div style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                                      <div style={styles.vaultText}>
                                          <div style={styles.vaultTextBold}>Threshold</div>
                                          <div style={styles.vaultVariable}>{props.threshold} of {props.shares.length}</div>
                                      </div>
                                      <div style={{marginLeft:20}}>
                                          <div style={styles.vaultText}>
                                              <div style={styles.vaultTextBold}>Created</div>
                                              <div style={styles.vaultVariable}>{formatTime(props.createdTimestamp)}</div>
                                          </div>
                                      </div>
                                  </div>

                              </div>
                              : null
                          }
                      </div>


                  </div>
              </div>

              {/*<div><div>{props.threshold} of {props.shares}</div></div>*/}
          </div>
      )
    };

    return (
        <div style={styles.page}>

            {renderVaultHeader(1, true)}

            <div style={styles.sectionBottom}>
                <div style={styles.QRWrapper}>
                    {qrArray.map((row, i) =>
                        <div key={'anotherkey'+i} style={styles.QRWrapperMiddle}>
                            {i % 2 === 1?
                                <div>
                                    <div className={'pagebreak'}></div>
                                    <div style={{marginTop:50}}>
                                        {renderVaultHeader(i, false)}
                                    </div>
                                </div>
                                :null
                            }
                            <div>
                                <div key={'qrrowid'+i} style={styles.QRRow}>
                                    {row.map((qrData, ii) => renderQR(qrData, ii, i))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

   /* return (
        <Document
            author      = {'kosign.xyz'}
            producer    = {'kosign.xyz'}
            creator     = {'kosign.xyz'}
            subject     = {props.vaultName}
            title       = {'Kosign Vault'}
        >
            <Page size="A4" style={styles.page}>

                <View style={styles.vaultTitleWrapper} fixed>
                    <Text style={styles.vaultTitle}>Kosign - Vault</Text>
                    <View style={styles.timestamp}>
                            <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
                                `page ${pageNumber} of ${totalPages}`
                            )} fixed />
                    </View>

                    <View style={styles.vaultText} render={({ pageNumber, totalPages }) => {
                        return(<View>{pageNumber > 1 ? <Text>{props.vaultName}</Text> : null}</View>)
                    }}>
                        <Text style={styles.vaultTextBold}>Vault Name:</Text>

                    </View>

                </View>

                <View style={styles.sectionTop}>
                    <View style={styles.vaultText}>
                        <Text>
                            <Text style={styles.vaultTextBold}>Vault Name: </Text>
                            <Text>{props.vaultName}</Text>
                        </Text>
                    </View>
                    <View style={styles.vaultText}>
                        <Text>
                            <Text style={styles.vaultTextBold}>Description: </Text>
                            <Text>{props.description}</Text>
                        </Text>
                    </View>
                    <View style={styles.vaultText}>
                        <Text>
                            <Text style={styles.vaultTextBold}>Threshold: </Text>
                            <Text>{props.threshold} of {props.shares.length}</Text>
                        </Text>
                    </View>
                    <View style={styles.vaultText}>
                        <Text>
                            <Text style={styles.vaultTextBold}>Created: </Text>
                            <Text>{formatTime(props.createdTimestamp)}</Text>
                        </Text>
                    </View>

                    {/!*<View><Text>{props.threshold} of {props.shares}</Text></View>*!/}
                </View>

                <View style={styles.sectionBottom}>
                    <View style={styles.alert} fixed>
                        <Text>
                            Keep secure and away from cameras.
                        </Text>
                    </View>
                    <View style={styles.QRWrapper}>
                        {qrArray.map((row) =>
                            <View style={styles.QRRow} wrap={false}>
                                {row.map((qrData) => renderQR(qrData))}
                            </View>
                        )}
                    </View>
                </View>
            </Page>
        </Document>
    );*/



    /*return (
        <Layout>

            <div className={'pageWrapper PDFDocument'}>

                <Container>
                    <div className={'pageNavWrapper'}>
                        <Row>
                            <Col xs={{span: 12}} md={{span: 6, offset: 0}} lg={{span: 6, offset: 0}}>
                                <h2 className={'pageTitle'}>Kosign Vault: {props.vaultName}</h2>
                            </Col>
                            <Col xs={{span: 12}} md={{span: 6, offset: 0}} lg={{span: 6, offset: 0}}>
                                {/!*<div className={'PDFInstructions'}>
                                    Recover at: <Link to={'/recover'}>https://kosign.xyz/recover</Link>
                                </div>*!/}
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
                               {/!* <div className={'vaultBodyRow'}>
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
                        {/!*<Col xs={{span: 12}} md={{span: 6, offset: 0}} lg={{span: 6, offset: 0}}>
                            <div className={'PDFQRWrapper'}>
                                <div><h3>Cipher IV</h3></div>
                                <QRCode id='qrcodecipheriv' value={props.cipherIV} size={300}/>
                            </div>
                        </Col>*!/}
                    </Row>




                </Container>
            </div>
        </Layout>
    )*/
};

export default PDFVaultBackup;
