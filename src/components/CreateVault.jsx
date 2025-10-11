import React, { useEffect, useRef, useState} from 'react'
import { Link , useNavigate} from 'react-router-dom'
import {Form, FormGroup, FormText, Button, Card} from 'react-bootstrap';
import {EncryptionService} from "../services/EncryptionService";
import Navbar from "../components/NavbarTop";
import ReactDOMServer from 'react-dom/server';
import { FaEye } from 'react-icons/fa';

import '../style/index.css';
import '../style/createPage.css';
import '../style/forms.css';
import '../style/dashboardPage.css';
import Cookies from 'universal-cookie';

import CreateMintKeys from "../components/CreateMintKeys";
import CreateLoading from "../components/CreateLoading";
import SecretDataEntry from "../components/SecretDataEntry";
import PDFVaultBackup from '../components/PDFVaultBackup';
import PDFKeyBackup from "../components/PDFKeyBackup";
import {useReactToPrint} from 'react-to-print';
import Html2PDF from 'html2pdf.js';
import {Oval} from "react-loading-icons";
import VaultDownloadSection from './VaultDownloadSection';
import { getCurrentLimits, clearProSession } from '../config/limits';
import SecurityPreparationStep from './SecurityPreparationStep';
import { useSensitiveMode } from '../contexts/SensitiveModeContext';

