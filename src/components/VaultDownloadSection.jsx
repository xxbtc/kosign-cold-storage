import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaLock } from 'react-icons/fa';
import PDFVaultBackup from './PDFVaultBackup';
import PDFKeyBackup from './PDFKeyBackup';

const VaultDownloadSection = ({
    hasPressedVaultPrint,
    hasPressedKeyPrint,
    doPrintVault,
    doPrintKeys,
    downloadVault,
    downloadKey,
    refBackupVaultPDF,
    refBackupKeyPDF,
    vaultIdent,
    cipherText,
    shares,
    consensus,
    vaultName,
    description,
    cipherIV,
    createdTimestamp,
    keyAliasArray,
    maxLengthPerQRCode
}) => {
    // Generate 3 distinct, recognizable colors for vault identification
    const generateColors = () => {
        // A set of easy-to-identify, high-contrast colors
        const baseColors = [
            '#FF0000', // Red
            '#0000FF', // Blue
            '#008000', // Green
            '#FFA500', // Orange
            '#800080', // Purple
            '#A52A2A', // Brown
            '#000000', // Black 
            '#FF00FF', // Magenta
            '#00FFFF', // Cyan
            '#FFD700'  // Gold
        ];
        
        // Randomly select 3 distinct colors
        const selectedColors = [];
        const copyColors = [...baseColors];
        
        for (let i = 0; i < 3; i++) {
            if (copyColors.length === 0) break;
            const randomIndex = Math.floor(Math.random() * copyColors.length);
            selectedColors.push(copyColors[randomIndex]);
            copyColors.splice(randomIndex, 1); // Remove selected color
        }
        
        return selectedColors;
    };

    const vaultColors = generateColors();

    return (
        <div>
            <Row>
                <Col xs={{span: 12}} md={{span: 12, offset: 0}} lg={{span: 12, offset: 0}}>
                    <div className="alert alert-warning">
                        <b>This page will only be visible once. </b>
                        <br/>Do not browse away before you've printed both your vault and keys
                    </div>
                </Col>
            </Row>
            <Row>
                <Col xs={{span: 12}} md={{span: 6, offset: 0}} lg={{span: 6, offset: 0}}>
                    <div className={'downloadSection'}>
                        <h3><span className={'numberSpan'}>1.</span> Print your vault</h3>
                        <div>Print your encrypted vault.</div>
                        <div className={'securityTips'}>
                            <div><FaLock style={{color:'#777', marginRight:4, fontSize:12}} /> Keep copies in different locations</div>
                        </div>
                        <div style={{marginTop:15}}>
                            <div>
                                <Button
                                    className={hasPressedVaultPrint?'btn-success btn-download':'btn-primary btn-download flashing'}
                                    style={{marginRight:10}}
                                    size={'lg'}
                                    onClick={()=>doPrintVault()}
                                >
                                    Print Vault
                                </Button>
                            </div>
                            <div style={{marginTop:10, textAlign:'center'}}>
                                <Link
                                    to={'#'}
                                    className={'linkage'}
                                    onClick={()=>downloadVault()}
                                >
                                    Download Vault
                                </Link>
                            </div>
                        </div>

                        <div id={'idvaultbackup'}
                             ref={refBackupVaultPDF}
                             className={'contentToPrint'}>
                            <PDFVaultBackup
                                vaultIdent={vaultIdent}
                                cipherText={cipherText}
                                shares={shares}
                                threshold={consensus}
                                vaultName={vaultName}
                                description={description}
                                cipherIV={cipherIV}
                                createdTimestamp={createdTimestamp}
                                qrtype={'printable'}
                                keyAliasArray={keyAliasArray}
                                maxLengthPerQRCode={maxLengthPerQRCode}
                                vaultColors={vaultColors}
                            />
                        </div>
                    </div>
                </Col>
                <Col xs={{span: 12}} md={{span: 6, offset: 0}} lg={{span: 6, offset: 0}}>
                    <div className={'downloadSection'}>
                        <h3><span className={'numberSpan'}>2.</span> Print keys</h3>
                        <div>Distribute one key per person.</div>
                        <div className={'securityTips'}>
                            <div>
                                <FaLock style={{color:'#777', marginRight:4, fontSize:12}} /> Distribute in-person where possible
                            </div>
                        </div>
                        <div style={{marginTop:15}}>
                            <div>
                                <Button
                                    className={hasPressedKeyPrint?'btn-success btn-download':'btn-primary btn-download flashing'}
                                    style={{marginRight:10}}
                                    size={'lg'}
                                    onClick={doPrintKeys}
                                >
                                    Print Keys ({shares.length})
                                </Button>
                            </div>
                            <div style={{marginTop:10, textAlign:'center'}}>
                                {shares.map((share, i) =>
                                    <div key={'sharekey-'+i} style={{marginTop:10}}>
                                        <Link
                                            to={'#'}
                                            className={'linkage'}
                                            onClick={()=>downloadKey(share, i)}
                                        >
                                            Download key #{i+1}
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div id={'idvaultbackup'}
                             ref={refBackupKeyPDF}
                             className={'contentToPrint'}>
                            {shares.map((share, i) =>
                                <PDFKeyBackup
                                    id={'keyshare'+i}
                                    key={'share'+i}
                                    vaultIdent={vaultIdent}
                                    threshold={consensus}
                                    vaultName={vaultName}
                                    description={description}
                                    createdTimestamp={createdTimestamp}
                                    myDecryptedKey={share}
                                    qrtype={'printable'}
                                    keyAlias={keyAliasArray[i]}
                                    vaultColors={vaultColors}
                                />
                            )}
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default VaultDownloadSection; 