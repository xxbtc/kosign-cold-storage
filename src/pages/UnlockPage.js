import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Layout from "../components/Layout";
import {Container,  Button, Modal} from 'react-bootstrap';
import {EncryptionService} from "../services/EncryptionService";
import { VAULT_VERSIONS } from '../config/vaultConfig';

import '../style/index.css';
import '../style/createPage.css';
import '../style/forms.css';
import '../style/unlockPage.css';

import Navbar from "../components/NavbarTop";
import { QrReader } from 'react-qr-reader';

import {AiOutlineQrcode} from 'react-icons/ai';

import {FaChevronRight, FaLock, FaLockOpen, FaInfoCircle, FaCheck, FaShieldAlt, FaLightbulb} from 'react-icons/fa';
import {MdWarningAmber} from 'react-icons/md';

import {ImKey} from 'react-icons/im';

import Lottie from 'lottie-react-web'
import LottieAnimation from '../animations/5427-scan-qr-code.json'
import LottieAnimationSuccess  from '../animations/97240-success'
import {Oval} from 'react-loading-icons';
import PreparationStep from '../components/PreparationStep';
import ProgressStepper from '../components/ProgressStepper';
import VaultMetadata from '../components/VaultMetadata';
function UnlockPage() {

    const navigate              = useNavigate();
    const [showScanner, setShowScanner] = useState(false);
    const [processing, setProcessing]   = useState(false);
    const [didScanSomething, setDidScanSomething] = useState(false);

    const [scanTitle, setScanTitle]     = useState('Scan Vault Contents');
    const [cipherIV, setCipherIV]       = useState();
    const [cipherData, setCipherData]   = useState('');
    const [metadata, setMetadata]       = useState();
    const [scanMember, setScanMember]   = useState(1);
    const [unlockShares, setUnlockShares] = useState([]);
    const [scanType, setScanType]         = useState('vault');
    const [numOfQRsScanned, setNumOfQRsScanned] = useState(0);
    const [numOfQRKEYSsScanned, setNumOfQRKEYSsScanned] = useState(0);
    const [showScanNextData, setShowScanNextData] = useState(false);
    const [wizardStep, setWizardStep]   = useState(1);
    const [unlocked, setUnlocked] = useState(false);
    const [decryptionResult, setDecryptionResult] = useState();
    const [isProcessing, setIsProcessing] = useState();
    const [keyAliasArray, setKeyAliasArray] = useState([]);
    const [scannedKeys, setScannedKeys] = useState([]);
    const [isOnline, setIsOnline]   = useState(navigator.onLine);

    useEffect(() => {
        const handleOnline = () => setIsOnline(navigator.onLine);
        const handleOffline = () => setIsOnline(navigator.onLine);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            cleanupSensitiveData();
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);



    useEffect(()=>{
        if (!metadata) return;
        if (numOfQRsScanned>=metadata.qrcodes) {
      //      console.log('i set the scan type to key');
            setScanType('key');
        }
    }, [numOfQRsScanned]);

    useEffect(() => {
        if (!metadata) return;
        //console.log('metadata ', metadata, numOfQRKEYSsScanned);
        if (numOfQRKEYSsScanned>=metadata.threshold) {
            unlockVault();
            return;
        }
    },[numOfQRKEYSsScanned])

    const scannedVault = (data) => {
        let jsonObject = JSON.parse(data);

        if ((numOfQRsScanned===0) && (jsonObject.id !==1)) {
            alert ('please scan the metadata QR from your vault backup');
            setIsProcessing(false);
            return;
        }

        if (jsonObject.id===1) {
            // Version validation
            if (!jsonObject.version) {
                // Assume version 1 for backward compatibility
                jsonObject.version = '1';
            } else if (!VAULT_VERSIONS[jsonObject.version]) {
                alert('This vault was created with a newer version of Kosign. Please update your software.');
               // setIsProcessing(false);
               // return;
            }
            
            setMetadata(jsonObject);
        } else {
            if (jsonObject.id !== (numOfQRsScanned+1)) {
                alert('please scan shard #' + (numOfQRsScanned));
                setIsProcessing(false);
                return;
            }
            setCipherData(cipherData+jsonObject.data);
        }
        setNumOfQRsScanned(jsonObject.id);
        setIsProcessing(false);
    };

    const scannedKey= (data) => {
       // console.log('scanned key ', data);
        //console.log('scanned a key', data);
        //let jsonObject  = JSON.parse(data);
        //setCipherData(cipherData+data);
        if (unlockShares.includes(data.key)) {
            setIsProcessing(false);
            return;
        }

        unlockShares.push(data.key);
        setUnlockShares(unlockShares);

        let tmpScannedKeys = scannedKeys;

        tmpScannedKeys.push(data.ident);
        setScannedKeys(tmpScannedKeys);
       // console.log('unlock sharesi snow ', unlockShares);
        setNumOfQRKEYSsScanned(numOfQRKEYSsScanned+1);
        setIsProcessing(false);
    }


    const scannedSomething = (data, error) => {
        if (error) {
            return;
        }
       // console.log('scanned SOMETHING', data);
       // console.log('processing is ', isProcessing, scanType);
        if (isProcessing) return;
        //isProcessing = true;
        setIsProcessing(true);

        if (scanType==='vault') {
            scannedVault(data);
        } else if (scanType==='key'){
            scannedKey(JSON.parse(data));
        }
    };


    const unlockVault = ()=> {
        if (metadata.threshold===1) {
            EncryptionService.decrypt(
                cipherData,
                unlockShares[0],
                metadata.cipherIV,
                metadata.version 
            ).then((decryptionResult) => {
                setUnlocked(true);
                setDecryptionResult(decryptionResult);
            }).catch(error => {
                alert('Decryption failed: ' + error.message);
                setUnlocked(false);
            });
        } else {
            EncryptionService.combineShares(unlockShares).then((cipherKey) => {
                EncryptionService.decrypt(
                    cipherData,
                    cipherKey,
                    metadata.cipherIV,
                    metadata.version 
                ).then((decryptionResult) => {
                    setUnlocked(true);
                    setDecryptionResult(decryptionResult);
                }).catch(error => {
                    alert('Decryption failed: ' + error.message);
                    setUnlocked(false);
                });
            });
        }
    };


    const getClassType = (index, rowType) => {
        let returnClass = ' unlockrowItem ';
        if (scanType==='vault' && rowType==='vault') {
            returnClass = returnClass + ' unlockrowItemVault ';
            if (numOfQRsScanned-1>=index) {
                returnClass = returnClass + ' unlockrowItemSuccess ';
                return returnClass;
            }
            if (index===numOfQRsScanned) {
                returnClass = returnClass + ' activeQR ';
                return returnClass;
            }
           // return returnClass;
        }

        if (scanType==='key' && rowType==='key') {
            let returnClass = ' unlockrowItem ';
            returnClass = returnClass + ' unlockrowItemKey ';
            //console.log('does ',metadata.keys[index].alias, 'equal ', scannedKeys);
            if (scannedKeys.includes(metadata.keys[index].alias)) {
                return returnClass + ' unlockrowItemSuccess ';
            }
            /*if (numOfQRKEYSsScanned-1>=index) {
                returnClass = returnClass + ' unlockrowItemSuccess';
                return returnClass;
            }
            if (index===numOfQRKEYSsScanned) {
                returnClass = returnClass + ' activeQR';
                return returnClass;
            }*/
        }

        if (scanType==='key' && rowType==='vault') {
            returnClass = returnClass + ' unlockrowItemSuccess ';
        }

        return returnClass;
    };

    const getKeyClass = (keyname) => {
        let returnClass = ' unlockrowItem ';
        if (scannedKeys.includes(keyname)) {
            return returnClass + ' unlockrowItemSuccess ';
        }
        if (scanType === 'key' && !scannedKeys.includes(keyname)) {
            return returnClass + ' activeQR ';
        }
        return returnClass;
    }

    const InfoTooltip = ({ text }) => (
        <span className="info-tooltip">
            <FaInfoCircle className="ms-2" style={{ fontSize: 14, color: '#6c757d', cursor: 'help' }} />
            <span className="tooltip-text">{text}</span>
        </span>
    );

    const cleanupSensitiveData = () => {
        // Overwrite sensitive data with random data before nulling
        const randomData = Array(1000).fill(0).map(() => Math.random().toString(36));
        
        // Overwrite and null all sensitive state
        setDecryptionResult(randomData.join(''));
        setUnlockShares(randomData);
        setCipherData(randomData.join(''));
        setMetadata(null);
        
        // Clear temporary scanning data
        setScannedKeys([]);
        setNumOfQRsScanned(0);
        setNumOfQRKEYSsScanned(0);
        
        // Force a second overwrite with nulls
        setTimeout(() => {
            setDecryptionResult(null);
            setUnlockShares([]);
            setCipherData('');
        }, 0);
    };

    if (unlocked) {
        return (
            <Layout>
                <Navbar />
                <div className={'pageWrapper'} style={{paddingTop: 40}}>
                    <Container>
                        <Row>
                            <Col xs={{span: 12, offset: 0}} md={{span: 12, offset: 0}} lg={{span: 8, offset: 2}}>
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
                                        onClick={() => {
                                            cleanupSensitiveData();
                                            navigate('/');
                                        }}
                                    >
                                        Close and clear memory
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
                        <Col xs={{span: 12, offset: 0}} md={{span: 12, offset: 0}} lg={{span: 12, offset: 0}}>
                            <div className="pageNavWrapper">
                                <div className="unlock-header">
                                    <div className="unlock-title">
                                        {/* <FaLock className="title-icon" /> */}
                                        <h2 className={'pageTitle'}>
                                            Unlock Vault
                                        </h2>
                                    </div>
                                    <ProgressStepper 
                                        currentStep={wizardStep}
                                        unlocked={unlocked}
                                    />
                                </div>
                            </div>
                        </Col>
                    </Row>
   
                    <div>
                        {wizardStep === 1 ? (
                            <PreparationStep 
                                isOnline={isOnline}
                                onContinue={() => {
                                    setShowScanner(true);
                                    setWizardStep(wizardStep + 1);
                                }}
                            />
                        ) : null}
                    </div> 

                   
                    {wizardStep === 2 ?
                         <div>
                            <Row>
                                <Col xs={{span: 12, offset: 0}} md={{span: 6, offset: 0}} lg={{span: 6, offset: 0}}>
                                    <div className="scanner-overlay" style={{
                                        position: 'relative',
                                    }}>
                                        {isProcessing?null:<QrReader
                                            key={'qrreaderkey_'+numOfQRsScanned+'_'+scanType+'_'+numOfQRKEYSsScanned}
                                            onResult={(result, error) => scannedSomething(result?.text, error)}
                                            containerStyle={{
                                                width: '100%',
                                                borderRadius: 15,
                                                height: 'auto',
                                                margin: 'auto',
                                                maxHeight: '380px',
                                                padding: 0,
                                                marginTop: 0,
                                                background: '#fff'
                                            }}
                                            videoStyle={{
                                                width: '100%',
                                                height: 'auto',
                                                margin: 0,
                                                padding: 0
                                            }}
                                        />}
                                        
                                        <div className="scanning-guide">
                                            <ul className="mb-0" style={{paddingLeft: '1.2rem'}}>
                                                <li>Hold the QR code steady and centered</li>
                                                <li>Keep the camera lens clean</li>
                                                <li>Make sure no one is watching</li>                                                
                                            </ul>
                                        </div>
                                    </div>
                                </Col>
                                <Col xs={{span: 12, offset: 0}} md={{span: 6, offset: 0}} lg={{span: 6, offset: 0}}>
                                    <div className="unlock-inner-wrapper">
                                        <div className="scan-progress">
                                            {/* <div className="d-flex justify-content-between align-items-center">
                                            
                                                <div className="progress-text">
                                                    {metadata ? (
                                                        `${numOfQRsScanned + numOfQRKEYSsScanned} of ${metadata.qrcodes + metadata.threshold} steps completed`
                                                    ) : (
                                                        ''
                                                    )}
                                                </div>
                                            </div> */}
                                            <div className="progress" style={{height: '8px', marginTop: '8px'}}>
                                                <div 
                                                    className="progress-bar" 
                                                    style={{
                                                        width: metadata ? (
                                                            `${((numOfQRsScanned + numOfQRKEYSsScanned) / (metadata.qrcodes + metadata.threshold)) * 100}%`
                                                        ) : '0%'
                                                    }}
                                                />
                                            </div>
                                            {/* {metadata && (
                                                <div className="progress-detail mt-2">
                                                    <small className="text-muted">
                                                        {scanType === 'vault' ? 
                                                            `Scan vault shards (${numOfQRsScanned}/${metadata.qrcodes})` : 
                                                            `Scanning keys (${numOfQRKEYSsScanned}/${metadata.threshold})`
                                                        }
                                                    </small>
                                                </div>
                                            )} */}
                                        </div>

                                        <div className={'alert'} style={{marginBottom: 0, textAlign: 'left', paddingLeft:0, paddingRight:0}}>
                                            <Oval stroke={'#1786ff'} strokeWidth={15} className={'loading'}  />
                                            {scanType === 'vault' ?
                                                <span>
                                                    {numOfQRsScanned === 0 ?
                                                        <span>
                                                            Scan the <b>metadata</b> QR on your vault
                                                        </span>
                                                        :
                                                        <span>
                                                            Scan <b>shard #{numOfQRsScanned}</b> from your vault
                                                        </span>
                                                    }
                                                </span>
                                                :
                                                <span>
                                                    Scan key #{numOfQRKEYSsScanned + 1}-of-{metadata.shares}
                                                </span>
                                            }
                                        </div>

                                        <VaultMetadata metadata={metadata} VAULT_VERSIONS={VAULT_VERSIONS} />
                                        

                                    

                                        {metadata?
                                            <div>
                                                <div className="mb-4">
                                                    <div className="d-flex align-items-center mb-2">
                                                        <AiOutlineQrcode className="me-2" style={{fontSize: 18}} />
                                                        <strong>Vault Data</strong>
                                                    </div>
                                                    <div className={'unlockrow'}>
                                                        {[...Array(metadata.qrcodes)].map((_, index) => (
                                                            <div className={getClassType(index, 'vault')} 
                                                                    key={'vaultindx'+index}
                                                                    style={{transition: 'all 0.2s ease-in-out'}}>
                                                                <AiOutlineQrcode className={'qrIcon'} />
                                                                {index===0 ? <div>Metadata</div> : <div>Shard #{index}</div>}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                                <div className="mb-3">
                                                    <div className="d-flex align-items-center mb-2">
                                                        <ImKey className="me-2" style={{fontSize: 18}} />
                                                        <strong>Required Keys</strong>
                                                    </div>
                                                    <div className={'unlockrow'}>
                                                        {metadata && metadata.keys && [...Array(metadata.shares)].map((_, index) => (
                                                            <div className={getKeyClass(metadata.keys[index])} 
                                                                    key={'keyindx'+index}
                                                                    style={{transition: 'all 0.2s ease-in-out'}}>
                                                                <div style={{
                                                                    display: 'flex',
                                                                    flexDirection: 'row',
                                                                    flex: 1,
                                                                    alignItems: 'center',
                                                                    textAlign: 'left'
                                                                }}>
                                                                    <ImKey className={'keyIcon'} />
                                                                    <div>{metadata.keys[index]}</div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                    : null}
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    : null }
                    
                    <div className={'alert alert-info'} style={{textAlign:'center', marginTop: 50}}>
                        This unlock tool is also available <a href={'https://github.com/xxbtc/kosign-unlock'} target={'_blank'}>on Github</a>
                    </div>

                </Container>
            </div>
        </Layout>
    )

}

export default UnlockPage;



