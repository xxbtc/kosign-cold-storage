import React, { useState, useEffect, useCallback } from 'react'
import { FormGroup, FormText, Button, Card, Form } from 'react-bootstrap';
import { FaCheck, FaLock, FaToggleOn, FaToggleOff, FaEye, FaKey, FaWallet, FaStickyNote, FaCode, FaPlus } from 'react-icons/fa';
import { MdWarningAmber } from 'react-icons/md';

import DataSection from './DataSection';
import PasswordEntryCard from './PasswordEntryCard';
import WalletEntryCard from './WalletEntryCard';
import NoteEntryCard from './NoteEntryCard';
import ApiKeyEntryCard from './ApiKeyEntryCard';
import CustomEntryCard from './CustomEntryCard';
import { ProFeatureService } from '../services/ProFeatureService';

function SecretDataEntry({
    secretValue,
    setSecret,
    maxSecretChars,
    totalPages,
    isOnline,
    onContinue
}) {
    const [simpleMode, setSimpleMode] = useState(false);
    const [showPreview, setShowPreview] = useState(false);
    const [syncWarning, setSyncWarning] = useState('');
    const [showSyncConfirm, setShowSyncConfirm] = useState(false);
    const [pendingModeSwitch, setPendingModeSwitch] = useState(null);
    
    // Structured data state
    const [structuredData, setStructuredData] = useState({
        passwords: [],
        wallets: [],
        notes: [],
        apiKeys: [],
        custom: []
    });

    // Show/hide states for sensitive fields
    const [visibleFields, setVisibleFields] = useState({});



    // Parse JSON back to structured data
    const parseTextToStructured = (text) => {
        if (!text.trim()) {
            return {
                passwords: [],
                wallets: [],
                notes: [],
                apiKeys: [],
                custom: []
            };
        }

        try {
            const parsed = JSON.parse(text);
            
            // Validate that it has the expected structure
            const validStructure = {
                passwords: [],
                wallets: [],
                notes: [],
                apiKeys: [],
                custom: []
            };

            // Validate and populate each section
            Object.keys(validStructure).forEach(section => {
                if (parsed[section] && Array.isArray(parsed[section])) {
                    validStructure[section] = parsed[section].map(entry => {
                        // Ensure entry is an object with string values
                        if (typeof entry === 'object' && entry !== null) {
                            const cleanEntry = {};
                            Object.keys(entry).forEach(key => {
                                if (typeof entry[key] === 'string') {
                                    cleanEntry[key] = entry[key];
                                }
                            });
                            return cleanEntry;
                        }
                        return {};
                    });
                }
            });

            return validStructure;
        } catch (error) {
            // If parsing fails, return null to indicate invalid JSON
            return null;
        }
    };

    // Convert structured data to compact JSON (saves characters)
    const convertToText = useCallback(() => {
        console.log('convertToText called with structuredData:', structuredData);
        
        // Include all entries, even empty ones, to preserve structure
        const cleanData = {};
        
        Object.keys(structuredData).forEach(section => {
            console.log(`Processing section ${section}, length: ${structuredData[section].length}`);
            if (structuredData[section].length > 0) {
                const entries = structuredData[section].map(entry => {
                    // Only include fields that have actual content to save characters
                    const cleanEntry = {};
                    Object.keys(entry).forEach(key => {
                        if (entry[key] && entry[key].trim() !== '') {
                            cleanEntry[key] = entry[key];
                        }
                    });
                    return cleanEntry;
                });
                
                cleanData[section] = entries;
                console.log(`Added ${entries.length} entries to cleanData[${section}]:`, entries);
            }
        });
        
        console.log('Final cleanData:', cleanData);
        
        // Return compact JSON (no spaces) to save characters
        const result = Object.keys(cleanData).length > 0 ? JSON.stringify(cleanData) : '';
        console.log('convertToText result:', result);
        return result;
    }, [structuredData]);

    // Calculate current character usage based on mode
    const getCurrentText = () => {
        if (simpleMode) {
            return secretValue;
        } else {
            return convertToText();
        }
    };

    // Simple character counting - just count the actual string length
    const getUserContentLength = () => {
        if (simpleMode) {
            return secretValue.length;
        } else {
            // In structured mode, count the JSON string that would be generated
            return convertToText().length;
        }
    };

    const currentText = getCurrentText();
    const currentCharCount = getUserContentLength();
    const remainingChars = maxSecretChars - currentCharCount;
    const isNearLimit = remainingChars < 100;
    const isOverLimit = remainingChars < 0;

    // Update the main secret value when structured data changes (only in structured mode)
    useEffect(() => {
        if (!simpleMode) {
            const formattedText = convertToText();
            console.log('useEffect - updating secret in structured mode:', formattedText);
            console.log('useEffect - length:', formattedText.length);
            setSecret(formattedText);
        }
    }, [structuredData, convertToText]); // Removed simpleMode to avoid conflicts during mode switching

    // Note: Mode switching is now handled manually in handleModeSwitch to avoid useEffect conflicts

    const toggleFieldVisibility = (section, index, field) => {
        const key = `${section}-${index}-${field}`;
        setVisibleFields(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    const isFieldVisible = (section, index, field) => {
        const key = `${section}-${index}-${field}`;
        return visibleFields[key] || false;
    };

    const addEntry = (section) => {
        let newEntry = {};
        switch (section) {
            case 'passwords':
                newEntry = { service: '', username: '', password: '', url: '', notes: '' };
                break;
            case 'wallets':
                newEntry = { name: '', seed: '', privateKey: '', address: '', notes: '' };
                break;
            case 'notes':
                newEntry = { title: '', content: '', notes: '' };
                break;
            case 'apiKeys':
                newEntry = { service: '', key: '', secret: '', notes: '' };
                break;
            case 'custom':
                newEntry = { label: '', value: '', notes: '' };
                break;
        }
        
        console.log(`Adding entry to ${section}:`, newEntry);
        console.log('Current structured data before adding:', structuredData);
        
        setStructuredData(prev => {
            const updated = {
                ...prev,
                [section]: [...prev[section], newEntry]
            };
            console.log('Updated structured data:', updated);
            return updated;
        });
    };

    const removeEntry = (section, index) => {
        setStructuredData(prev => ({
            ...prev,
            [section]: prev[section].filter((_, i) => i !== index)
        }));
    };

    const updateEntry = (section, index, field, value) => {
        console.log(`Updating ${section}[${index}].${field} = "${value}"`);
        console.log('Current structured data before update:', structuredData);
        
        setStructuredData(prev => {
            const updated = {
                ...prev,
                [section]: prev[section].map((item, i) => 
                    i === index ? { ...item, [field]: value } : item
                )
            };
            console.log('Updated structured data:', updated);
            return updated;
        });
    };

    // Helper functions for entry cards
    const getFieldVisibilityForEntry = (section, index) => (field) => {
        return isFieldVisible(section, index, field);
    };

    const getToggleVisibilityForEntry = (section, index) => (field) => {
        toggleFieldVisibility(section, index, field);
    };

    const getUpdateEntryForSection = (section) => (index, field, value) => {
        updateEntry(section, index, field, value);
    };

    const getRemoveEntryForSection = (section) => (index) => {
        removeEntry(section, index);
    };

    // Handle mode switching with bidirectional sync
    const handleModeSwitch = (newMode) => {
        setSyncWarning(''); // Clear any previous warnings
        
        if (newMode === false) {
            // Switching TO structured mode FROM simple mode
            // Try to parse the current secretValue back to structured data
            const parsedData = parseTextToStructured(secretValue);
            
            if (parsedData) {
                // Successfully parsed - update structured data
                setStructuredData(parsedData);
                setSimpleMode(false);
            } else if (secretValue.trim()) {
                // Failed to parse but has content - show confirmation dialog BEFORE clearing
                setPendingModeSwitch(newMode);
                setShowSyncConfirm(true);
            } else {
                // Empty content - just switch modes
                setSimpleMode(false);
            }
        } else {
            // Switching TO simple mode FROM structured mode
            // Store compact JSON but user will see formatted version
            const compactJson = convertToText();
            console.log('Mode switch - about to call setSecret with:', compactJson);
            console.log('Length of JSON:', compactJson.length);
            setSecret(compactJson);
            setSimpleMode(true);
        }
    };

    // Confirm the mode switch after user sees the warning
    const confirmModeSwitch = () => {
        if (pendingModeSwitch === false) {
            // Clear structured data and switch to structured mode
            setStructuredData({
                passwords: [],
                wallets: [],
                notes: [],
                apiKeys: [],
                custom: []
            });
            setSimpleMode(false);
            setSyncWarning('Previous text could not be parsed as structured data. Starting fresh.');
        }
        
        // Clean up
        setShowSyncConfirm(false);
        setPendingModeSwitch(null);
    };

    // Cancel the mode switch
    const cancelModeSwitch = () => {
        setShowSyncConfirm(false);
        setPendingModeSwitch(null);
    };

    if (showPreview) {
        return (
            <div className={'createWrapper'}>
                <div className="secret-entry-header">
                    <div className="header-icon">
                        <FaEye />
                    </div>
                    <h3>Preview Your Vault Contents</h3>
                    <p className="header-subtitle">
                        Review how your data will be formatted in the encrypted vault
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
                            <b>You are online</b> - For your security, disconnect from the internet before continuing
                        </div>
                    }
                </div>

                <Card className="preview-card">
                    <Card.Header>
                        <h5>JSON Vault Contents</h5>
                    </Card.Header>
                    <Card.Body>
                        <pre className="preview-content">{currentText}</pre>
                    </Card.Body>
                </Card>

                <div className="form-footer-info mt-3">
                    <div className="security-indicator">
                        <FaLock style={{color:'#4caf50', marginRight:6, fontSize:12}} />
                        <span style={{color:'#4caf50', fontWeight: 600}}>
                            Ready to encrypt
                        </span>
                    </div>
                    <div className="character-counter">
                        <span className={`counter-text ${isOverLimit ? 'error' : isNearLimit ? 'warning' : ''}`}>
                            {isOverLimit ? 
                                `${Math.abs(remainingChars)} characters over limit!` :
                                `${remainingChars} characters remaining`
                            }
                        </span>
                        <span className="page-info">({totalPages?totalPages:2} page{totalPages !== 1 ? 's' : ''})</span>
                    </div>
                </div>

                <div className="continue-section mt-4">
                    <div className="d-flex gap-2">
                        <Button 
                            variant={'outline-secondary'} 
                            size={'lg'}
                            onClick={() => setShowPreview(false)}
                        >
                            ← Back to Edit
                        </Button>
                        <Button 
                            variant={'primary'} 
                            size={'lg'}
                            onClick={onContinue}
                            className="flex-fill"
                        >
                            Encrypt & Continue
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    if (showSyncConfirm) {
        return (
            <div className={'createWrapper'}>
                <div className="secret-entry-header">
                    <div className="header-icon">
                        <MdWarningAmber />
                    </div>
                    <h3>Data Sync Warning</h3>
                    <p className="header-subtitle">
                        Your text cannot be converted to structured data format
                    </p>
                </div>

                <div className="alert alert-warning">
                    <MdWarningAmber style={{marginRight: 8, fontSize: 18, lineHeight:16}}/>
                    <strong>Warning:</strong> The text in Simple Mode cannot be parsed as valid structured data.
                </div>

                <div className="sync-explanation">
                    <p>This usually happens when:</p>
                    <ul>
                        <li>The text is not in JSON format</li>
                        <li>The JSON structure doesn't match the expected format</li>
                        <li>You've entered free-form text instead of structured data</li>
                    </ul>
                </div>

                <div className="sync-options">
                    <h5>What would you like to do?</h5>
                    <div className="d-flex gap-2 mt-3">
                        <Button 
                            variant="outline-secondary" 
                            size="lg"
                            onClick={cancelModeSwitch}
                            className="flex-fill"
                        >
                            ← Stay in Simple Mode
                        </Button>
                        <Button 
                            variant="primary" 
                            size="lg"
                            onClick={confirmModeSwitch}
                            className="flex-fill"
                        >
                            Clear & Switch to Structured Mode
                        </Button>
                    </div>
                </div>

                <div className="mt-3">
                    <small className="text-muted">
                        <strong>Note:</strong> If you choose to switch, your current text will be lost and you'll start fresh in structured mode.
                    </small>
                </div>
            </div>
        );
    }

    if (simpleMode) {
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

                <div className="mode-toggle mb-3">
                    <Button 
                        variant="outline-primary" 
                        onClick={() => handleModeSwitch(false)}
                        className="d-flex align-items-center"
                    >
                        <FaToggleOff className="me-2" />
                        Switch to Structured Mode (Recommended)
                    </Button>
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
                                    <span className={`counter-text ${isOverLimit ? 'error' : isNearLimit ? 'warning' : ''}`}>
                                        {isOverLimit ? 
                                            `${Math.abs(remainingChars)} characters over limit!` :
                                            `${remainingChars} characters remaining`
                                        }
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
                                disabled={!secretValue.trim() || isOverLimit}
                            >
                                Encrypt & Continue
                            </Button>
                            {!secretValue.trim() ? (
                                <p className="continue-note">Enter some secret data to continue</p>
                            ) : isOverLimit ? (
                                <p className="continue-note">Reduce data size to continue</p>
                            ) : null}
                        </div>
                    </form>
                </div>
            </div>
        );
    }

    // Structured mode
    return (
        <div className={'createWrapper'}>
            <div className="secret-entry-header">
                <div className="header-icon">
                    <FaLock />
                </div>
                <h3>Enter Your Secret Data</h3>
                <p className="header-subtitle">
                    Organize your sensitive information into structured categories for better security and usability
                </p>
            </div>

            <div className="mode-toggle mb-3">
                <Button 
                    variant="outline-secondary" 
                    size="sm"
                    onClick={() => handleModeSwitch(true)}
                    className="d-flex align-items-center"
                >
                    <FaToggleOn className="me-2" />
                    Simple Text Mode
                </Button>
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
                
                {syncWarning && (
                    <div className={'alert alert-info mt-2'}>
                        <MdWarningAmber style={{marginRight: 8, fontSize: 18, lineHeight:16}}/>
                        <strong>Sync Notice:</strong> {syncWarning}
                    </div>
                )}
            </div>

            {/* Passwords Section */}
            <DataSection
                title="Passwords & Logins"
                icon={FaKey}
                count={structuredData.passwords.length}
                onAdd={() => addEntry('passwords')}
                addButtonText="Add Password"
                emptyMessage="No passwords added yet. Click 'Add Password' to get started."
            >
                {structuredData.passwords.map((entry, index) => (
                    <PasswordEntryCard
                        key={index}
                        entry={entry}
                        index={index}
                        onUpdate={getUpdateEntryForSection('passwords')}
                        onRemove={getRemoveEntryForSection('passwords')}
                        isFieldVisible={getFieldVisibilityForEntry('passwords', index)}
                        onToggleVisibility={getToggleVisibilityForEntry('passwords', index)}
                    />
                ))}
            </DataSection>

            {/* Wallets Section */}
            <DataSection
                title="Wallet & Crypto"
                icon={FaWallet}
                count={structuredData.wallets.length}
                onAdd={() => addEntry('wallets')}
                addButtonText="Add Wallet"
                emptyMessage="No wallets added yet. Click 'Add Wallet' to get started."
            >
                {structuredData.wallets.map((entry, index) => (
                    <WalletEntryCard
                        key={index}
                        entry={entry}
                        index={index}
                        onUpdate={getUpdateEntryForSection('wallets')}
                        onRemove={getRemoveEntryForSection('wallets')}
                        isFieldVisible={getFieldVisibilityForEntry('wallets', index)}
                        onToggleVisibility={getToggleVisibilityForEntry('wallets', index)}
                    />
                ))}
            </DataSection>

            {/* Notes Section */}
            <DataSection
                title="Secure Notes"
                icon={FaStickyNote}
                count={structuredData.notes.length}
                onAdd={() => addEntry('notes')}
                addButtonText="Add Note"
                emptyMessage="No notes added yet. Click 'Add Note' to get started."
            >
                {structuredData.notes.map((entry, index) => (
                    <NoteEntryCard
                        key={index}
                        entry={entry}
                        index={index}
                        onUpdate={getUpdateEntryForSection('notes')}
                        onRemove={getRemoveEntryForSection('notes')}
                    />
                ))}
            </DataSection>

            {/* API Keys Section */}
            <DataSection
                title="API Keys & Tokens"
                icon={FaCode}
                count={structuredData.apiKeys.length}
                onAdd={() => addEntry('apiKeys')}
                addButtonText="Add API Key"
                emptyMessage="No API keys added yet. Click 'Add API Key' to get started."
            >
                {structuredData.apiKeys.map((entry, index) => (
                    <ApiKeyEntryCard
                        key={index}
                        entry={entry}
                        index={index}
                        onUpdate={getUpdateEntryForSection('apiKeys')}
                        onRemove={getRemoveEntryForSection('apiKeys')}
                        isFieldVisible={getFieldVisibilityForEntry('apiKeys', index)}
                        onToggleVisibility={getToggleVisibilityForEntry('apiKeys', index)}
                    />
                ))}
            </DataSection>

            {/* Custom Section */}
            <DataSection
                title="Custom Entries"
                icon={FaPlus}
                count={structuredData.custom.length}
                onAdd={() => addEntry('custom')}
                addButtonText="Add Custom"
                emptyMessage="No custom entries added yet. Click 'Add Custom' to get started."
            >
                {structuredData.custom.map((entry, index) => (
                    <CustomEntryCard
                        key={index}
                        entry={entry}
                        index={index}
                        onUpdate={getUpdateEntryForSection('custom')}
                        onRemove={getRemoveEntryForSection('custom')}
                        isFieldVisible={getFieldVisibilityForEntry('custom', index)}
                        onToggleVisibility={getToggleVisibilityForEntry('custom', index)}
                    />
                ))}
            </DataSection>

            {/* Footer section */}
            {isOverLimit && (
                <div className="alert alert-danger">
                    <MdWarningAmber style={{marginRight: 8, fontSize: 18, lineHeight:16}}/>
                    <strong>Character limit exceeded!</strong> Your data is {Math.abs(remainingChars)} characters over the limit. 
                    {(() => {
                        // Debug Pro status
                        const isProUser = ProFeatureService.isProUser();
                        const isProUserCached = ProFeatureService.isProUserCached();
                        const currentLimits = ProFeatureService.getCurrentLimits();
                        
                        console.log('=== PRO STATUS DEBUG ===');
                        console.log('isProUser():', isProUser);
                        console.log('isProUserCached():', isProUserCached);
                        console.log('getCurrentLimits():', currentLimits);
                        console.log('maxSecretChars prop:', maxSecretChars);
                        console.log('PRO_LIMITS:', ProFeatureService.PRO_LIMITS);
                        console.log('FREE_LIMITS:', ProFeatureService.FREE_LIMITS);
                        
                        // Check localStorage
                        console.log('=== LOCALSTORAGE DEBUG ===');
                        for (let i = 0; i < localStorage.length; i++) {
                            const key = localStorage.key(i);
                            if (key && (key.includes('pro') || key.includes('license') || key.includes('kosign'))) {
                                console.log(`localStorage["${key}"] =`, localStorage.getItem(key));
                            }
                        }
                        console.log('========================');
                        
                        return isProUser ? (
                            " Please shorten your entries to continue."
                        ) : (
                            <>Upgrade to Pro for {ProFeatureService.PRO_LIMITS.maxStorage} characters of storage, or shorten your entries.</>
                        );
                    })()}
                </div>
            )}
            
            <div className="form-footer-info">
                <div className="security-indicator">
                    <FaLock style={{color:'#4caf50', marginRight:6, fontSize:12}} />
                    <span style={{color:'#4caf50', fontWeight: 600}}>
                        Ready to encrypt
                    </span>
                </div>
                <div className="character-counter">
                    <span className={`counter-text ${isOverLimit ? 'error' : isNearLimit ? 'warning' : ''}`}>
                        {isOverLimit ? 
                            `${Math.abs(remainingChars)} characters over limit!` :
                            `${remainingChars} characters remaining`
                        }
                    </span>
                    <span className="page-info">({totalPages?totalPages:2} page{totalPages !== 1 ? 's' : ''})</span>
                </div>
            </div>

            <div className="continue-section">
                {currentText.trim() && !isOverLimit ? (
                    <div className="d-flex gap-2">
                        <Button 
                            variant={'outline-primary'} 
                            size={'lg'}
                            onClick={() => setShowPreview(true)}
                        >
                            Preview
                        </Button>
                        <Button 
                            variant={'primary'} 
                            size={'lg'}
                            onClick={onContinue}
                            className="flex-fill"
                        >
                            Encrypt & Continue
                        </Button>
                    </div>
                ) : (
                    <>
                        <Button 
                            variant={'primary'} 
                            size={'lg'}
                            className="continue-btn"
                            disabled
                        >
                            Encrypt & Continue
                        </Button>
                        <p className="continue-note">
                            {!currentText.trim() 
                                ? "Add some secret data to continue" 
                                : isOverLimit 
                                ? "Reduce data size to continue" 
                                : "Add some secret data to continue"
                            }
                        </p>
                    </>
                )}
            </div>
        </div>
    );
}

export default SecretDataEntry; 