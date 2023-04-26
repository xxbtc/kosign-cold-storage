import React, {Component, useState, useEffect, useRef} from 'react'
import { Link, useNavigate} from 'react-router-dom'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Button} from 'react-bootstrap';
import '../style/index.css';
import '../style/forms.css';

import PDFKeyBackup from "../components/PDFKeyBackup";
import * as htmlToImage from "html-to-image";


function KeyshareSecret(props) {
    const [qrData, setQRdata]                       = useState('');
    const [showPDFKey, setShowPDFKey]               = useState(false);
    const [keyId, setKeyId]                         = useState();
    const refBackupKeyPDF                           = useRef(null);
    const [isPressed, setIsPressed]                 = useState(false);

    useEffect(() => {
        setQRdata(JSON.stringify({keyshare:props.keyshare, ident:props.vaultIdent}));
    }, []);

    useEffect(()=>{
        if (!showPDFKey) return;
        let randomString = generateRandomString(8);
        setKeyId(randomString);
        //hide key every time tab is changed;
        htmlToImage.toJpeg(refBackupKeyPDF.current, { quality: 0.95, cacheBust:true, skipAutoScale:true })
            .then(function (dataUrl) {
                let link = document.createElement('a');
                link.download = 'kosign-key-backup-'+randomString+'.jpeg';
                link.href = dataUrl;
                link.click();
                setShowPDFKey(false);
            });
    }, [showPDFKey]);

    const generateRandomString = (length) => {
        const characters = 'ABCDEFGHJKLMNPRSTUVWXYZabcdefghjkmnpqrstuvwxyz123456789';
        const charactersLength = characters.length;
        let result = '';

        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        return result;
    };

    const downloadKey = () => {
        setShowPDFKey(true);
        setIsPressed(true);
    };

    return (
        <div style={{marginTop:30,marginBottom:30}}>
            <Row>

                <div>
                    <Button
                        className={isPressed?'btn btn-success':'btn btn-primary'}
                        size={'lg'}
                        onClick={() => downloadKey()}
                        disabled={isPressed}
                    >
                        Download Key #{props.i+1}
                    </Button>
                </div>

            </Row>

            {showPDFKey?
            <Row>
                <Col xs={{span:12}} md={{span:12, offset:0}} lg={{span:12, offset:0}}>
                    <div ref={refBackupKeyPDF}>
                        <PDFKeyBackup vaultIdent={props.vaultIdent}
                                      myKey={props.cipherKey}
                                      cipherText={props.cipherText}
                                      shares={props.shares.length}
                                      threshold={props.consensus}
                                      vaultName={props.vaultName}
                                      description={props.description}
                                      keyId={keyId}

                                      cipherIV={props.cipherIV}
                                      unlockShares={props.unlockShares}
                                      vaultUsers={props.vaultUsers}
                                      createdTimestamp={props.createdTimestamp}
                                      myDecryptedKey={qrData} />
                    </div>
                </Col>
            </Row>
            : null }
        </div>
    )

}

export default KeyshareSecret;