function CreateVault(props) {

    const cookies   = new Cookies();
    const navigate  = useNavigate();
    const { enterSensitiveMode, exitSensitiveMode } = useSensitiveMode();

    const [secretValue, setSecretValue] = useState('');
    const [compressedSecretValue, setCompressedSecretValue] = useState('');
    const [cipherText, setCiphertext] = useState(null);
    const [cipherKey, setCipherKey] = useState(null);
    const [cipherIV, setCipherIV] = useState(null);
    const [cipherOpenSSL, setCipherOpenSSL] = useState(null);
    const [consensus, setConsensus] = useState(2);
    const [vaultIdent, setVaultIdent] = useState(null);
    const [wizardStep, setWizardStep] = useState(1);
    const [shares, setShares] = useState([]);
    const [vaultName, setVaultName] = useState('');
    const [totalShareholders, setTotalShareholders] = useState(3);
    const [maxSecretChars, setMaxChars] = useState(() => {
        const limits = getCurrentLimits();
        return limits.maxStorage;
    });
    const [maxDescriptionChars, setMaxDescriptionChars] = useState(135);
    const [maxVaultNameChars, setMaxVaultNameChars] = useState(50);
    const [keyAliasArray, setKeyAliasArray] = useState([]);

    const [hasPressedVaultPrint, setHasPressedVaultPrint]   = useState(false);
    const [hasPressedKeyPrint, setHasPressedKeyPrint]       = useState(false);
    const [agreeToTerms, setAgreeToTerms] = useState(false);
    const [description, setDescription] = useState('');

    const [pageTitle, setPageTitle] = useState('Create a vault');
    const [createdTimestamp, setCreatedTimestamp] = useState();
    const refBackupVaultPDF = useRef(null);
    const refBackupKeyPDF   = useRef(null);

    const [showPDFBackupVault, setShowPDFBackupVault] = useState();
    const [isOnline, setIsOnline]   = useState(navigator.onLine);
    const [totalPages, setTotalPages] = useState();

    // Reduced for single-page vaults with easier scanning
    const maxLengthPerQRCode = 150;  // Reduced from 400 to 150
    const qrPerPage     = 1;     // Single QR per page for better UX
    const firstPageQR   = 1;     // Start with 1 QR on first page
    const qrPerRow      = 1;     // One QR per row for better layout

    const [vaultColors, setVaultColors] = useState([]);


    // Set application limits
    useEffect(() => {
        const currentLimits = getCurrentLimits();
        setMaxChars(currentLimits.maxStorage);
    }, []);

    const calculateHowManyPages = (value) => {
        // Single QR code vault - all data combined
        // The combined vault data (metadata + encrypted content) will be in one QR code
        // This should typically result in Version 6-8 QR codes which are very scannable
        
        // Estimate total size: metadata (~100-150 chars) + encrypted data (~value.length * 1.4)
        const estimatedMetadataSize = 150; // Conservative estimate for metadata
        const estimatedCipherTextLength = Math.ceil(value.length * 1.4);
        const estimatedTotalSize = estimatedMetadataSize + estimatedCipherTextLength;
        
        // Log for debugging
        console.log('Single QR Vault size estimation:');
        console.log('  - Input data length:', value.length);
        console.log('  - Estimated encrypted size:', estimatedCipherTextLength);
        console.log('  - Estimated metadata size:', estimatedMetadataSize);
        console.log('  - Total estimated size:', estimatedTotalSize);
        
        // Always return 1 page since everything is in a single QR code
        return 1;
    };

    const setSecret = (newSecretValue) => {
        console.log('Parent setSecret called:');
        console.log('  - Current secretValue length:', secretValue.length);
        console.log('  - New value length:', newSecretValue.length);
        console.log('  - Max chars allowed:', maxSecretChars);
        
        // Always allow the update - let the UI handle the character limit warnings
        // Users should see their full data and make informed decisions about what to remove
        console.log('  - ALLOWED: Always updating secret value (UI will handle limit warnings)');
        // Note: We'll calculate pages based on compressed version at encryption time
        setSecretValue(newSecretValue);
    };

    const setDescriptionValue = (newDescription) => {
        if (newDescription.length > description.length) {
            if ((description.length >= maxDescriptionChars) || (newDescription.length - 1 >= maxDescriptionChars)) {
                return;
            }
        }
        setDescription(newDescription);
        setCookie('kosign_vaultdescription', newDescription);
    };

    const setVaultNameValue = (newVaultName) => {
        if (newVaultName.length > vaultName.length) {
            if ((vaultName.length >= maxVaultNameChars) || (newVaultName.length - 1 >= maxVaultNameChars)) {
                return;
            }
        }
        setVaultName(newVaultName);
        setCookie('kosign_vaultname', newVaultName);
    };

    const setCookie = (cookieName, cookieValue) => {
        const expirationTime = 10 * 60 * 1000; // 10 minutes in milliseconds

        const cookieOptions = {
            maxAge: expirationTime,
        };

        cookies.set(cookieName, cookieValue, cookieOptions);
    };

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

    useEffect(()=>{
        if (wizardStep===5 && compressedSecretValue) {
            setTimeout(() => {
                // Generate colors once when entering step 5 (encryption)
                setVaultColors(generateColors());
                
                // Calculate pages based on compressed version
                setTotalPages(calculateHowManyPages(compressedSecretValue));
                             
                EncryptionService.encrypt(compressedSecretValue, false).then((encryptionResult) => {
                    setCiphertext(encryptionResult.cipherText);
                    setCipherKey(encryptionResult.cipherKey);
                    setCipherIV(encryptionResult.cipherIV);
                    setCipherOpenSSL(encryptionResult.cipherOpenSSL);
                    setVaultIdent('kosign-coldstorage');
                    setCreatedTimestamp(Math.floor(Date.now() / 1000));
                   
                    if (parseInt(totalShareholders)>1) {
                        EncryptionService.splitKey(encryptionResult.cipherKey, parseInt(totalShareholders), parseInt(consensus)).then((xshares) => {
                            setShares(xshares);
                        });
                    } else {
                        setShares([encryptionResult.cipherKey]);
                    }
                });
            }, 1000);
        }
    }, [wizardStep, compressedSecretValue]);

    // Enter sensitive mode after vault configuration and NEVER exit until component unmounts
    useEffect(() => {
        if (wizardStep >= 2) {
            // Once we enter step 2+, we're in sensitive mode for the entire process
            enterSensitiveMode();
        }
        
        // Only cleanup on component unmount, never during wizard steps
        return () => {
            if (wizardStep >= 2) {
                exitSensitiveMode();
            }
            // Clear pro session when component unmounts (vault creation complete or cancelled)
            clearProSession();
        };
    }, []); // Empty dependency array - only run on mount/unmount

    // Trigger sensitive mode when advancing to step 2+
    useEffect(() => {
        if (wizardStep >= 2) {
            enterSensitiveMode();
        }
    }, [wizardStep, enterSensitiveMode]);

    // Auto-scroll to top when wizard step changes
    useEffect(() => {
        // Only scroll if user has scrolled down (more than 100px from top)
        if (window.scrollY > 100) {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    }, [wizardStep]);




    useEffect (()=>{
     //   console.log('NAVIGATOR IS ', navigator.onLine);
    }, [navigator.onLine]);

    useEffect(() => {
        const handleOnline  = () => setIsOnline(navigator.onLine);
        const handleOffline = () => setIsOnline(navigator.onLine);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    useEffect(()=> {
       let cookieVaultName          = cookies.get('kosign_vaultname');
       let cookieVaultDescription   = cookies.get('kosign_vaultdescription');
       let cookieShares             = cookies.get('kosign_shares');
       let cookieThreshold          = cookies.get('kosign_threshold');

       if (cookieVaultDescription) setDescription(cookieVaultDescription);
       if (cookieVaultName) setVaultName(cookieVaultName);
       if (cookieShares) setTotalShareholders(cookieShares);
       if (cookieThreshold) setConsensus(cookieThreshold);

    }, []);

    // Validate key limits
    const exceedsKeyLimit = () => {
        return totalShareholders > getCurrentLimits().maxShares;
    };


    const continueWizard = async (forcepage) => {
        if (!agreeToTerms) {
            alert('You must agree to the terms to use this service');
            return;
        }

        if (!vaultName) {
            alert('Enter a vault name');
            return;
        }

        // Check if user exceeds key limits
        if (exceedsKeyLimit()) {
            const maxKeys = getCurrentLimits().maxShares;
            alert(`Maximum ${maxKeys} keys supported due to cryptographic library constraints. Please reduce the number of keys.`);
            return;
        }

        //forcepage is just for testing purposes
        if (forcepage) {
            setWizardStep(forcepage);
            return;
        }

        const aliases = EncryptionService.generateListOfCombinedWords(totalShareholders);  
        setKeyAliasArray(aliases);
        setWizardStep(2); // Go to security check first
    };

    // Add new function for security step
    const continueFromSecurity = () => {
        setWizardStep(3); // Go to secret data entry
    };

    // Add new function for continuing from secret data entry to preview
    const continueFromSecretData = (compressedText) => {
        setCompressedSecretValue(compressedText || secretValue); // Use compressed version for storage
        setWizardStep(4); // Go to preview step (new)
    };

    // Add new function for continuing from preview to encryption
    const continueFromPreview = () => {
        setWizardStep(5); // Go to encryption step (shifted from 4 to 5)
    };


    const handlePrint = useReactToPrint({
        onPrintError: (error) => console.log(error),
        content: () => refBackupVaultPDF.current,
        removeAfterPrint: true,
    });

    const doPrintVault = () => {
        setHasPressedVaultPrint(true);
        handlePrint();
    };
    const handlePrintKeys = useReactToPrint({
        onPrintError: (error) => console.log(error),
        content: () => refBackupKeyPDF.current,
        removeAfterPrint: true,
    });

    const doPrintKeys = () => {

        handlePrintKeys();
        setHasPressedKeyPrint(true);
    };

    const downloadVault = async () => {
        const printElement = ReactDOMServer.renderToString(
            <div style={{padding:0}}>
                <PDFVaultBackup
                vaultIdent          = {vaultIdent}
                cipherText          = {cipherText}
                shares              = {shares}
                threshold           = {consensus}
                vaultName           = {vaultName}
                description         = {description}
                cipherIV            = {cipherIV}
                createdTimestamp    = {createdTimestamp}
                qrtype              = {'downloadable'}
                keyAliasArray       = {keyAliasArray}
                maxLengthPerQRCode  = {maxLengthPerQRCode}
                vaultColors={vaultColors}
            />
            </div>
        );
        const exporter = new Html2PDF(printElement, {filename:"Kosign - Vault - "+vaultName+".pdf"}).set({
            pagebreak: { before:'.pagebreak', mode: ['avoid-all', 'css', 'legacy'] },
            margin: [10, 10, 10, 10], // Reduce margins for better fit
            format: 'A4',
            orientation: 'portrait'
        });
        await exporter.getPdf(true);
    };

    const downloadKey = async (share, i) => {
        const printElement = ReactDOMServer.renderToString(
            <div style={{padding:0}}>
                <PDFKeyBackup
                    vaultIdent={vaultIdent}
                    threshold={consensus}
                    vaultName={vaultName}
                    description={description}
                    createdTimestamp={createdTimestamp}
                    myDecryptedKey={share}
                    qrtype={'downloadable'}
                    keyAlias={keyAliasArray[i]}
                    vaultColors={vaultColors}
                />
            </div>
        );

        const exporter = new Html2PDF(printElement, {filename:"Kosign-key-"+keyAliasArray[i]+".pdf"}).set({
            pagebreak: { before:'.pagebreak', mode: ['avoid-all', 'css', 'legacy'] }
        });
        await exporter.getPdf(true);
    };



    if (props.isLoading) {
        return (
            <div className={'centerLoading createPageWrapper'} style={{background: '#0a0a0a', minHeight: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <Oval stroke="#1786ff" strokeWidth={10} strokeOpacity={1} speed={1} style={{width:25}} />
            </div>
        )
    }

    return (

        <div>
            <div className="createPageWrapper">
                
                <div>

                    <div style={{flex:1}}>
                    {wizardStep === 1 && (
                        <div className="wizard-step-container">
                            <div className="create-vault-header">
                                <h1>Create a new vault</h1>
                                <p>Secure your digital life</p>
                            </div>
                            <Form>
                                <div className={'createSectionWrapper'}>
                                    <FormGroup className={'formGroup'} controlId="formBasicName">
                                        <input 
                                            name="vaultName" 
                                            type="text" 
                                            placeholder={'Vault Name'}
                                            onChange={(e) => setVaultNameValue(e.target.value)}
                                            value={vaultName}
                                            className={'form-control formControls'}
                                        />
                                        <FormText className="text-muted">
                                            <div style={{marginTop:5}}>
                                                A friendly name that will be visible on your vault and keys
                                            </div>
                                            {((vaultName.length)>=(maxVaultNameChars*0.25)) && (
                                                <div style={{marginTop:8, fontSize: '0.85rem', opacity: 0.8}}>
                                                    {maxVaultNameChars - vaultName.length} characters remaining
                                                </div>
                                            )}
                                        </FormText>
                                    </FormGroup>

                                    <CreateMintKeys 
                                        setShareholders={(val) => setTotalShareholders(val)}
                                        setConsensus={(val) => setConsensus(val)}
                                    />

                                    <FormGroup className='formGroupCheckbox' style={{marginTop: 20}}>
                                        <Form.Check
                                            inline
                                            label={<span>Agree to the <Link to={'/legal'} target={'_blank'} className={'linkage'}>Terms of service</Link></span>}
                                            name="group1"
                                            type={'checkbox'}
                                            id={`inline--1`}
                                            checked={agreeToTerms}
                                            onChange={(e)=>setAgreeToTerms(e.target.checked)}
                                        />
                                    </FormGroup>

                                    <FormGroup className={'formGroup'} style={{marginTop: 20}}>
                                        <div className="wizard-footer">
                                            <Button 
                                                variant={'primary'} 
                                                size={'lg'}
                                                onClick={() => continueWizard()}
                                            >
                                                Continue
                                            </Button>
                                            
                                            
                                        </div>
                                    </FormGroup>
                                </div>
                            </Form>
                        </div>
                    )}

                </div>

                {wizardStep === 2 && (
                    <SecurityPreparationStep
                        isOnline={isOnline}
                        onContinue={continueFromSecurity}
                        onBack={() => setWizardStep(1)}
                    />
                )}

                <div>
                {wizardStep === 3 ?
                    <SecretDataEntry
                        secretValue={secretValue}
                        setSecret={setSecret}
                        maxSecretChars={maxSecretChars}
                        totalPages={totalPages}
                        isOnline={isOnline}
                        onContinue={continueFromSecretData}
                    />
                    : null}
                </div>

                {wizardStep === 4 ?
                    <div className="wizard-step-container">
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
                                <pre className="preview-content">{compressedSecretValue}</pre>
                                {/* <div className="mt-2 text-muted small">
                                    <strong>Space saved:</strong> {secretValue.length - compressedSecretValue.length} characters removed from empty fields
                                </div> */}
                            </Card.Body>
                        </Card>

                        <div className="continue-section mt-4">
                            <div className="d-flex gap-2">
                                <Button 
                                    variant={'outline-secondary'} 
                                    size={'lg'}
                                    onClick={() => setWizardStep(3)}
                                >
                                    ← Back to Edit
                                </Button>
                                <Button 
                                    variant={'primary'} 
                                    size={'lg'}
                                    onClick={continueFromPreview}
                                    className="flex-fill"
                                >
                                    Encrypt & Continue
                                </Button>
                            </div>
                        </div>
                    </div>
                    : null}

                {wizardStep === 5 ?
                    <div className={'loadingStepWrapper'}>
                        <CreateLoading loadingComplete={()=>setWizardStep(6)} />
                    </div>
                    : null
                }

                {wizardStep === 6 ?
                    <VaultDownloadSection
                        hasPressedVaultPrint={hasPressedVaultPrint}
                        hasPressedKeyPrint={hasPressedKeyPrint}
                        doPrintVault={doPrintVault}
                        doPrintKeys={doPrintKeys}
                        downloadVault={downloadVault}
                        downloadKey={downloadKey}
                        refBackupVaultPDF={refBackupVaultPDF}
                        refBackupKeyPDF={refBackupKeyPDF}
                        vaultIdent={vaultIdent}
                        cipherText={cipherText}
                        shares={shares}
                        consensus={consensus}
                        vaultName={vaultName}
                        description={description}
                        cipherIV={cipherIV}
                        createdTimestamp={createdTimestamp}
                        keyAliasArray={keyAliasArray}
                        maxLengthPerQRCode={maxLengthPerQRCode}
                        vaultColors={vaultColors}
                    />
                    : null}
                </div>


            </div>
        </div>
    );
}

export default CreateVault;


