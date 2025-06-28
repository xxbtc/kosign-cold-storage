import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { QrReader } from 'react-qr-reader';
import { Oval } from 'react-loading-icons';
import { FaExclamationTriangle, FaCheck, FaQrcode, FaKey, FaSyncAlt } from 'react-icons/fa';
import '../style/singleQRUnlock.css';

const SingleQRUnlock = ({ 
    metadata,
    numOfQRsScanned,
    numOfQRKEYSsScanned,
    scanType,
    isProcessing,
    scannedKeys,
    onScanResult,
    cameraManager,
    onManualEntry
}) => {
    // Calculate total progress for unified flow (only after metadata is available)
    const totalSteps = metadata ? 1 + metadata.threshold : null;
    const completedSteps = numOfQRsScanned + numOfQRKEYSsScanned;
    
    // Generate unified progress items
    const getProgressItems = () => {
        if (!metadata) return [];
        
        const items = [];
        
        // Vault QR (step 1)
        items.push({
            type: 'vault',
            label: 'Vault',
            icon: FaQrcode,
            completed: numOfQRsScanned > 0,
            active: scanType === 'vault' && numOfQRsScanned === 0
        });
        
        // Key QRs (steps 2+)
        for (let i = 0; i < metadata.threshold; i++) {
            const keyAlias = metadata.keys && metadata.keys[i] ? metadata.keys[i] : `Key ${i + 1}`;
            items.push({
                type: 'key',
                label: keyAlias,
                icon: FaKey,
                completed: scannedKeys.includes(keyAlias) || i < numOfQRKEYSsScanned,
                active: scanType === 'key' && i === numOfQRKEYSsScanned
            });
        }
        
        return items;
    };

    const progressItems = getProgressItems();

    // Get current scan instruction with detailed progress
    const getScanInstruction = () => {
        if (scanType === 'vault') {
            return (
                <span>
                    <strong>Scan your vault QR code</strong>
                </span>
            );
        } else {
            const keysScanned = numOfQRKEYSsScanned;
            const totalKeysNeeded = metadata.threshold;
            const keysRemaining = totalKeysNeeded - keysScanned;
            
            if (keysScanned === 0) {
                return (
                    <span>
                        <strong>Scan key 1 of {totalKeysNeeded}</strong>
                    </span>
                );
            } else if (keysRemaining > 0) {
                return (
                    <span>
                        <strong>Scan key {keysScanned + 1} of {totalKeysNeeded}</strong> ({keysRemaining} more needed)
                    </span>
                );
            } else {
                return (
                    <span>
                        <strong>All keys scanned!</strong> Unlocking vault...
                    </span>
                );
            }
        }
    };

    return (
        <div className="scanning-content single-qr-mode">
            {/* Scanner Section - Similar to Original Layout */}

            <Row className="scanner-row">
                <Col md={4} className="scanner-column">
                    <div className="scanner-overlay">
                        {/* Camera Controls */}
                        <div className="camera-controls">
                            <button 
                                className="camera-switch-btn"
                                onClick={cameraManager.switchCamera}
                                title={`Switch to ${cameraManager.cameraFacing === 'back' ? 'front' : 'back'} camera`}
                            >
                                <FaSyncAlt />
                            </button>
                        </div>
                        
                        {isProcessing ? (
                            <div className="scanner-processing">
                                <Oval stroke={'#1786ff'} strokeWidth={15} />
                                <span>Processing...</span>
                            </div>
                        ) : (
                            <QrReader
                                key={`qr-scanner-single-${cameraManager.cameraFacing}-${cameraManager.cameraKey || 0}`}
                                onResult={(result, error) => onScanResult(result?.text, error)}
                                constraints={cameraManager.getCameraConfig()}
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
                         {getScanInstruction()}
                     </div>
                    
                    {/* Simplified Progress Display - Remove excess containers */}
                    {metadata && (
                        <div className="vault-progress-simple">
                            <div className="vault-name">
                                <strong>{metadata.name}</strong>
                            </div>
                            
                            {/* Vault Status */}
                            <div className="progress-item-row">
                                <div className={`progress-item ${numOfQRsScanned > 0 ? 'completed' : 'pending'}`}>
                                    {numOfQRsScanned > 0 ? (
                                        <FaCheck className="check-icon" />
                                    ) : (
                                        <FaQrcode className="pending-icon" />
                                    )}
                                    <span>Vault Data</span>
                                </div>
                            </div>
                            
                            {/* Keys Grid - Simplified */}
                            <div className="keys-section">
                                <div className="keys-header">
                                    <FaKey className="section-icon" />
                                    <span>Keys ({numOfQRKEYSsScanned}/{metadata.threshold})</span>
                                </div>
                                
                                <div className="keys-grid-simple">
                                    {metadata.keys && metadata.keys.map((keyAlias, index) => {
                                        const isScanned = scannedKeys.includes(keyAlias);
                                        return (
                                            <div 
                                                key={index} 
                                                className={`key-item-simple ${isScanned ? 'completed' : ''}`}
                                            >
                                                {isScanned ? (
                                                    <FaCheck className="check-icon" />
                                                ) : (
                                                    <FaKey className="key-icon" />
                                                )}
                                                <span className="key-alias">{keyAlias}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                                
                                <div className="keys-note-simple">
                                    Scan any {metadata.threshold} of {metadata.keys.length} keys
                                    {numOfQRKEYSsScanned > 0 && (
                                        <span> • {metadata.threshold - numOfQRKEYSsScanned} more needed</span>
                                    )}
                                </div>
                            </div>
                        </div>
                                         )}
                 </Col>
             </Row>
        </div>
    );
};

export default SingleQRUnlock; 