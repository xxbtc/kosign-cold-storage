import React, { useState, useEffect, useCallback } from 'react'
import { FormGroup, FormText, Button, Card, Form, Dropdown, ButtonGroup } from 'react-bootstrap';
import { FaCheck, FaLock, FaEye, FaKey, FaWallet, FaStickyNote, FaCode, FaPlus, FaEdit, FaChevronDown } from 'react-icons/fa';
import { MdWarningAmber } from 'react-icons/md';


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
    const [showPreview, setShowPreview] = useState(false);
    
    // Structured data state (now includes freeText)
    const [structuredData, setStructuredData] = useState({
        passwords: [],
        wallets: [],
        notes: [],
        apiKeys: [],
        freeText: '',
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

    // New state for tracking entry modes (edit/view/new)
    const [entryModes, setEntryModes] = useState({
        passwords: {},
        wallets: {},
        notes: {},
        apiKeys: {},
        custom: {}
    });

    // Track if we're currently adding a new entry to each section
    const [addingNewEntry, setAddingNewEntry] = useState({
        passwords: false,
        wallets: false,
        notes: false,
        apiKeys: false,
        custom: false
    });

    // Create unified item list for chronological display
    const getAllItems = () => {
        const allItems = [];
        
        // Add items from each section with type information
        Object.keys(structuredData).forEach(section => {
            if (section !== 'freeText' && structuredData[section]) {
                structuredData[section].forEach((item, index) => {
                    allItems.push({
                        type: section,
                        index: index,
                        data: item,
                        // Add a unique key for React rendering
                        id: `${section}-${index}`
                    });
                });
            }
        });
        
        return allItems;
    };



    // Parse JSON back to structured data (now using array format)
    const parseTextToStructured = (text) => {
        if (!text.trim()) {
            return {
                passwords: [],
                wallets: [],
                notes: [],
                apiKeys: [],
                freeText: '',
                custom: []
            };
        }

        try {
            const parsed = JSON.parse(text);
            
            // Initialize valid structure
            const validStructure = {
                passwords: [],
                wallets: [],
                notes: [],
                apiKeys: [],
                freeText: '',
                custom: []
            };

            // Check if this is a flattened format
            if (Array.isArray(parsed)) {
                // Check if this is a single entry (array of strings/values) vs multiple entries (array of arrays)
                const isSingleEntry = parsed.length > 0 && !Array.isArray(parsed[0]);
                
                if (isSingleEntry) {
                    // Single entry format: ["service", "username", "password", ...]
                    const detectedType = detectEntryType(parsed);
                    validStructure[detectedType] = [convertArrayToEntry(parsed, detectedType)];
                } else {
                    // Multiple entries format: [["entry1"], ["entry2"], ...]
                    if (parsed.length > 0 && Array.isArray(parsed[0])) {
                        const firstEntry = parsed[0];
                        const detectedType = detectEntryType(firstEntry);
                        
                        // Convert the flat array to the detected section
                        validStructure[detectedType] = parsed.map(entryArray => {
                            return convertArrayToEntry(entryArray, detectedType);
                        });
                    }
                }
                
                return validStructure;
            }

            // Handle normal categorized format
            Object.keys(validStructure).forEach(section => {
                if (section === 'freeText') {
                    // Handle freeText as string
                    if (typeof parsed[section] === 'string') {
                        validStructure[section] = parsed[section];
                    }
                } else if (parsed[section] && Array.isArray(parsed[section])) {
                    validStructure[section] = parsed[section].map(entryArray => {
                        if (Array.isArray(entryArray)) {
                            return convertArrayToEntry(entryArray, section);
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

    // Helper function to detect entry type from array structure and content
    const detectEntryType = (entryArray) => {
        let detectedType = 'custom'; // default fallback
        
        // Detect type based on array length and content patterns
        if (entryArray.length === 2) {
            detectedType = 'notes'; // [title, content]
        } else if (entryArray.length >= 3 && entryArray.length <= 5) {
            // Look for common patterns to distinguish types
            const hasEmailPattern = entryArray.some(field => 
                typeof field === 'string' && field.includes('@')
            );
            const hasSeedPattern = entryArray.some(field => 
                typeof field === 'string' && 
                (field.includes('seed') || field.split(' ').length >= 12)
            );
            const hasKeyPattern = entryArray.some(field => 
                typeof field === 'string' && 
                (field.toLowerCase().includes('key') || field.toLowerCase().includes('token'))
            );
            
            if (hasSeedPattern) {
                detectedType = 'wallets';
            } else if (hasKeyPattern) {
                detectedType = 'apiKeys';
            } else if (hasEmailPattern) {
                detectedType = 'passwords';
            } else {
                detectedType = entryArray.length === 3 ? 'custom' : 'passwords';
            }
        }
        
        return detectedType;
    };

    // Helper function to convert array back to entry object
    const convertArrayToEntry = (entryArray, section) => {
        switch (section) {
            case 'passwords':
                // [service, username, password, url, notes]
                return {
                    service: entryArray[0] || '',
                    username: entryArray[1] || '',
                    password: entryArray[2] || '',
                    url: entryArray[3] || '',
                    notes: entryArray[4] || ''
                };
            case 'wallets':
                // [name, seed, privateKey, address, notes]
                return {
                    name: entryArray[0] || '',
                    seed: entryArray[1] || '',
                    privateKey: entryArray[2] || '',
                    address: entryArray[3] || '',
                    notes: entryArray[4] || ''
                };
            case 'notes':
                // [title, content]
                return {
                    title: entryArray[0] || '',
                    content: entryArray[1] || ''
                };
            case 'apiKeys':
                // [service, key, secret, notes]
                return {
                    service: entryArray[0] || '',
                    key: entryArray[1] || '',
                    secret: entryArray[2] || '',
                    notes: entryArray[3] || ''
                };
            case 'custom':
                // [label, value, notes]
                return {
                    label: entryArray[0] || '',
                    value: entryArray[1] || '',
                    notes: entryArray[2] || ''
                };
            default:
                return {};
        }
    };

    // Convert structured data to compact array format (saves characters)
    const convertToText = useCallback(() => {
        console.log('convertToText called with structuredData:', structuredData);
        
        // Convert to compact array format
        const cleanData = {};
        const sectionsWithData = [];
        
        Object.keys(structuredData).forEach(section => {
            if (section === 'freeText') {
                // Handle freeText as string
                if (structuredData.freeText && structuredData.freeText.trim()) {
                    cleanData.freeText = structuredData.freeText;
                    sectionsWithData.push('freeText');
                }
                return;
            }
            
            console.log(`Processing section ${section}, length: ${structuredData[section].length}`);
            if (structuredData[section].length > 0) {
                const entries = structuredData[section].map(entry => {
                    // Convert object to array based on section type
                    switch (section) {
                        case 'passwords':
                            // [service, username, password, url, notes] - only include non-empty values
                            const pwdArray = [
                                entry.service || '',
                                entry.username || '',
                                entry.password || '',
                                entry.url || '',
                                entry.notes || ''
                            ];
                            // Trim trailing empty strings to save space
                            while (pwdArray.length > 0 && pwdArray[pwdArray.length - 1] === '') {
                                pwdArray.pop();
                            }
                            return pwdArray;
                        case 'wallets':
                            // [name, seed, privateKey, address, notes]
                            const walletArray = [
                                entry.name || '',
                                entry.seed || '',
                                entry.privateKey || '',
                                entry.address || '',
                                entry.notes || ''
                            ];
                            while (walletArray.length > 0 && walletArray[walletArray.length - 1] === '') {
                                walletArray.pop();
                            }
                            return walletArray;
                        case 'notes':
                            // [title, content]
                            const notesArray = [
                                entry.title || '',
                                entry.content || ''
                            ];
                            while (notesArray.length > 0 && notesArray[notesArray.length - 1] === '') {
                                notesArray.pop();
                            }
                            return notesArray;
                        case 'apiKeys':
                            // [service, key, secret, notes]
                            const apiArray = [
                                entry.service || '',
                                entry.key || '',
                                entry.secret || '',
                                entry.notes || ''
                            ];
                            while (apiArray.length > 0 && apiArray[apiArray.length - 1] === '') {
                                apiArray.pop();
                            }
                            return apiArray;
                        case 'custom':
                            // [label, value, notes]
                            const customArray = [
                                entry.label || '',
                                entry.value || '',
                                entry.notes || ''
                            ];
                            while (customArray.length > 0 && customArray[customArray.length - 1] === '') {
                                customArray.pop();
                            }
                            return customArray;
                        default:
                            return [];
                    }
                }).filter(array => array.length > 0); // Only include non-empty arrays
                
                if (entries.length > 0) {
                    cleanData[section] = entries;
                    sectionsWithData.push(section);
                }
                console.log(`Added ${entries.length} entries to cleanData[${section}]:`, entries);
            }
        });
        
        console.log('Final cleanData:', cleanData);
        console.log('Sections with data:', sectionsWithData);
        
        // OPTIMIZATION: If only one section has data (and no freeText), return just the array
        const nonFreeTextSections = sectionsWithData.filter(s => s !== 'freeText');
        if (nonFreeTextSections.length === 1 && !cleanData.freeText) {
            const singleSection = nonFreeTextSections[0];
            const sectionData = cleanData[singleSection];
            
            // FURTHER OPTIMIZATION: If only one entry in the single section, return just that entry
            if (sectionData.length === 1) {
                const result = JSON.stringify(sectionData[0]);
                console.log('convertToText result (single entry optimization):', result);
                return result;
            } else {
                const result = JSON.stringify(sectionData);
                console.log('convertToText result (single section optimization):', result);
                return result;
            }
        }
        
        // Return compact JSON (no spaces) to save characters
        const result = Object.keys(cleanData).length > 0 ? JSON.stringify(cleanData) : '';
        console.log('convertToText result:', result);
        return result;
    }, [structuredData]);

    // Calculate current character usage (unified mode)
    const getCurrentText = () => {
        return convertToText();
    };

    // Count only user content, not JSON structure overhead
    const getUserContentLength = () => {
        let totalLength = 0;
        
        // Count characters in structured data entries
        Object.keys(structuredData).forEach(section => {
            if (section === 'freeText') {
                // Free text counts directly
                totalLength += (structuredData.freeText || '').length;
            } else if (structuredData[section] && Array.isArray(structuredData[section])) {
                // Count characters in each entry's fields
                structuredData[section].forEach(entry => {
                    Object.values(entry).forEach(value => {
                        if (typeof value === 'string' && value) {
                            totalLength += value.length;
                        }
                    });
                });
            }
        });
        
        return totalLength;
    };

    const currentText = getCurrentText();
    const currentCharCount = getUserContentLength();
    const remainingChars = maxSecretChars - currentCharCount;
    const isOverLimit = remainingChars < 0;

    // Only disable adding when actually over the limit
    const canAddNewEntry = () => {
        return remainingChars >= 0; // Only disable if over limit
    };

    // Initialize structured data from secret value on component load
    useEffect(() => {
        if (secretValue && secretValue.trim()) {
            const parsed = parseTextToStructured(secretValue);
            if (parsed) {
                setStructuredData(parsed);
                console.log('Initialized structured data from secret:', parsed);
            }
        }
    }, []); // Only run on mount

    // Update the main secret value when structured data changes
    useEffect(() => {
        const formattedText = convertToText();
        console.log('useEffect - updating secret:', formattedText);
        console.log('useEffect - length:', formattedText.length);
        setSecret(formattedText);
    }, [structuredData, convertToText]);

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

    const startAddingEntry = (section) => {
        // Mark that we're adding a new entry to this section
        setAddingNewEntry(prev => ({
            ...prev,
            [section]: true
        }));
    };

    // Add new item by type (unified approach)
    const addNewItem = (itemType) => {
        confirmAddEntry(itemType);
    };

    const confirmAddEntry = (section) => {
        let newEntry = {};
        switch (section) {
            case 'passwords':
                newEntry = { service: '', username: '', password: '', url: '', notes: '' };
                break;
            case 'wallets':
                newEntry = { name: '', seed: '', privateKey: '', address: '', notes: '' };
                break;
            case 'notes':
                newEntry = { title: '', content: '' };
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
            
            // Auto-expand the new entry and set it to edit mode
            const newIndex = updated[section].length - 1;
            setExpandedEntries(prevExpanded => ({
                ...prevExpanded,
                [section]: {
                    ...prevExpanded[section],
                    [newIndex]: true
                }
            }));

            // Set new entry to edit mode
            setEntryModes(prevModes => ({
                ...prevModes,
                [section]: {
                    ...prevModes[section],
                    [newIndex]: 'edit'
                }
            }));
            
            return updated;
        });

        // Stop the adding state
        setAddingNewEntry(prev => ({
            ...prev,
            [section]: false
        }));
    };

    const cancelAddEntry = (section) => {
        setAddingNewEntry(prev => ({
            ...prev,
            [section]: false
        }));
    };

    const removeEntry = (section, index) => {
        setStructuredData(prev => ({
            ...prev,
            [section]: prev[section].filter((_, i) => i !== index)
        }));

        // Clean up entry modes and expanded states for this index
        setEntryModes(prevModes => {
            const newModes = { ...prevModes };
            const sectionModes = { ...newModes[section] };
            
            // Remove the deleted entry and shift down higher indices
            delete sectionModes[index];
            Object.keys(sectionModes).forEach(key => {
                const keyIndex = parseInt(key);
                if (keyIndex > index) {
                    sectionModes[keyIndex - 1] = sectionModes[keyIndex];
                    delete sectionModes[keyIndex];
                }
            });
            
            newModes[section] = sectionModes;
            return newModes;
        });

        setExpandedEntries(prevExpanded => {
            const newExpanded = { ...prevExpanded };
            const sectionExpanded = { ...newExpanded[section] };
            
            // Remove the deleted entry and shift down higher indices
            delete sectionExpanded[index];
            Object.keys(sectionExpanded).forEach(key => {
                const keyIndex = parseInt(key);
                if (keyIndex > index) {
                    sectionExpanded[keyIndex - 1] = sectionExpanded[keyIndex];
                    delete sectionExpanded[keyIndex];
                }
            });
            
            newExpanded[section] = sectionExpanded;
            return newExpanded;
        });
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

    // Entry mode management
    const setEntryMode = (section, index, mode) => {
        setEntryModes(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [index]: mode
            }
        }));
    };

    const getEntryMode = (section, index) => {
        return entryModes[section][index] || 'view';
    };

    const saveEntry = (section, index) => {
        setEntryMode(section, index, 'view');
        // Collapse the entry after saving
        setExpandedEntries(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [index]: false
            }
        }));
    };

    const cancelEditEntry = (section, index) => {
        // If this is a new entry with no content, remove it
        const entry = structuredData[section][index];
        const hasContent = Object.values(entry).some(value => value && value.trim() !== '');
        
        if (!hasContent) {
            removeEntry(section, index);
        } else {
            setEntryMode(section, index, 'view');
            setExpandedEntries(prev => ({
                ...prev,
                [section]: {
                    ...prev[section],
                    [index]: false
                }
            }));
        }
    };

    const editEntry = (section, index) => {
        setEntryMode(section, index, 'edit');
        // Expand the entry when editing
        setExpandedEntries(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [index]: true
            }
        }));
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

    // Update free text content
    const updateFreeText = (value) => {
        setStructuredData(prev => ({
            ...prev,
            freeText: value
        }));
    };

    // Render entry card based on type
    const renderEntryCard = (item) => {
        const { type, index, data, id } = item;
        
        const commonProps = {
            key: id,
            entry: data,
            index: index,
            onUpdate: getUpdateEntryForSection(type),
            onRemove: getRemoveEntryForSection(type),
            isExpanded: isEntryExpanded(type, index),
            onToggleExpanded: getToggleExpandedForSection(type),
            entryMode: getEntryMode(type, index),
            onSave: () => saveEntry(type, index),
            onCancel: () => cancelEditEntry(type, index),
            onEdit: () => editEntry(type, index)
        };

        switch (type) {
            case 'passwords':
                return (
                    <PasswordEntryCard
                        {...commonProps}
                        isFieldVisible={getFieldVisibilityForEntry(type, index)}
                        onToggleVisibility={getToggleVisibilityForEntry(type, index)}
                    />
                );
            case 'wallets':
                return (
                    <WalletEntryCard
                        {...commonProps}
                        isFieldVisible={getFieldVisibilityForEntry(type, index)}
                        onToggleVisibility={getToggleVisibilityForEntry(type, index)}
                    />
                );
            case 'notes':
                return <NoteEntryCard {...commonProps} />;
            case 'apiKeys':
                return (
                    <ApiKeyEntryCard
                        {...commonProps}
                        isFieldVisible={getFieldVisibilityForEntry(type, index)}
                        onToggleVisibility={getToggleVisibilityForEntry(type, index)}
                    />
                );
            case 'custom':
                return (
                    <CustomEntryCard
                        {...commonProps}
                        isFieldVisible={getFieldVisibilityForEntry(type, index)}
                        onToggleVisibility={getToggleVisibilityForEntry(type, index)}
                    />
                );
            default:
                return null;
        }
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



                <Card className="preview-card">
                    <Card.Header>
                        <h5>Vault Contents</h5>
                    </Card.Header>
                    <Card.Body>
                        <pre className="preview-content">{currentText}</pre>
                    </Card.Body>
                </Card>



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



    // Main tabbed interface
    return (
        <div className={'createWrapper'}>
            {/* Compact Header */}
            <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="d-flex align-items-center">
                    <FaLock className="me-2" style={{fontSize: 18, color: '#e5e5e5'}} />
                    <div>
                        <h4 className="mb-0" style={{color: '#e5e5e5'}}>Build Your Vault</h4>
                        <small style={{color: !isOnline ? '#4caf50' : '#ff9800'}}>
                            {!isOnline ? (
                                <><FaCheck className="me-1" style={{fontSize: 10}} />Offline - secure mode</>
                            ) : (
                                <><MdWarningAmber className="me-1" style={{fontSize: 12}} />Online - disconnect for security</>
                            )}
                        </small>
                    </div>
                </div>
                <div className="text-end">
                    <div className="d-flex align-items-center justify-content-end gap-2">
                        {isOverLimit && (
                            <span className="text-danger small">Over limit!</span>
                        )}
                        <div className={`badge ${isOverLimit ? 'bg-danger' : 'bg-success'} fs-6`}>
                            {currentCharCount} / {maxSecretChars} chars
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Action Cards */}
            <div className="add-item-cards mb-4">
                <div className="row g-2">
                    <div className="col">
                        <button 
                            className="action-card"
                            onClick={() => addNewItem('passwords')}
                            disabled={!canAddNewEntry()}
                        >
                            <FaKey className="action-icon" />
                            <span className="action-label">Password</span>
                        </button>
                    </div>
                    <div className="col">
                        <button 
                            className="action-card"
                            onClick={() => addNewItem('wallets')}
                            disabled={!canAddNewEntry()}
                        >
                            <FaWallet className="action-icon" />
                            <span className="action-label">Wallet</span>
                        </button>
                    </div>
                    <div className="col">
                        <button 
                            className="action-card"
                            onClick={() => addNewItem('notes')}
                            disabled={!canAddNewEntry()}
                        >
                            <FaStickyNote className="action-icon" />
                            <span className="action-label">Note</span>
                        </button>
                    </div>
                    <div className="col">
                        <button 
                            className="action-card"
                            onClick={() => addNewItem('apiKeys')}
                            disabled={!canAddNewEntry()}
                        >
                            <FaCode className="action-icon" />
                            <span className="action-label">API Key</span>
                        </button>
                    </div>
                    <div className="col">
                        <button 
                            className="action-card"
                            onClick={() => addNewItem('custom')}
                            disabled={!canAddNewEntry()}
                        >
                            <FaPlus className="action-icon" />
                            <span className="action-label">Custom</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Items List */}
            <div className="items-list">
                {getAllItems().length === 0 && !structuredData.freeText ? (
                    <div className="text-center py-5 text-muted">
                        <FaLock size={48} className="mb-3 opacity-50" />
                        <h5>Your vault is empty</h5>
                        <p>Click an item type above to start storing your sensitive data</p>
                    </div>
                ) : (
                    <>
                        {getAllItems().map(item => renderEntryCard(item))}
                    </>
                )}
            </div>

            {/* Free Text Section - only show if there's existing content */}
            {structuredData.freeText && (
                <Card className="mb-4 section-card">
                    <Card.Header>
                        <div className="d-flex align-items-center">
                            <FaEdit className="me-2" />
                            <h5 className="mb-0">Additional Notes</h5>
                        </div>
                    </Card.Header>
                    <Card.Body>
                        <div className="data-entry-section">
                            <textarea
                                value={structuredData.freeText}
                                onChange={(e) => updateFreeText(e.target.value)}
                                className={'form-control secretTextInput'}
                                placeholder={'Enter any additional notes or unstructured text here...'}
                                rows={6}
                                spellCheck={false}
                                autoCorrect="off"
                                autoCapitalize="off"
                                autoComplete="off"
                                style={{
                                    backgroundColor: '#1a1a1a',
                                    border: '1px solid #333333',
                                    color: '#e5e5e5',
                                    fontSize: '14px'
                                }}
                            />
                        </div>
                    </Card.Body>
                </Card>
            )}

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