import React, { useEffect, useRef, useState} from 'react'
import { Link , useNavigate} from 'react-router-dom'
import {Form, FormGroup, FormText, Button} from 'react-bootstrap';
import {EncryptionService} from "../services/EncryptionService";
import Navbar from "../components/NavbarTop";
import ReactDOMServer from 'react-dom/server';

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
import { ProFeatureService } from '../services/ProFeatureService';
import KosignPaymentStep from './KosignPaymentStep';
import SecurityPreparationStep from './SecurityPreparationStep';

function CreateVault(props) {

    const cookies   = new Cookies();
    const navigate  = useNavigate();

    const [secretValue, setSecretValue] = useState('');
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
        const limits = ProFeatureService.getCurrentLimits();
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
    const [isPaymentComplete, setIsPaymentComplete] = useState(false);
    const [totalCost, setTotalCost] = useState(0);
    const [isOnline, setIsOnline]   = useState(navigator.onLine);
    const [totalPages, setTotalPages] = useState();

    const maxLengthPerQRCode = 400;
    const qrPerPage     = 4;
    const firstPageQR   = 2;
    const qrPerRow      = 4;

    const [vaultColors, setVaultColors] = useState([]);

    // Add new state for pro upgrade flow
    const [showProUpgrade, setShowProUpgrade] = useState(false);
    const [licenseKey, setLicenseKey] = useState('');
    const [isValidatingLicense, setIsValidatingLicense] = useState(false);
    const [licenseError, setLicenseError] = useState('');

    // Add state for license validation
    const [isValidatingProStatus, setIsValidatingProStatus] = useState(false);

    // Add effect to update limits when pro status changes
    useEffect(() => {
        const currentLimits = ProFeatureService.getCurrentLimits();
        setMaxChars(currentLimits.maxStorage);
    }, [showProUpgrade]);

    const calculateHowManyPages = (value) => {
        // This should match the exact logic in PDFVaultBackup.jsx
        // The PDF encrypts the value first, which adds overhead
        // Let's estimate the encrypted size (typically 1.3-1.5x larger due to base64 encoding + metadata)
        const estimatedCipherTextLength = Math.ceil(value.length * 1.4);
        
        // Match the exact PDF logic: totalQRCodes = 1; for each chunk: totalQRCodes++
        let totalQRCodes = 1; // Start with metadata QR
        for (let i = 0; i < estimatedCipherTextLength; i += maxLengthPerQRCode) {
            totalQRCodes++;
        }
        
        return totalQRCodes; // Each QR code gets its own page
    };

    const setSecret = (newSecretValue) => {
        if (newSecretValue.length > secretValue.length) {
            if ((secretValue.length >= maxSecretChars) || (newSecretValue.length - 1 >= maxSecretChars)) {
                return;
            }
        }
        setTotalPages(calculateHowManyPages(newSecretValue));
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
        if (wizardStep===4) {
            setTimeout(() => {
                // Generate colors once when entering step 4
                setVaultColors(generateColors());
                             
                EncryptionService.encrypt(secretValue, false).then((encryptionResult) => {
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
    }, [wizardStep]);

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

    // Auto-scroll to top when pro upgrade step shows
    useEffect(() => {
        if (showProUpgrade && window.scrollY > 100) {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    }, [showProUpgrade]);

    useEffect(()=>{
        let tmpTotalCost = (totalShareholders * global.costPerKey) + (global.setupCost) - (global.freeKeys*global.costPerKey);
        if (tmpTotalCost<0) {
            tmpTotalCost = 0;
        }
       setTotalCost(tmpTotalCost);
    }, [totalShareholders]);

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

    // Check if user is creating a pro vault (regardless of their current status)
    const isCreatingProVault = () => {
        return totalShareholders > ProFeatureService.FREE_LIMITS.maxShares;
    };

    // Check if user exceeds free limits AND needs to upgrade
    const exceedsFreeLimit = () => {
        return totalShareholders > ProFeatureService.FREE_LIMITS.maxShares && !ProFeatureService.isProUserCached();
    };

    // Add validation when component mounts or when checking pro status
    useEffect(() => {
        const validateProStatus = async () => {
            if (ProFeatureService.isProUserCached()) {
                setIsValidatingProStatus(true);
                const isValid = await ProFeatureService.isProUser();
                if (!isValid) {
                    // License was invalid, force re-render to show upgrade prompt
                    setShowProUpgrade(totalShareholders > ProFeatureService.FREE_LIMITS.maxShares);
                }
                setIsValidatingProStatus(false);
            }
        };

        validateProStatus();
    }, [totalShareholders]);

    const continueWizard = async (forcepage) => {
        if (!agreeToTerms) {
            alert('You must agree to the terms to use this service');
            return;
        }

        if (!vaultName) {
            alert('Enter a vault name');
            return;
        }

        // Validate pro status if user appears to be pro
        if (ProFeatureService.isProUserCached() && totalShareholders > ProFeatureService.FREE_LIMITS.maxShares) {
            setIsValidatingProStatus(true);
            const isValidPro = await ProFeatureService.isProUser();
            setIsValidatingProStatus(false);
            
            if (!isValidPro) {
                // License is invalid, show upgrade prompt
                setShowProUpgrade(true);
                return;
            }
        } else if (exceedsFreeLimit()) {
            setShowProUpgrade(true);
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

    // Add new function for continuing from secret data entry
    const continueFromSecretData = () => {
        setWizardStep(4); // Go directly to encryption step
    };

    const onPaymentComplete = () => {
        cookies.remove('kosign_sale_id');
        cookies.remove('kosign_product_id');
        setWizardStep(3);
        setIsPaymentComplete(true);
        setKeyAliasArray(EncryptionService.generateListOfCombinedWords(totalShareholders));
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
            pagebreak: { before:'.pagebreak', mode: ['avoid-all', 'css', 'legacy'] }
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

    const handleLicenseSubmit = async (e) => {
        e.preventDefault();
        
        if (!licenseKey.trim()) {
            setLicenseError('Please enter your license key');
            return;
        }

        setIsValidatingLicense(true);
        setLicenseError('');

        try {
            const result = await ProFeatureService.activateLicense(licenseKey.trim());
            
            if (result.success) {
                setShowProUpgrade(false);
                setLicenseKey('');
                // Continue with the wizard - go to security check first
                setKeyAliasArray(EncryptionService.generateListOfCombinedWords(totalShareholders));
                setWizardStep(2); // Go to security check, not directly to step 3
            } else {
                setLicenseError(result.error);
            }
        } catch (err) {
            setLicenseError('Failed to validate license key');
        } finally {
            setIsValidatingLicense(false);
        }
    };

    const handleUpgradeClick = () => {
        // Navigate to payment with current vault config
        navigate('/payment', { 
            state: { 
                returnTo: '/create',
                vaultConfig: {
                    name: vaultName,
                    shares: totalShareholders,
                    consensus: consensus
                }
            }
        });
    };

    const handleDowngradeToFree = () => {
        const limits = ProFeatureService.getCurrentLimits();
        setTotalShareholders(limits.maxShares);
        setConsensus(Math.min(consensus, limits.maxShares));
        setShowProUpgrade(false);
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
                    {wizardStep === 1 && !showProUpgrade && (
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
                                                style={{
                                                    background: isCreatingProVault() 
                                                        ? 'linear-gradient(90deg, #1786ff 0%, #1260B3 100%)' // Bright blue
                                                        : 'linear-gradient(90deg, #6c757d 0%, #495057 100%)', // Muted gray
                                                    borderColor: isCreatingProVault() ? '#1786ff' : '#6c757d',
                                                    border: 'none'
                                                }}
                                            >
                                                Continue ({isCreatingProVault() ? 'Pro' : 'Free'})
                                            </Button>
                                            
                                            {totalCost > 0 && (
                                                <div className={'costSummary'}>
                                                    <div className={'formTotalCost'}>
                                                        ${totalCost} Total
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </FormGroup>
                                </div>
                            </Form>
                        </div>
                    )}

                    {/* Replace the entire Pro Upgrade Step with this */}
                    {showProUpgrade && (        
                        <KosignPaymentStep 
                            totalShareholders={totalShareholders}
                            onPaymentSuccess={(licenseKey) => {
                                // License key is already stored in localStorage by the component
                                setShowProUpgrade(false);
                                // Update limits immediately after payment
                                const currentLimits = ProFeatureService.getCurrentLimits();
                                setMaxChars(currentLimits.maxStorage);
                                // Continue with vault creation
                                setKeyAliasArray(EncryptionService.generateListOfCombinedWords(totalShareholders));
                                setWizardStep(2); // Go to security preparation first
                            }}
                            onLicenseActivated={() => {
                                // New callback for manual license activation
                                setShowProUpgrade(false);
                                // Update limits immediately after license activation
                                const currentLimits = ProFeatureService.getCurrentLimits();
                                setMaxChars(currentLimits.maxStorage);
                                setKeyAliasArray(EncryptionService.generateListOfCombinedWords(totalShareholders));
                                setWizardStep(2); // Go to security preparation
                            }}
                            onBack={() => {
                                setShowProUpgrade(false);
                            }}
                        />
                    )}
                </div>

                {wizardStep === 2 && !showProUpgrade && (
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
                    <div className={'loadingStepWrapper'}>
                        <CreateLoading loadingComplete={()=>setWizardStep(5)} />
                    </div>
                    : null
                }

                {wizardStep === 5 ?
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


