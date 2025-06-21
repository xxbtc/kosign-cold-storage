import React, { useState, useEffect, useCallback } from 'react'
import { FormGroup, FormText, Button, Card, Form, Tab, Tabs } from 'react-bootstrap';
import { FaCheck, FaLock, FaEye, FaKey, FaWallet, FaStickyNote, FaCode, FaPlus, FaEdit, FaCogs } from 'react-icons/fa';
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
    const [activeTab, setActiveTab] = useState('structured');
    const [showPreview, setShowPreview] = useState(false);
    const [syncWarning, setSyncWarning] = useState('');
    const [showSyncConfirm, setShowSyncConfirm] = useState(false);
    const [pendingTabSwitch, setPendingTabSwitch] = useState(null);
    
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
    
    // Accordion states for each section
    const [expandedEntries, setExpandedEntries] = useState({
        passwords: {},
        wallets: {},
        notes: {},
        apiKeys: {},
        custom: {}
    });



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

    // Calculate current character usage based on active tab
    const getCurrentText = () => {
        if (activeTab === 'simple') {
            return secretValue;
        } else {
            return convertToText();
        }
    };

    // Simple character counting - just count the actual string length
    const getUserContentLength = () => {
        if (activeTab === 'simple') {
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
        if (activeTab === 'structured') {
            const formattedText = convertToText();
            console.log('useEffect - updating secret in structured mode:', formattedText);
            console.log('useEffect - length:', formattedText.length);
            setSecret(formattedText);
        }
    }, [structuredData, convertToText]); // Keep activeTab out to avoid conflicts during tab switching

    // Note: Tab switching is now handled manually in handleTabSwitch to avoid useEffect conflicts

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
            
            // Auto-expand the new entry
            const newIndex = updated[section].length - 1;
            setExpandedEntries(prevExpanded => ({
                ...prevExpanded,
                [section]: {
                    ...prevExpanded[section],
                    [newIndex]: true
                }
            }));
            
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

    // Accordion management functions
    const toggleEntryExpanded = (section, index) => {
        setExpandedEntries(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [index]: !prev[section][index]
            }
        }));
    };

    const isEntryExpanded = (section, index) => {
        return expandedEntries[section][index] || false;
    };

    const getToggleExpandedForSection = (section) => (index) => {
        toggleEntryExpanded(section, index);
    };

    // Bulk accordion actions
    const expandAllInSection = (section) => {
        const newExpanded = {};
        structuredData[section].forEach((_, index) => {
            newExpanded[index] = true;
        });
        setExpandedEntries(prev => ({
            ...prev,
            [section]: newExpanded
        }));
    };

    const collapseAllInSection = (section) => {
        setExpandedEntries(prev => ({
            ...prev,
            [section]: {}
        }));
    };

    // Handle tab switching with bidirectional sync
    const handleTabSwitch = (newTab) => {
        setSyncWarning(''); // Clear any previous warnings
        
        if (newTab === 'structured') {
            // Switching TO structured tab FROM simple tab
            // Try to parse the current secretValue back to structured data
            const parsedData = parseTextToStructured(secretValue);
            
            if (parsedData) {
                // Successfully parsed - update structured data
                setStructuredData(parsedData);
                setActiveTab('structured');
            } else if (secretValue.trim()) {
                // Failed to parse but has content - show confirmation dialog BEFORE clearing
                setPendingTabSwitch(newTab);
                setShowSyncConfirm(true);
            } else {
                // Empty content - just switch tabs
                setActiveTab('structured');
            }
        } else {
            // Switching TO simple tab FROM structured tab
            // Store compact JSON but user will see formatted version
            const compactJson = convertToText();
            console.log('Tab switch - about to call setSecret with:', compactJson);
            console.log('Length of JSON:', compactJson.length);
            setSecret(compactJson);
            setActiveTab('simple');
        }
    };

    // Confirm the tab switch after user sees the warning
    const confirmTabSwitch = () => {
        if (pendingTabSwitch === 'structured') {
            // Clear structured data and switch to structured tab
            setStructuredData({
                passwords: [],
                wallets: [],
                notes: [],
                apiKeys: [],
                custom: []
            });
            setActiveTab('structured');
            setSyncWarning('Previous text could not be parsed as structured data. Starting fresh.');
        }
        
        // Clean up
        setShowSyncConfirm(false);
        setPendingTabSwitch(null);
    };

    // Cancel the tab switch
    const cancelTabSwitch = () => {
        setShowSyncConfirm(false);
        setPendingTabSwitch(null);
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
                            onClick={cancelTabSwitch}
                            className="flex-fill"
                        >
                            ← Stay in Simple Tab
                        </Button>
                        <Button 
                            variant="primary" 
                            size="lg"
                            onClick={confirmTabSwitch}
                            className="flex-fill"
                        >
                            Clear & Switch to Structured Tab
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

    // Main tabbed interface
    return (
        <div className={'createWrapper'}>
            <div className="secret-entry-header">
                <div className="header-icon">
                    <FaLock />
                </div>
                <h3>Enter Your Secret Data</h3>
                <p className="header-subtitle">
                    Choose how you'd like to organize your sensitive information
                </p>
            </div>

            <div className="security-status-section mb-3">
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

            {/* Tabbed Interface */}
            <Tabs 
                activeKey={activeTab} 
                onSelect={handleTabSwitch}
                fill
            >
                <Tab 
                    eventKey="structured" 
                    title={
                        <span className="d-flex align-items-center">
                            <FaCogs className="me-2" />
                            Structured Entry
                            <small className="ms-2 text-muted">(Recommended)</small>
                        </span>
                    }
                >
                    {/* Structured Mode Content */}

            {/* Passwords Section */}
            <DataSection
                title="Passwords & Logins"
                icon={FaKey}
                count={structuredData.passwords.length}
                onAdd={() => addEntry('passwords')}
                addButtonText="Add Password"
                emptyMessage="No passwords added yet. Click 'Add Password' to get started."
                onExpandAll={() => expandAllInSection('passwords')}
                onCollapseAll={() => collapseAllInSection('passwords')}
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
                        isExpanded={isEntryExpanded('passwords', index)}
                        onToggleExpanded={getToggleExpandedForSection('passwords')}
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
                onExpandAll={() => expandAllInSection('wallets')}
                onCollapseAll={() => collapseAllInSection('wallets')}
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
                        isExpanded={isEntryExpanded('wallets', index)}
                        onToggleExpanded={getToggleExpandedForSection('wallets')}
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
                onExpandAll={() => expandAllInSection('notes')}
                onCollapseAll={() => collapseAllInSection('notes')}
            >
                {structuredData.notes.map((entry, index) => (
                    <NoteEntryCard
                        key={index}
                        entry={entry}
                        index={index}
                        onUpdate={getUpdateEntryForSection('notes')}
                        onRemove={getRemoveEntryForSection('notes')}
                        isExpanded={isEntryExpanded('notes', index)}
                        onToggleExpanded={getToggleExpandedForSection('notes')}
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
                onExpandAll={() => expandAllInSection('apiKeys')}
                onCollapseAll={() => collapseAllInSection('apiKeys')}
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
                        isExpanded={isEntryExpanded('apiKeys', index)}
                        onToggleExpanded={getToggleExpandedForSection('apiKeys')}
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
                onExpandAll={() => expandAllInSection('custom')}
                onCollapseAll={() => collapseAllInSection('custom')}
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
                        isExpanded={isEntryExpanded('custom', index)}
                        onToggleExpanded={getToggleExpandedForSection('custom')}
                    />
                ))}
            </DataSection>



                </Tab>

                <Tab 
                    eventKey="simple" 
                    title={
                        <span className="d-flex align-items-center">
                            <FaEdit className="me-2" />
                            Simple Text
                        </span>
                    }
                >
                    {/* Simple Mode Content */}
                    <div className="data-entry-section">
                        <form>
                            <FormGroup className={'formGroup'} controlId="formBasicSecret">
                                <label className="form-label">Secret Data</label>
                                <textarea
                                    value={secretValue}
                                    onChange={(e) => setSecret(e.target.value)}
                                    className={'form-control secretTextInput'}
                                    placeholder={'Enter your sensitive data here...\n\nExamples:\n• Password: mySecurePassword123\n• Recovery phrase: word1 word2 word3...\n• Private note: Important information...'}
                                    rows={12}
                                />
                            </FormGroup>
                        </form>
                    </div>
                </Tab>
            </Tabs>

            {/* Footer section - shared between both tabs */}
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