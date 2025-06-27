import React from 'react'
import moment from 'moment-timezone';
import QRCode from 'qrcode.react';
import QRCode2 from 'qrcode'
import {StyleSheet, Image } from '@react-pdf/renderer';

const PDFKeyBackup = (props) => {

    const formatTime = (timestamp) => {
        return moment.tz(new Date(timestamp*1000), 'YYYY-MM-DD', moment.tz.guess()).format('YYYY-MM-DD HH:mm:ss')
    };

    // Define a fallback set of colors to use if props.vaultColors is empty
    const defaultColors = ['#FF0000', '#0000FF', '#008000']; // Red, Blue, Green
    // Use the colors that are available, or use defaults
    const effectiveColors = (props.vaultColors && props.vaultColors.length > 0) 
        ? props.vaultColors 
        : defaultColors;

    // Convert color hex to name representation
    const getColorRep = (color) => {
        // Extract the color name or generate a simple text representation
        if (color.startsWith('#')) {
            // Convert hex to simple name if possible
            if (color === '#FF0000') return 'RED';
            if (color === '#0000FF') return 'BLUE';
            if (color === '#008000') return 'GREEN';
            if (color === '#FFA500') return 'ORANGE';
            if (color === '#800080') return 'PURPLE';
            if (color === '#A52A2A') return 'BROWN';
            if (color === '#000000') return 'BLACK';
            if (color === '#FF00FF') return 'MAGENTA';
            if (color === '#00FFFF') return 'CYAN';
            if (color === '#FFD700') return 'GOLD';
            
            // If not a standard color, use first 3 chars of hex
            return color.substring(1, 4);
        }
        return 'COLOR';
    };

    const styles = StyleSheet.create({
        printPage: {
            flex: 0,
            flexGrow: 0,
            width: '100%',
            maxHeight: '297mm', // A4 height
            boxSizing: 'border-box',
            margin: 0,
            padding: 0,
            overflow: 'hidden',
        },
        downloadPage: {
            flex: 0, 
            flexGrow: 0,
            width: '100%',
            maxHeight: '297mm', // A4 height
            boxSizing: 'border-box',
            margin: 0,
            padding: 0,
            overflow: 'hidden',
        },
        printPageBreak: {
            pageBreakBefore: 'always',
            pageBreakInside: 'avoid',
            breakInside: 'avoid',
            breakBefore: 'page',
        },
        page: {
            flexDirection: 'column',
            backgroundColor: '#fff',
            flex: 0,
            width: '100%',
            height: '100%', // Don't set explicit height for downloadable
            padding: 0,
            flexGrow: 0,
            display: 'flex',
            position: 'relative',
            boxSizing: 'border-box',
            overflow: 'hidden',
        },
        asciiBoxStyle: {
            fontFamily: 'monospace',
            fontSize: props.qrtype === 'downloadable' ? 14 : 16,
            color: '#000',
            padding: props.qrtype === 'downloadable' ? '12px 20px' : '24px 32px',
            marginBottom: 0,
            whiteSpace: 'pre',
            borderRadius: 8,
            width: '100%',
            boxSizing: 'border-box',
        },
        QRWrapperMiddle: {
            display: 'flex',
            flexDirection: 'column',
            flex: 0,
            width: '100%',
            marginTop: props.qrtype === 'downloadable' ? 10 : 50,
            marginBottom: 0,
            height: 'auto',
        },
        QRWrapperInner: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
        },
        QRText: {
            fontFamily: 'Helvetica-Bold',
            fontSize: 18,
            color: '#0d6efd',
            fontWeight: 400,
            letterSpacing: 0.2,
            wordSpacing: 0.2,
            padding: '4px 16px',
            textAlign: 'center',
            backgroundColor: '#f8f9fa',
            border: '1px solid #0d6efd',
            borderRadius: 4,
            textTransform: 'uppercase',
            marginBottom: 15,
        },
        QRCodeContainer: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            padding: props.qrtype === 'downloadable' ? '0 40px' : '0',
            height: 280,
            width: 280
        },
        QRImage: {
            width: 250,
            height: 250,
            padding: 10,
            backgroundColor: '#fff',
            objectFit: 'contain',
        },
        QRWarning: {
            fontFamily: 'Helvetica-Oblique',
            fontSize: 16,
            color: '#dc3545',
            fontWeight: 600,
            letterSpacing: 0.1,
            wordSpacing: 0.1,
            ...(props.qrtype === 'printable' 
                ? {
                    writingMode: 'vertical-rl',
                    textOrientation: 'mixed',
                    transform: 'rotate(180deg)',
                    paddingRight: '30px',
                    position: 'relative'
                  }
                : {
                    transform: 'rotate(-90deg)',
                    paddingRight: '0px',
                    position: 'absolute',
                    right: '-80px',
                    width: '100px',
                    textAlign: 'center'
                  }
            )
        },
        QRLeftText: {
            fontFamily: 'Helvetica-Oblique',
            fontSize: 16,
            color: '#dc3545',
            fontWeight: 600,
            letterSpacing: 0.1,
            wordSpacing: 0.1,
            ...(props.qrtype === 'printable'
                ? {
                    writingMode: 'vertical-rl',
                    textOrientation: 'mixed',
                    transform: 'rotate(180deg)',
                    paddingLeft: '30px',
                    position: 'relative'
                  }
                : {
                    transform: 'rotate(90deg)',
                    paddingLeft: '0px',
                    position: 'absolute',
                    left: '-80px',
                    width: '100px',
                    textAlign: 'center'
                  }
            )
        },
        asciiDetailsSection: {
            fontFamily: 'monospace',
            whiteSpace: 'pre',
        },
        keyAliasStyle: {
            padding: '0 4px',
            border: '0.5px solid #888',
            borderRadius: '4px',
            backgroundColor: '#f8f9fa',
            fontWeight: 'normal',
            whiteSpace: 'nowrap',
            position: 'relative',
            display: 'inline-block'
        },
    });

    // Render color boxes with similar style to PDFVaultBackup
    const renderColorBoxes = () => {
        return (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                marginTop: '8px',
                alignItems: 'flex-end'
            }}>
                {/* Also keep the visual representation for browser/print */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '8px',
                }}>
                    {effectiveColors.map((color, index) => (
                        <div key={index} style={{
                            width: '28px',
                            height: '28px',
                            backgroundColor: color,
                            border: '1px solid #333',
                            borderRadius: '4px',
                            textAlign: 'center',
                            lineHeight: '28px',
                            fontSize: '16px',
                            color: color === '#000000' ? '#FFFFFF' : '#000000',
                            fontWeight: 'bold'
                        }}>
                           &nbsp;
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    // Generate QR code
    let canvas;
    let qrdata = JSON.stringify({
        ident: props.keyAlias,
        key: props.myDecryptedKey
    });

    canvas = document.createElement('canvas');
    QRCode2.toCanvas(canvas, qrdata, {
        errorCorrectionLevel: 'M',  // Changed from H to M for better balance
        width: 250,  // Reduced from default to 250
        margin: 2
    });
    const qr = canvas.toDataURL();

    // New ASCII-style header for key backup
    const renderKeyHeaderAscii = () => {
        // Get formatted creation date
        const creationDate = formatTime(props.createdTimestamp);

        return (
            <div style={styles.asciiBoxStyle}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                }}>
                    <div style={{
                        flexGrow: 1,
                        flexShrink: 1,
                        minWidth: 0,
                        maxWidth: '65%',  
                    }}>
                        <div style={{fontSize: 18, fontWeight: 'bold', marginBottom: 10, marginTop: 10, fontFamily: 'Helvetica-BoldOblique'}}>
                            KOSIGN.XYZ SECURE KEY BACKUP
                        </div>
                        <div>
                            {` ██╗  ██╗███████╗██╗   ██╗
 ██║ ██╔╝██╔════╝╚██╗ ██╔╝
 █████╔╝ █████╗   ╚████╔╝ 
 ██╔═██╗ ██╔══╝    ╚██╔╝  
 ██║  ██╗███████╗   ██║   
 ╚═╝  ╚═╝╚══════╝   ╚═╝   `}
                        </div>
                    </div>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-end',
                        justifyContent: 'flex-start',
                        minWidth: '240px',
                    }}>
                        {/* Use the new function to render color blocks */}
                        {renderColorBoxes()}
                        
                        <div style={{
                            marginTop: 10,
                            fontFamily: 'monospace',
                            color: '#dc3545',
                            fontWeight: 'bold',
                            border: '1px solid #dc3545',
                            borderRadius: '0px',
                            padding: '4px 0px',
                            backgroundColor: '#fff3f3',
                        }}>
                            {`     !!! IMPORTANT !!!       `}
                        </div>
                        <div style={{marginTop: 8, fontWeight: 'bold'}}>{`Page 1 of 1`}</div>
                        <div style={{marginTop: 8}}>Created: {creationDate}</div>
                        <div style={{marginTop: 4, display: 'flex', alignItems: 'center', gap: '8px'}}>
                            <span style={{
                                backgroundColor: '#0d6efd',
                                color: 'white',
                                padding: '2px 8px',
                                borderRadius: '4px',
                                fontSize: '14px',
                                fontWeight: 'bold'
                            }}>
                                VAULT KEY
                            </span>
                        </div>
                    </div>
                </div>
                
                <div style={styles.asciiDetailsSection}>
                    {`-----------------------------------------------------------------------------
Vault Name:         ${props.vaultName}
Key Alias:          `}
                    <span style={styles.keyAliasStyle}>{props.keyAlias}</span>
                    
                </div>
            </div>
        )
    };

    return (
        <div style={{
                 ...(props.qrtype === 'printable' ? styles.printPage : styles.downloadPage),
                 ...(props.qrtype === 'printable' ? styles.printPageBreak : {})
             }}>
            <div style={styles.page}>
                {renderKeyHeaderAscii()}
                
                <div style={styles.QRWrapperMiddle}>
                    <div style={styles.QRWrapperInner}>
                        <div style={styles.QRCodeContainer}>
                            <div style={styles.QRLeftText}>
                                KEEP SECURE
                            </div>
                            {props.qrtype === 'printable' ?
                                <QRCode 
                                    id='qrcodekey' 
                                    value={qrdata} 
                                    size={250}
                                    level="M"
                                    includeMargin={true}
                                />
                                : null
                            }
                            {props.qrtype === 'downloadable' ?
                                <Image 
                                    src={qr} 
                                    style={styles.QRImage}
                                    alt={`QR Code for Key: ${props.keyAlias}`}
                                />
                                : null
                            }
                            <div style={styles.QRWarning}>
                                DO NOT FOLD
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PDFKeyBackup;
