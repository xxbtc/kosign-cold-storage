import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { QrReader } from 'react-qr-reader';
import { Oval } from 'react-loading-icons';
import { FaExclamationTriangle } from 'react-icons/fa';
import VaultMetadata from './VaultMetadata';

const LegacyMultiQRUnlock = ({ 
    metadata,
    numOfQRsScanned,
    numOfQRKEYSsScanned,
    scanType,
    isProcessing,
    cameraError,
    scannedKeys,
    onScanResult,
    getClassType,
    getKeyClass,
    VAULT_VERSIONS
}) => {
    return (
        <div className="scanning-content">
            <Row className="scanner-row">
                <Col md={4} className="scanner-column">
                    <div className="scanner-overlay">
                        {isProcessing ? (
                            <div className="scanner-processing">
                                <Oval stroke={'#1786ff'} strokeWidth={15} />
                                <span>Processing...</span>
                            </div>
                        ) : (
                            <QrReader
                                key={'qr-scanner-legacy'}
                                onResult={(result, error) => onScanResult(result?.text, error)}
                                constraints={{
                                    audio: false,
                                    video: {
                                        facingMode: 'environment',
                                        width: { ideal: 1280 },
                                        height: { ideal: 720 }
                                    }
                                }}
                                containerStyle={{
                                    margin: 0,
                                    padding: 0,
                                    height: '280px',
                                    width: '100%',
                                    borderRadius: 12,
                                }}
                                videoStyle={{
                                    height: '100%',
                                    width: '100%',
                                    margin: 0,
                                    padding: 0,
                                    objectFit: 'cover',
                                    borderRadius: 12,
                                }}
                            />
                        )}
                    </div>
                </Col>
                
                <Col md={8}>
                    <div className="current-action">
                        <Oval stroke={'#1786ff'} strokeWidth={15} className={'loading'} />
                        {scanType === 'vault' ?
                            <span>
                                {numOfQRsScanned === 0 ?
                                    <span>Scan the <b>metadata</b> QR on your vault</span>
                                    :
                                    <span>Scan <b>shard #{numOfQRsScanned}</b> from your vault</span>
                                }
                            </span>
                            :
                            <span>Scan key #{numOfQRKEYSsScanned + 1} of {metadata?.threshold} required</span>
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

            {cameraError && (
                <div className="alert alert-danger mt-3">
                    <FaExclamationTriangle className="me-2" />
                    {cameraError}
                </div>
            )}
        </div>
    );
};

export default LegacyMultiQRUnlock; 