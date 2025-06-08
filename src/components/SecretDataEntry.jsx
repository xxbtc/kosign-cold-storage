import React, { useState, useEffect } from 'react'
import { FormGroup, FormText, Button } from 'react-bootstrap';
import { FaCheck, FaLock, FaWifi, FaUserSecret, FaEyeSlash, FaChevronRight } from 'react-icons/fa';
import { MdWarningAmber } from 'react-icons/md';

function SecretDataEntry({
    secretValue,
    setSecret,
    maxSecretChars,
    totalPages,
    isOnline,
    onContinue
}) {
    const [showSecretForm, setShowSecretForm] = useState(false);
    const [checkedItems, setCheckedItems] = useState({
        location: false,
        offline: false
    });
    const [proceedOnline, setProceedOnline] = useState(false);

    const toggleCheck = (item) => {
        // Allow checking offline if user chose to proceed online
        if (item === 'offline' && isOnline && !proceedOnline) {
            return;
        }
        
        setCheckedItems(prev => ({
            ...prev,
            [item]: !prev[item]
        }));
    };

    // Automatically check/uncheck offline based on connection status
    useEffect(() => {
        if (isOnline) {
            // Uncheck offline if user goes online (unless they chose to proceed)
            if (!proceedOnline) {
                setCheckedItems(prev => ({
                    ...prev,
                    offline: false
                }));
            }
        } else {
            // Automatically check offline if user is offline
            setCheckedItems(prev => ({
                ...prev,
                offline: true
            }));
            setProceedOnline(false); // Reset proceed online when actually offline
        }
    }, [isOnline, proceedOnline]);

    const handleProceedOnline = () => {
        setProceedOnline(true);
        setCheckedItems(prev => ({
            ...prev,
            offline: true
        }));
    };

    const allItemsChecked = Object.values(checkedItems).every(checked => checked);

    const handleBeginEntry = () => {
        setShowSecretForm(true);
    };

    if (!showSecretForm) {
        return (
            <div className={'createWrapper'}>
                <div className="secret-entry-header">
                    <div className="header-icon">
                        <FaLock />
                    </div>
                    <h3>Enter Your Secret Data</h3>
                    <p className="header-subtitle">
                        Enter the sensitive information you want to encrypt and store securely in your vault
                    </p>
                </div>

                <div className="security-status-section">
                    {!isOnline ?
                        <div className={'alert alert-success'}>
                            <FaCheck style={{marginRight: 2, fontSize: 12}}/>&nbsp;
                            <b>You are offline</b> - maximum security mode 
                        </div>
                        :
                        <div className={'alert alert-warning'}>
                            <MdWarningAmber style={{marginRight: 8, fontSize: 18, lineHeight:16}}/>
                            <b>You are online</b> - For your security, disconnect from the internet before entering data
                        </div>
                    }
                </div>

                <div className="data-entry-section">
                    <form>
                        <FormGroup className={'formGroup'} controlId="formBasicSecret">
                            <label className="form-label">Secret Data</label>
                            <textarea
                                value={secretValue}
                                onChange={(e) => setSecret(e.target.value)}
                                className={'form-control secretTextInput'}
                                placeholder={'Enter your sensitive data here...\n\nExamples:\n• Password: mySecurePassword123\n• Recovery phrase: word1 word2 word3...\n• Private note: Important information...'}
                                rows={10}
                            />
                            <div className="form-footer-info">
                                <div className="security-indicator">
                                    <FaLock style={{color:'#4caf50', marginRight:6, fontSize:12}} />
                                    <span style={{color:'#4caf50', fontWeight: 600}}>
                                        Get ready to encrypt
                                    </span>
                                </div>
                                <div className="character-counter">
                                    <span className={`counter-text ${maxSecretChars - secretValue.length < 100 ? 'warning' : ''}`}>
                                        {maxSecretChars - secretValue.length} characters remaining
                                    </span>
                                    <span className="page-info">({totalPages?totalPages:2} page{totalPages !== 1 ? 's' : ''})</span>
                                </div>
                            </div>
                        </FormGroup>
                        
                        <div className="continue-section">
                            <Button 
                                variant={'primary'} 
                                size={'lg'}
                                onClick={onContinue}
                                className="continue-btn"
                                disabled={!secretValue.trim()}
                            >
                                Encrypt & Continue
                            </Button>
                            {!secretValue.trim() && (
                                <p className="continue-note">Enter some secret data to continue</p>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className={'createWrapper'}>
            {!isOnline ?
                <div className={'alert alert-success'}>
                    <FaCheck style={{marginRight: 2, fontSize: 12}}/>&nbsp;
                    <b>You are offline</b>
                </div>
                :
                <div className={'alert alert-warning'}>
                    <MdWarningAmber style={{marginRight: 8, fontSize: 18, lineHeight:16}}/>
                    <b>Disconnect your internet</b>
                    <p style={{marginTop: 4, marginBottom: 0}}>For your security, you can disconnect this
                        device from the internet and go offline before entering data below and continuing.</p>
                </div>
            }
            <form>
                <FormGroup className={'formGroup'} controlId="formBasicSecret">
                    <textarea
                        value={secretValue}
                        onChange={(e) => setSecret(e.target.value)}
                        className={'form-control secretTextInput'}
                        placeholder={'Secret data goes here'}
                        rows={8}
                    />
                    <FormText className="text-muted" style={{display:'flex', flexDirection:'row',flex:1,justifyContent:'space-between', paddingTop:10}}>
                        <div>
                            <FaLock style={{color:'#4caf50', marginRight:2, fontSize:12}} />
                            <b style={{color:'#4caf50'}}>Secure</b> vault contents to encrypt
                        </div>

                        {maxSecretChars - secretValue.length} characters remaining ({totalPages} pages)&nbsp;
                    </FormText>
                </FormGroup>
                <FormGroup className={'formGroup'} style={{marginTop: 20}}>
                    <div className="wizard-footer">
                        <Button 
                            variant={'primary'} 
                            size={'lg'}
                            onClick={onContinue}
                        >
                            Continue
                        </Button>
                    </div>
                </FormGroup>
            </form>
        </div>
    );
}

export default SecretDataEntry; 