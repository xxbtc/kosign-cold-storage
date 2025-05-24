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
import UnlockedVault from '../components/UnlockedVault';

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
            setTimeout(() => setIsProcessing(false), 300);
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
                setTimeout(() => setIsProcessing(false), 300);
                return;
            }
            setCipherData(cipherData+jsonObject.data);
        }
        setNumOfQRsScanned(jsonObject.id);
        setTimeout(() => setIsProcessing(false), 300);
    };

    const scannedKey= (data) => {
       // console.log('scanned key ', data);
        //console.log('scanned a key', data);
        //let jsonObject  = JSON.parse(data);
        //setCipherData(cipherData+data);
        if (unlockShares.includes(data.key)) {
            setTimeout(() => setIsProcessing(false), 300);
            return;
        }

        unlockShares.push(data.key);
        setUnlockShares(unlockShares);

        let tmpScannedKeys = scannedKeys;

        tmpScannedKeys.push(data.ident);
        setScannedKeys(tmpScannedKeys);
       // console.log('unlock sharesi snow ', unlockShares);
        setNumOfQRKEYSsScanned(numOfQRKEYSsScanned+1);
        setTimeout(() => setIsProcessing(false), 300);
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
                <div className={'pageWrapper'}>
                    <div className="unlock-layout">
                        {/* Left Sidebar with Process Flow
                        <div className="unlock-sidebar">
                            <div className="sidebar-header">
                                <div className="sidebar-logo">
                                    <FaLockOpen className="sidebar-icon" />
                                </div>
                            </div>
                            
                            <div className="process-flow">
                                <div className="flow-step completed">
                                    <div className="step-indicator"><FaCheck /></div>
                                    <div className="step-content">
                                        <h4>Preparation</h4>
                                        <p>Gather your vault and keys for scanning</p>
                                    </div>
                                </div>
                                
                                <div className="flow-step completed">
                                    <div className="step-indicator"><FaCheck /></div>
                                    <div className="step-content">
                                        <h4>Scan Vault</h4>
                                        <p>Scan QR codes from your paper vault</p>
                                    </div>
                                </div>
                                
                                <div className="flow-step completed">
                                    <div className="step-indicator"><FaCheck /></div>
                                    <div className="step-content">
                                        <h4>Scan Keys</h4>
                                        <p>Scan required unlock keys</p>
                                    </div>
                                </div>
                                
                                <div className="flow-step completed active">
                                    <div className="step-indicator"><FaCheck /></div>
                                    <div className="step-content">
                                        <h4>Access Vault</h4>
                                        <p>View your decrypted vault contents</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="sidebar-footer">
                                <div className="help-section">
                                    <FaInfoCircle className="help-icon" />
                                    <span>Need help?</span>
                                </div>
                            </div>
                        </div> */}
                        
                        {/* Main Content Area */}
                        <div className="unlock-main-content">
                            <div className="content-container">
                                <UnlockedVault 
                                    decryptionResult={decryptionResult}
                                    onClose={() => {
                                        cleanupSensitiveData();
                                        navigate('/');
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        )
    }



    return (
        <Layout>
            <Navbar loggedIn/>
            <div>
                <div className="unlock-layout">
                    
                    
                    {/* Main Content Area */}
                    <div className="unlock-main-content">
                        <div className={`content-container ${wizardStep !== 1 ? 'scanning-mode' : ''}`}>
                            {/* <div className="content-header">
                                {metadata && (
                                    <div className="progress-indicator">
                                        <div className="progress-bar">
                                            <div 
                                                className="progress-fill" 
                                                style={{
                                                    width: `${((numOfQRsScanned + numOfQRKEYSsScanned) / (metadata.qrcodes + metadata.threshold)) * 100}%`
                                                }}
                                            />
                                        </div>
                                        <span className="progress-text">
                                            {numOfQRsScanned + numOfQRKEYSsScanned} of {metadata.qrcodes + metadata.threshold} completed
                                        </span>
                                    </div>
                                )}
                            </div> */}

                            {wizardStep === 1 ? (
                                <PreparationStep 
                                    isOnline={isOnline}
                                    onContinue={() => {
                                        setShowScanner(true);
                                        setWizardStep(wizardStep + 1);
                                    }}
                                />
                            ) : wizardStep === 2 ? (
                                <div className="scanning-content">
                                    
                                    
                                    <Row className="scanner-row">
                                        <Col md={4}>
                                            
                                            <div className="scanner-overlay">
                                                {isProcessing ? null : 
                                                    <QrReader
                                                        key={'qr-scanner'}
                                                        onResult={(result, error) => scannedSomething(result?.text, error)}
                                                        containerStyle={{
                                                            margin:0,
                                                            padding:0,
                                                            height:'280px',
                                                            width:'auto',
                                                            borderRadius: 12,
                                                        }}
                                                        videoStyle={{
                                                            height:'auto',
                                                            width:'auto',
                                                            margin: 0,
                                                            padding: 0,
                                                            maxWidth: '100%',
                                                            maxHeight: '100%',
                                                            borderRadius: 12,
                                                           
                                                        }}
                                                    />
                                                }
                                                
                                                {/* <div className="scanning-guide">
                                                    <ul>
                                                        <li>Hold QR code steady</li>
                                                        <li>Keep camera lens clean</li>
                                                        <li>Ensure privacy</li>                                                
                                                    </ul>
                                                </div> */}
                                            </div>
                                           
                                        </Col>
                                        
                                        <Col md={8}>
                                            <div className="current-action">
                                                <Oval stroke={'#1786ff'} strokeWidth={15} className={'loading'}  />
                                                {scanType === 'vault' ?
                                                    <span>
                                                        {numOfQRsScanned === 0 ?
                                                            <span>Scan the <b>metadata</b> QR on your vault</span>
                                                            :
                                                            <span>Scan <b>shard #{numOfQRsScanned}</b> from your vault</span>
                                                        }
                                                    </span>
                                                    :
                                                    <span>Scan key #{numOfQRKEYSsScanned + 1} of {metadata.threshold} required</span>
                                                }
                                            </div>
                                        
                                            <div className="scan-status-section">
                                                <VaultMetadata 
                                                    metadata={metadata} 
                                                    VAULT_VERSIONS={VAULT_VERSIONS}
                                                    getClassType={getClassType}
                                                    getKeyClass={getKeyClass}
                                                    numOfQRsScanned={numOfQRsScanned}
                                                    numOfQRKEYSsScanned={numOfQRKEYSsScanned}
                                                    scanType={scanType}
                                                />
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            ) : null}

                            <div className="content-footer">
                                <div className={'alert alert-info'}>
                                    This unlock tool is also available <a href={'https://github.com/xxbtc/kosign-unlock'} target={'_blank'}>on Github</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )

}

export default UnlockPage;



