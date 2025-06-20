import React, { Component, useState, useEffect } from 'react'
import moment from 'moment-timezone';
import QRCode from 'qrcode.react';
import QRCode2 from 'qrcode';
import {StyleSheet, Image } from '@react-pdf/renderer';
import { CURRENT_VAULT_VERSION, VAULT_VERSIONS } from '../config/vaultConfig';
import { FaExclamationTriangle, FaKey, FaLock, FaCalendarAlt, FaQrcode, FaUnlock, FaGithub } from 'react-icons/fa';

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
            about:'Vault [Kosign.xyz]',
            qrcodes: totalQRCodes,
            version: CURRENT_VAULT_VERSION,
            name: props.vaultName,
            // description: props.description,
            shares: props.shares.length,
            threshold: props.threshold,
            cipherIV: props.cipherIV,
            keys:props.keyAliasArray,
            format: VAULT_VERSIONS[CURRENT_VAULT_VERSION]
        });

        // console.log('Metadata QR length:', metadata.length);
        // console.log('Metadata QR is ', metadata);

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
            tmpQRArray.push({qrCode:canvas.toDataURL(), id:c, raw:(JSON.stringify({id:c, data:props.cipherText.substr(i, maxLengthPerQRCode) } ))});
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

    const qrPerPage     = 1;
    const firstPageQR   = 1;

    const totalQRs = qrArray.length*qrPerRow;
    const remainingQRs = totalQRs - firstPageQR;

    const totalPages = totalQRCodes; // Each QR code gets its own page



    //const [qrArray, setQRArray] = useState(chunkedArray);
    //const [cipherArray, setCipherArray] = useState();

    const formatTime = (timestamp) => {
        return moment.tz(new Date(timestamp*1000), 'YYYY-MM-DD', moment.tz.guess()).format('YYYY-MM-DD HH:mm:ss')
    };

    // Add this right after the formatTime function
    // Define a fallback set of colors to use if props.vaultColors is empty
    const defaultColors = ['#FF0000', '#0000FF', '#008000']; // Red, Blue, Green
    // Log and use the colors that are available, or use defaults
    const effectiveColors = (props.vaultColors && props.vaultColors.length > 0) 
        ? props.vaultColors 
        : defaultColors;

    const styles = StyleSheet.create({
        printPage: {
            flex: 1,
            flexGrow: 1,
            width: '100%',
            minHeight: '297mm', // A4 height
            boxSizing: 'border-box',
            margin: 0,
            padding: 0,
        },
        downloadPage: {
            flex: 1,
            flexGrow: 1,
            width: '100%',
            minHeight: '297mm', // A4 height
            boxSizing: 'border-box',
            margin: 0,
            padding: 0,
        },
        highlightStyle: {
            color: '#000', // gold/orange
            fontWeight: 'bold',
            textDecoration: 'underline',
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
        page: {
            flexDirection: 'column',
            backgroundColor: '#fff',
            flex: 1,
            width: '100%',
            height: '100%',
            padding: 0,
            flexGrow: 1,
            display: 'flex',
            position: 'relative',
            boxSizing: 'border-box',
            overflow: 'hidden',
        },
        sectionTop: {
            backgroundColor: '#fff',
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'left',
            borderBottom: '2px solid #e9ecef',
        },
        headerContainer: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            padding: '4px 0',
            gap: 6,
            width: '100%',
        },
        vaultTitle: {
            fontFamily: "Helvetica-BoldOblique",
            fontSize: 30,
            color: '#2c3e50',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
        },
        alertDanger: {
            backgroundColor: '#fff3f3',
            color: '#dc3545',
            borderWidth: 1,
            borderColor: '#dc3545',
            borderStyle: 'solid',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            fontSize: 16,
            padding: '8px 12px',
            borderRadius: 4,
            marginLeft: 20,
        },
        unlockLink: {
            color: '#0d6efd',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
        },
        detailWrapper: {
            borderWidth: 1,
            borderRadius: 8,
            borderColor: '#e9ecef',
            borderStyle: 'solid',
            padding: 0,
            backgroundColor: '#fff',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
            marginTop: 12,
        },
        detailTable: {
            width: '100%',
            borderCollapse: 'separate',
            borderSpacing: 0,
        },
        detailRow: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
            padding: '10px 0',
            borderTop: '1px solid #f0f2f5',
        },
        detailRowLast: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
            padding: '8px 0',
        },
        detailLabel: {
            width: 140,
            minWidth: 140,
            fontFamily: "Helvetica-Bold",
            color: '#000',
            fontSize: 14,
            paddingRight: 16,
            textAlign: 'right',
            letterSpacing: 0.1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: 6,
        },
        detailValue: {
            flex: 1,
            fontFamily: "Helvetica",
            color: '#495057',
            fontSize: 14,
            paddingLeft: 8,
            wordBreak: 'break-word',
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 4,
        },
        keyAlias: {
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4,
            margin: '2px 2px',
            borderWidth: 1,
            borderColor: '#e9ecef',
            borderStyle: 'solid',
            fontSize: 12,
            padding: '2px 6px',
            backgroundColor: '#f8f9fa',
            borderRadius: 12,
            color: '#495057',
            transition: 'all 0.2s ease',
        },
        keysContainer: {
            display: 'flex',
            flexWrap: 'wrap',
            gap: 4,
            padding: 0,
            marginTop: 0,
        },
        keysLabel: {
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            marginBottom: 4,
        },
        vaultNameHeader: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            padding: '0',
            maxWidth: '50%',
            flex: '0 0 auto',
        },
        vaultNameLabel: {
            width: 140,
            minWidth: 140,
            fontFamily: "Helvetica-Bold",
            color: '#2c3e50',
            fontSize: 16,
            paddingRight: 16,
            textAlign: 'right',
            letterSpacing: 0.1,
        },
        vaultNameValue: {
            flex: 1,
            fontFamily: "Helvetica",
            color: '#2c3e50',
            fontSize: 16,
            paddingLeft: 8,
            wordBreak: 'break-word',
        },
        QRWrapperMiddle: {
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            width: '100%',
            padding: props.qrtype === 'downloadable' ? '30px 0 60px 0' : '0',
            gap: 0,
        },
        QRWrapperMiddleSecondPage: {
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            width: '100%',
            padding: '0',
            marginTop: props.qrtype === 'downloadable' ? 40 : 100,
            paddingBottom: props.qrtype === 'downloadable' ? 60 : 0,
        },
        QRRow: {
            
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
            marginBottom:15,
        },
        QRCodeContainer: {
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            padding: props.qrtype === 'downloadable' ? '0 70px' : '0',
            height: props.qrtype === 'downloadable' ? 380 : 400,
            width: props.qrtype === 'downloadable' ? 380 : 400,
            margin: '0 auto',
        },
        QRImage: {
            width: 400,
            height: 400,
            padding: 10,
            backgroundColor: '#fff',
            objectFit: 'contain',
        },
        pageNumber: {
            position: 'absolute',
            bottom: 40,
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: 16,
            color: '#000',
            fontFamily: 'Helvetica',
        },
        vaultTitleCompact: {
            fontFamily: "Helvetica-BoldOblique",
            fontSize: 25,
            color: '#2c3e50',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            maxWidth: '60%',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
        },
        headerRight: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            justifyContent: 'flex-start',
            fontSize: 16,
            color: '#000',
            fontWeight: 500,
            textAlign: 'right',
            fontFamily: 'monospace',
            minWidth: '200px',
            flex: '0 0 auto',
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
        qrCount: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '4px 12px',
            border: '1px solid #e9ecef',
            borderRadius: 4,
            minWidth: 80,
        },
        qrCountNumber: {
            fontFamily: 'Helvetica-Bold',
            fontSize: 16,
            color: '#2c3e50',
        },
        qrCountLabel: {
            fontFamily: 'Helvetica',
            fontSize: 12,
            color: '#6c757d',
            marginTop: 2,
        },
        colorIdentifier: {
            display: 'flex',
            flexDirection: 'row',
            height: '6px',
            marginTop: '10px',
            overflow: 'hidden',
        },
        colorBox: {
            width: '28px',
            height: '28px',
            border: '1px solid #333',
            borderRadius: '4px',
        },
        asciiImportantBox: {
            width: '100%',
            marginTop: 16,
            marginBottom: 16,
            fontFamily: 'monospace',
        },
        asciiDetailsSection: {
            fontFamily: 'monospace',
            whiteSpace: 'pre',
        },
        printPageBreak: {
            pageBreakBefore: 'always',
            pageBreakInside: 'avoid',
            breakInside: 'avoid',
        },
    });

    const renderQR = (qrData, ii, i) => {
        return (
            <div key={'qrkey'+ii+'_'+i} style={styles.QRWrapperInner}>
                <div style={styles.QRCodeContainer}>
                    <div style={styles.QRLeftText}>
                        KEEP SECURE
                    </div>
                    {props.qrtype==='printable'?
                        <QRCode 
                            id='qrcodekey' 
                            value={qrData.raw} 
                            size={400} 
                            level="H"
                            includeMargin={true}
                        />
                        :null
                    }
                    {props.qrtype==='downloadable'?
                        <Image 
                            src={qrData.qrCode} 
                            style={styles.QRImage}
                            alt={`QR Code ${qrData.id === 1 ? 'Metadata' : `Data Shard #${totalQRs-1}`}`}
                        />
                        :null
                    }
                    <div style={styles.QRWarning}>
                        DO NOT FOLD
                    </div>
                </div>
            </div>
        )
    };

    // First, add a function that creates a text-based representation of colors
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

    // Then update the renderColorBoxes function to use effectiveColors instead
    const renderColorBoxes = () => {
        return (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                marginTop: '8px',
                alignItems: 'flex-end'
            }}>
                {/* Add a text label for colors that will definitely show up in PDF
                <div style={{fontSize: 12, fontFamily: 'monospace', fontWeight: 'bold'}}>
                    COLORS: {effectiveColors.map(color => getColorRep(color)).join(' | ')}
                </div> */}
                
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

    const renderVaultHeaderAscii = (page, forceShowFullHeader, qrType = null) => {
        // Get formatted creation date
        const creationDate = formatTime(props.createdTimestamp);

        // Determine how to display the page range for shards
        const shardPagesText = totalQRCodes === 2 
            ? "(page 2)" 
            : `(pages 2-${totalPages})`;

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
                            KOSIGN.XYZ SECURE COLD STORAGE
                        </div>
                        <div>
                            {` ██╗   ██╗ █████╗ ██╗   ██╗██╗  ████████╗
 ██║   ██║██╔══██╗██║   ██║██║  ╚══██╔══╝
 ██║   ██║███████║██║   ██║██║     ██║   
 ╚██╗ ██╔╝██╔══██║██║   ██║██║     ██║   
  ╚████╔╝ ██║  ██║╚██████╔╝███████╗██║   
   ╚═══╝  ╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚═╝   `}
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
                        <div style={{marginTop: 8, fontWeight: 'bold'}}>{`Page 1 of ${totalPages}`}</div>
                        <div style={{marginTop: 4, display: 'flex', alignItems: 'center', gap: '8px'}}>
                            <span>v{CURRENT_VAULT_VERSION}</span>
                            {qrType && (
                                <span style={{
                                    backgroundColor: '#0d6efd',
                                    color: 'white',
                                    padding: '2px 8px',
                                    borderRadius: '4px',
                                    fontSize: '14px',
                                    fontWeight: 'bold'
                                }}>
                                    {qrType}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
                
                <div style={styles.asciiDetailsSection}>
                    {`-----------------------------------------------------------------------------
Vault Name:         ${props.vaultName}
Contents:           ◆ 1 Metadata QR Code (page 1)
                    ◆ ${totalQRCodes - 1} Data Shard QR Code${totalQRCodes - 1 !== 1 ? 's' : ''} ${shardPagesText}
                    ◆ ${totalPages} page${totalPages !== 1 ? 's' : ''} total
Keys Required:      ${props.threshold} of ${props.shares.length}
Unlock URL:         `}
                    <span style={styles.highlightStyle}>https://kosign.xyz/unlock</span>
                    {`
Source Code:        `}
                    <span style={styles.highlightStyle}>https://github.com/xxbtc/kosign-unlock</span>
                    {`
Keys:               `}
                    <div style={{
                        display: 'inline-flex',
                        flexWrap: 'wrap',
                        fontFamily: 'monospace',
                        maxWidth: 'calc(100% - 19ch)',
                        gap: '8px',
                        marginTop: '2px'
                    }}>
                        {props.keyAliasArray.map((key, index) => (
                            <span key={index} style={{
                                padding: '0 4px',
                                border: '0.5px solid #888',
                                borderRadius: '4px',
                                backgroundColor: '#f8f9fa',
                                fontWeight: 'normal',
                                whiteSpace: 'nowrap',
                                position: 'relative',
                                display: 'inline-block'
                            }}>
                                {`${key}`}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        )
    };
    
    // Modify the renderCompactHeader function to match the full header style
    const renderCompactHeader = (pageNumber, qrType = null) => {
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
                            KOSIGN.XYZ SECURE COLD STORAGE
                        </div>
                        <div>
                            {` ██╗   ██╗ █████╗ ██╗   ██╗██╗  ████████╗
 ██║   ██║██╔══██╗██║   ██║██║  ╚══██╔══╝
 ██║   ██║███████║██║   ██║██║     ██║   
 ╚██╗ ██╔╝██╔══██║██║   ██║██║     ██║   
  ╚████╔╝ ██║  ██║╚██████╔╝███████╗██║   
   ╚═══╝  ╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚═╝   `}
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
                        
                        <div style={{marginTop: 8, fontWeight: 'bold'}}>{`Page ${pageNumber} of ${totalPages}`}</div>
                        {qrType && (
                            <div style={{marginTop: 4, display: 'flex', alignItems: 'center', gap: '8px'}}>
                                <span style={{
                                    backgroundColor: '#0d6efd',
                                    color: 'white',
                                    padding: '2px 8px',
                                    borderRadius: '4px',
                                    fontSize: '14px',
                                    fontWeight: 'bold'
                                }}>
                                    {qrType}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
                
                <div style={{...styles.asciiDetailsSection, paddingBottom: 0, marginBottom: 0}}>
                    {`-----------------------------------------------------------------------------
Vault Name:         `}
                    <span style={{
                        display: 'inline-block',
                        wordBreak: 'break-word',
                        maxWidth: 'calc(100% - 19ch)',
                        whiteSpace: 'normal'
                    }}>
                        {props.vaultName}
                    </span>
                    
                </div>
            </div>
        );
    };

    return (
        <div style={props.qrtype==='printable'?styles.printPage:styles.downloadPage}>
            {/* First page: Metadata QR + full header/details */}
            <div style={styles.page}>
                {renderVaultHeaderAscii(0, true, 'METADATA')}
                
                <div style={{
                    ...styles.QRWrapperMiddle,
                    position: 'relative',
                }}>
                    <div style={styles.QRRow}>
                        {renderQR(qrArray[0][0], 0, 0)}
                    </div>
                    
                    {/* <div style={{
                        position: props.qrtype === 'downloadable' ? 'absolute' : 'absolute',
                        bottom: props.qrtype === 'downloadable' ? '10px' : '40px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        fontSize: props.qrtype === 'downloadable' ? 14 : 16,
                        color: '#000',
                        fontFamily: 'Helvetica',
                        zIndex: 1000
                    }}>
                        Page 1 of {totalPages}
                    </div> */}
                </div>
            </div>
            
            {/* Shard pages: One per page, compact header */}
            {qrArray.flat().slice(1).map((qrData, idx) => (
                <div key={'shardpage_' + idx} 
                    style={props.qrtype==='printable' ? styles.printPageBreak : {}}>
                    <div style={styles.page}>
                        {/* Compact header for non-first pages with shard number */}
                        {renderCompactHeader(idx + 2, `SHARD #${qrData.id - 1}`)}
                        
                        <div style={{
                            ...styles.QRWrapperMiddleSecondPage,
                            position: 'relative',
                        }}>
                            <div style={styles.QRRow}>
                                {renderQR(qrData, 0, idx + 1)}
                            </div>
                            
                            {/* <div style={{
                                position: props.qrtype === 'downloadable' ? 'absolute' : 'absolute',
                                bottom: props.qrtype === 'downloadable' ? '10px' : '40px',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                fontSize: props.qrtype === 'downloadable' ? 14 : 16,
                                color: '#000',
                                fontFamily: 'Helvetica',
                                zIndex: 1000
                            }}>
                                Page {idx + 2} of {totalPages}
                            </div> */}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );

};

export default PDFVaultBackup;

