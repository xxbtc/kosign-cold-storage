import React, { useEffect } from 'react'
import moment from 'moment-timezone';
import QRCode from 'qrcode.react';
import QRCode2 from 'qrcode'
import {StyleSheet, Image } from '@react-pdf/renderer';

const PDFKeyBackup = (props) => {

    const formatTime = (timestamp) => {
        return moment.tz(new Date(timestamp*1000), 'YYYY-MM-DD', moment.tz.guess()).format('YYYY-MM-DD HH:mm:ss')
    };

    const styles = StyleSheet.create({
        page: {
            backgroundColor: '#fff',

        },
        printPage: {
            pageBreakBefore: 'always',
            height: 'auto !important',
            overflow: 'initial !important',
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
        },
        alertDanger: {
            backgroundColor:'#f8d7da',
            color: '#721c24',
            borderWidth:1,
            borderColor:'#f5c6cb',
            borderStyle:'solid',
            display:'inline-block',
            fontSize:20,
            padding:4,
            paddingTop:0,
            paddingBottom:0,
            paddingLeft:10,
            paddingRight:10,
            marginLeft:20,
            marginBottom:10
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
        <div style={props.qrtype==='printable'?styles.printPage:null}>
            <div style={styles.page}>
                 <div style={styles.sectionTop}>
                    <div style={{display:'flex',flex:1,flexDirection:'row',justifyContent:'space-between'}}>
                        <div style={styles.vaultTitle}>
                            Kosign Vault Key
                            <span style={styles.alertDanger}>
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
        </div>
    )

};

export default PDFKeyBackup;
