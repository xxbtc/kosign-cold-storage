import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Layout from "../components/Layout";
import {Container,  Button, Modal} from 'react-bootstrap';
import {EncryptionService} from "../services/EncryptionService";

import '../style/index.css';
import '../style/createPage.css';
import '../style/forms.css';

import Navbar from "../components/NavbarTop";
import { QrReader } from 'react-qr-reader';

import Lottie from 'lottie-react-web'
import LottieAnimation from '../animations/5427-scan-qr-code.json'
import LottieAnimationSuccess  from '../animations/97240-success'


function RecoverPage() {

    const navigate              = useNavigate();
    const [showScanner, setShowScanner] = useState(false);
    const [processing, setProcessing]   = useState(false);
    const [didScanSomething, setDidScanSomething] = useState(false);

    const [scanTitle, setScanTitle]     = useState('Scan Vault Contents');
    const [cipherIV, setCipherIV]       = useState();
    const [cipherData, setCipherData]   = useState();
    const [metadata, setMetadata]       = useState();
    const [scanMember, setScanMember]   = useState(1);
    const [unlockShares, setUnlockShares] = useState([]);
    const [scanType, setScanType]         = useState('vault');

    const [unlocked, setUnlocked] = useState(false);

    const [decryptionResult, setDecryptionResult] = useState();

    const doContinue = () => {
        setDidScanSomething(false);

        if (!cipherData) {
            setScanTitle('Scan Vault Contents QR code');
        } else if (!metadata) {
            setScanTitle('Scan Metadata QR code');
        } else {
            setScanTitle('Scan key '+scanMember+' out of '+metadata.shares);
        }
    };

    const scannedSomething = (data) => {
        if (processing) return;
        setProcessing(true);
        let jsonObject;
        //TODO: make sure its a valid data object and not some random qr code.

       if (scanType==='vault') {
            if (!cipherData) {
                setCipherData(data);
                setScanTitle('Success');
            } else {
                jsonObject = JSON.parse(data);
                setMetadata(jsonObject);
                setCipherIV(jsonObject.cipherIV);
                setScanType('key');
            }
            setProcessing(false);
            setDidScanSomething(true);
           return;
        }

       //scanType is now 'key' so we scan keys
        setDidScanSomething(true);
        jsonObject = JSON.parse(data);
        console.log('scanned key ', jsonObject);

        let tmpShares = unlockShares;
        tmpShares.push(jsonObject.keyshare);
        console.log('tmpshares are ', tmpShares);
        setUnlockShares(tmpShares);
        //updateShares(scanMember, jsonObject.keyshare);
        setScanMember(scanMember+1);
        setProcessing(false);
        setScanTitle('Scan key '+scanMember+' out of '+metadata.shares);

        if (scanMember>=metadata.shares) {
           setShowScanner(false);
           unlockVault();
        }
    };


    const unlockVault = ()=> {
        EncryptionService.combineShares(unlockShares).then((cipherKey) => {
            EncryptionService.decrypt(
                cipherData,
                cipherKey,
                cipherIV
            ).then((decryptionResult) => {
                setUnlocked(true);
                setDecryptionResult(decryptionResult);
            })
        });
    };


    if (unlocked) {
        return (
            <Layout>
                <Navbar />
                <div className={'pageWrapper'}>
                    <Container>
                        <Row>
                            <Col xs={{span: 12, offset: 0}} md={{span: 12, offset: 0}} lg={{span: 6, offset: 3}}>
                                <div>
                                    <div>
                                        <h2 className={'pageTitle'}>Vault Unlocked</h2>
                                    </div>
                                    <div style={{marginTop: 10, marginBottom:30}}>
                                        <div className={'alert alert-success'}>
                                            Vault contents are displayed below (if you entered your keys correctly)
                                        </div>
                                        <textarea
                                            value={decryptionResult}
                                            disabled={true}
                                            className={'form-control'}
                                            placeholder={''}
                                            style={{height:300}}
                                        />
                                    </div>

                                    <Button
                                        variant={'primary'}
                                        size={'lg'}
                                        onClick={() => navigate('/')}
                                    >
                                        Close
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </Layout>
        )
    }



    return (
        <Layout>
            <Navbar loggedIn/>
            <div className={'pageWrapper'}>
                <Container>
                    <Row>
                        <Col xs={{span: 12, offset: 0}} md={{span: 12, offset: 0}} lg={{span: 6, offset: 3}}>
                            <div className={'pageNavWrapper'}>
                                <div>
                                    <h2 className={'pageTitle'}>Recover a vault</h2>
                                </div>
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={{span: 12, offset: 0}} md={{span: 12, offset: 0}} lg={{span: 6, offset: 3}}>
                            <div className={'pageWrapperInner'}>
                                <Row style={{alignItems: 'center', position:'relative'}}>
                                    <Col xs={{span: 12, offset: 0}} md={{span: 12, offset: 0}} lg={{span: 12, offset: 0}}>
                                        {showScanner ?
                                            <div>
                                                <div className={'alert alert-info'} style={{marginBottom:0}}>{scanTitle}</div>

                                                {didScanSomething ?
                                                    <div>
                                                        <Lottie
                                                            options={{
                                                                animationData: LottieAnimationSuccess,
                                                                loop: false
                                                            }}
                                                            width={200}
                                                            height={200}
                                                        />
                                                    </div>
                                                    :
                                                    <QrReader
                                                        onResult={(result, error) => {
                                                            if (!!result) {
                                                                scannedSomething(result?.text);
                                                            }
                                                            if (!!error) {
                                                                console.info(error);
                                                            }
                                                        }}

                                                        containerStyle={{width: '400px'}}
                                                        videoStyle={{width: '400px'}}
                                                    />
                                                }

                                                <div style={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                                                    <Button className={'btn btn-default'}  size={'lg'} onClick={() => setShowScanner(false)}>
                                                        Cancel
                                                    </Button>
                                                    {didScanSomething ?
                                                        <Button className={'btn btn-primary'}  size={'lg'} onClick={() => doContinue()}>
                                                            Continue
                                                        </Button>
                                                        :
                                                        null
                                                    }
                                                </div>
                                            </div>
                                            :
                                            <div>
                                                <div className={'alert alert-warning'}>
                                                    Scan the encrypted vault data to begin recovery.
                                                </div>
                                                <Link to={'#'} onClick={() => setShowScanner(true)}>
                                                    <div>
                                                        <Lottie
                                                            options={{
                                                                animationData: LottieAnimation
                                                            }}
                                                            width={100}
                                                            height={100}
                                                        />
                                                    </div>
                                                </Link>
                                                <div style={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    flex: 1
                                                }}>
                                                    <div>
                                                        <Button
                                                            variant={'primary'}
                                                            size={'lg'}
                                                            onClick={() => setShowScanner(true)}
                                                        >
                                                            Start QR Scan
                                                        </Button>
                                                    </div>

                                                </div>
                                            </div>
                                        }

                                    </Col>
                                </Row>
                        </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </Layout>
    )

}

export default RecoverPage;


