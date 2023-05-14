import React, { useEffect, useRef, useState, createRef} from 'react'
import { Link , useParams, useNavigate} from 'react-router-dom'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Layout from "../components/Layout";
import {Container, Form, FormGroup, FormText, FormLabel, Button, FormCheck} from 'react-bootstrap';
import {EncryptionService} from "../services/EncryptionService";
import Navbar from "../components/NavbarTop";
import ReactDOMServer from 'react-dom/server';
import { TbCircleNumber1, TbCircleNumber2, TbCircleNumber3, TbCircleNumber4 } from 'react-icons/tb';
import '../style/index.css';
import '../style/createPage.css';
import '../style/forms.css';
//import ShareKeyshare from "../components/ShareKeyshare";

import Lottie from 'lottie-react-web'
import LottieAnimationVault from '../animations/31217-vault'
import CreateMintKeys from "../components/CreateMintKeys";
import CreateLoading from "../components/CreateLoading";
import PDFVaultBackup from '../components/PDFVaultBackup';
import * as htmlToImage from "html-to-image";
import ProgressBar from 'react-bootstrap/ProgressBar'

import {FaChevronRight, FaLock, FaLockOpen, FaInfoCircle, FaCheck} from 'react-icons/fa';
import {MdWarningAmber} from 'react-icons/md';
import PaymentCheckoutForm from "./PaymentCheckoutForm";
import PaymentComponent from "./PaymentComponent";
import LottieAnimationLoading from "../animations/93270-password-lock-animation";
import LottieAnimationReady from "../animations/97240-success";
import {PDFDownloadLink, PDFViewer} from "@react-pdf/renderer";
import PDFKeyBackup from "../components/PDFKeyBackup";
import {useReactToPrint} from 'react-to-print';
import Html2PDF from 'html2pdf.js';

function CreateVault(props) {

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
    const [totalShareholders, setTotalShareholders] = useState(2);
    //const [maxSecretChars, setMaxChars] = useState(1470);
    const [maxSecretChars, setMaxChars] = useState(global.maxCharsPerVault);
    const [maxDescriptionChars, setMaxDescriptionChars] = useState(135);
    const [maxVaultNameChars, setMaxVaultNameChars] = useState(60);
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

    const maxLengthPerQRCode = 1000;
    const qrPerPage     = 4;
    const firstPageQR   = 2;
    const qrPerRow      = 2;


    const calculateHowManyPages = (value) => {
        const totalQRs = Math.ceil(value.length / 1000)*qrPerRow;
        const remainingQRs = totalQRs - firstPageQR;

        const totalPages = 1 + Math.ceil(remainingQRs / qrPerPage);

        return totalPages;
    }

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
    };

    const setVaultNameValue = (newVaultName) => {
        if (newVaultName.length > vaultName.length) {
            if ((vaultName.length >= maxVaultNameChars) || (newVaultName.length - 1 >= maxVaultNameChars)) {
                return;
            }
        }
        setVaultName(newVaultName);
    };

    useEffect(()=>{
        if (wizardStep===4) {
            setTimeout(() => {
                //console.log('secret value is ', secretValue);
                EncryptionService.encrypt(secretValue, false).then((encryptionResult) => {
                    //console.log('done encyprint', encryptionResult);
                    setCiphertext(encryptionResult.cipherText);
                    setCipherKey(encryptionResult.cipherKey);
                    setCipherIV(encryptionResult.cipherIV);
                    setCipherOpenSSL(encryptionResult.cipherOpenSSL);
                    setVaultIdent('kosign-coldstorage');
                    setCreatedTimestamp(Math.floor(Date.now() / 1000));
                    //console.log('splitting key....');
                    if (parseInt(totalShareholders)>1) {
                        EncryptionService.splitKey(encryptionResult.cipherKey, parseInt(totalShareholders), parseInt(consensus)).then((xshares) => {
                           // console.log('split OK....', xshares);
                            setShares(xshares);
                            //console.log('wizard step is ', wizardStep+1);
                            // setWizardStep(5);
                        });
                    } else {
                        setShares([encryptionResult.cipherKey]);
                    }

                });
            }, 1000);
        }
    }, [wizardStep]);

    useEffect(()=>{

       setTotalCost((totalShareholders*global.costPerKey) + (global.setupCost));
    }, [totalShareholders]);

    useEffect (()=>{
     //   console.log('NAVIGATOR IS ', navigator.onLine);
    }, [navigator.onLine]);


    useEffect(() => {
        const handleOnline = () => setIsOnline(navigator.onLine);
        const handleOffline = () => setIsOnline(navigator.onLine);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    const continueWizard = (forcepage) => {
        // console.log('continuing with secret', secretValue);
        if (!agreeToTerms) {
            alert ('You must agree to the terms to use this service');
            return;
        }
        //forcepage is just for tetsing pursposes
        if (forcepage) {
            setWizardStep(forcepage);
            return;
        }

        if (!vaultName) {
            alert('Enter a vault name');
            return;
        }

        if (wizardStep>2 && !isPaymentComplete){
            return;
        }
        /*if (wizardStep + 1 === 5) {
            setPageTitle('Key Ceremony');
        }*/
        setWizardStep(wizardStep + 1);
    };
    /*useEffect(() => {
        //hide key every time tab is changed;
        if (!showPDFBackupVault) return;
        htmlToImage.toJpeg(refBackupVaultPDF.current, {quality: 0.95, cacheBust: true, skipAutoScale: true})
            .then(function (dataUrl) {
                let link = document.createElement('a');
                link.download = 'kosign-vault-' + vaultName + '.jpeg';
                link.href = dataUrl;
                link.click();
                setShowPDFBackupVault(false);
                continueWizard();
            });
    }, [showPDFBackupVault]);   */


    const renderProgressBarClass = (stepType) => {
        if ((wizardStep===1) && (stepType==='setup')) {
            return 'progressBarActive';
        }
        if ((wizardStep===2) && (stepType==='keys')) {
            return 'progressBarActive';
        }
        if ((wizardStep===3) && (stepType==='payment')) {
            return 'progressBarActive';
        }
        if ((wizardStep===4) && (stepType==='download')) {
            return 'progressBarActive';
        }

        if ((wizardStep>=2) && (stepType==='setup')) {
            return 'progressBarSuccess';
        }
        if ((wizardStep>=3) && (stepType==='keys')) {
            return 'progressBarSuccess';
        }
        if ((wizardStep>=4) && (stepType==='payment')) {
            return 'progressBarSuccess';
        }
        if ((wizardStep>=5) && (stepType==='download')) {
            return 'progressBarSuccess';
        }
        return 'progressBarDefault';
    };

    const onPaymentComplete = () => {
        setWizardStep(3);
        setIsPaymentComplete(true);
        console.log('total shareholders are ', totalShareholders);
        setKeyAliasArray(EncryptionService.generateListOfCombinedWords(totalShareholders));
    };

    const handlePrint = useReactToPrint({
        onPrintError: (error) => console.log(error),
        content: () => refBackupVaultPDF.current,
        removeAfterPrint: true,
        /*print: async (printIframe) => {
            console.log('PRINT...');
            const document = printIframe.contentDocument;
            if (document) {
                const html = document.getElementById("idvaultbackup");
                console.log(html);
                const exporter = new Html2PDF(html,{filename:"Nota Simple.pdf"});
                await exporter.getPdf(true);
            }
        },*/
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
            />
        );
        const exporter = new Html2PDF(printElement, {filename:"Kosign - Vault.pdf"}).set({
            pagebreak: { before:'.pagebreak', mode: ['avoid-all', 'css', 'legacy'] }
        });
        await exporter.getPdf(true);
    };

    const downloadKey = async (share, i) => {
        const printElement = ReactDOMServer.renderToString(
            <PDFKeyBackup
                vaultIdent={vaultIdent}
                threshold={consensus}
                vaultName={vaultName}
                description={description}
                createdTimestamp={createdTimestamp}
                myDecryptedKey={share}
                qrtype={'downloadable'}
                keyAlias={keyAliasArray[i]}
            />
        );

        const exporter = new Html2PDF(printElement, {filename:"Kosign - Key.pdf"}).set({
            pagebreak: { before:'.pagebreak', mode: ['avoid-all', 'css', 'legacy'] }
        });
        await exporter.getPdf(true);
    };

    return (

        <div style={{marginBottom:100}}>
            <div>
                {wizardStep !== 5 ?
                    <div className={'progressBarWrapper'}>
                        <ProgressBar style={{height: 70}}>
                            <ProgressBar striped={wizardStep === 1 ? true : false}
                                         animated={wizardStep === 1 ? true : false}
                                         className={renderProgressBarClass('setup')} now={30} key={1} label={
                                <div>
                                    <TbCircleNumber1
                                        className={'progressIcon'}/> Setup {/*<FaChevronRight className={'progressIcon'} />*/}
                                </div>
                            }/>
                            <ProgressBar striped={wizardStep === 2 ? true : false}
                                         animated={wizardStep === 2 ? true : false}
                                         className={renderProgressBarClass('keys')} now={30} key={2} label={
                                <div>
                                    <TbCircleNumber2 className={'progressIcon'}/> Payment
                                </div>
                            }/>
                            <ProgressBar striped={wizardStep === 3 ? true : false}
                                         animated={wizardStep === 3 ? true : false}
                                         className={renderProgressBarClass('payment')} now={30} key={3} label={
                                <div>
                                    <TbCircleNumber3 className={'progressIcon'}/> Add Data
                                </div>
                            }/>
                            <ProgressBar striped={wizardStep === 4 ? true : false}
                                         animated={wizardStep === 4 ? true : false}
                                         className={renderProgressBarClass('download')} now={40} key={4} label={
                                <div>
                                    <TbCircleNumber4 className={'progressIcon'}/> Download Vault
                                </div>
                            }/>
                        </ProgressBar>
                    </div>
                    :null
                }
                <div className={'createPageWrapper'}>

                    <div>
                    {wizardStep === 1 ?
                        <div>
                            <div>
                                <Row style={{height: '100%'}}>

                                    <Col xs={{span: 12}} md={{span: 12, offset: 0}} lg={{span: 12, offset: 0}}>
                                        <Form>
                                            <div className={'createSectionWrapper'}>
                                                <FormGroup className={'formGroup'} controlId="formBasicName">
                                                    {/*<FormLabel className={'formLabel'}>Vault Name</FormLabel>*/}
                                                    <input name="vaultName" type="text" placeholder={'Vault Name'}
                                                           onChange={(e) => setVaultNameValue(e.target.value)}
                                                           value={vaultName}
                                                           className={'form-control formControls'}/>
                                                    <FormText className="text-muted space-between-row">
                                                        <div style={{marginTop:5}}>
                                                            {/*<FaLockOpen style={{color:'#777', marginRight:4, fontSize:12}} />*/}
                                                            A friendly name that will be visible on your vault and keys
                                                        </div>
                                                        {((vaultName.length)>=(maxVaultNameChars*0.25))?
                                                        <div style={{marginTop:5}}>
                                                            {maxVaultNameChars - vaultName.length} characters remaining &nbsp;
                                                        </div>
                                                        : null}
                                                    </FormText>
                                                </FormGroup>

                                                <FormGroup className={'formGroup'} controlId="formBasicDescription">
                                                    {/*<FormLabel className={'formLabel'}>Description</FormLabel>*/}
                                                    <textarea
                                                        value={description}
                                                        onChange={(e) => setDescriptionValue(e.target.value)}
                                                        className={'form-control'}
                                                        placeholder={'This vault contains...'}
                                                        rows={2}
                                                    />
                                                    <FormText className="text-muted space-between-row">
                                                        <div style={{marginTop:5, paddingRight:10}}>
                                                            {/*<FaLockOpen style={{color:'#777', marginRight:4, fontSize:12}} />*/}
                                                            Description or instructions that will be visible on your vault
                                                        </div>
                                                        {((description.length)>=(maxDescriptionChars*0.25))?
                                                        <div style={{marginTop:5}} className={'noWrap'} >
                                                            {maxDescriptionChars - description.length} characters remaining &nbsp;
                                                        </div>
                                                        : null}
                                                    </FormText>
                                                </FormGroup>

                                                <CreateMintKeys setShareholders={(val) => setTotalShareholders(val)}
                                                                setConsensus={(val) => setConsensus(val)}
                                                />

                                                <FormGroup className='formGroupCheckbox' style={{marginTop: 20}}>
                                                    <div>
                                                        <div>
                                                            <Form.Check
                                                                inline
                                                                label={<span>Agree to the <Link to={'/legal'} target={'_blank'} className={'linkage'}>Terms of service</Link></span>}
                                                                name="group1"
                                                                type={'checkbox'}
                                                                id={`inline--1`}
                                                                checked={agreeToTerms}
                                                                onChange={(e)=>setAgreeToTerms(e.target.checked)}
                                                            />

                                                        </div>
                                                    </div>
                                                </FormGroup>

                                                <FormGroup className={'formGroup'} style={{marginTop: 20}}>
                                                    <div style={{display:'flex', flexDirection:'row',flex:1}}>
                                                        <div>
                                                            <Button variant={'primary'} size={'lg'}
                                                                    onClick={() => continueWizard() //TODO:Change to 3 to skip payment
                                                                    }>
                                                                Continue
                                                            </Button>
                                                        </div>
                                                        <div className={'costSummary'}>
                                                            <div className={'formTotalCost'}>${totalCost} Total</div>
                                                            <div className={'text-muted'}>${global.setupCost} per vault + ${totalShareholders*global.costPerKey} for {totalShareholders} keys</div>
                                                        </div>
                                                    </div>
                                                </FormGroup>
                                            </div>
                                        </Form>
                                    </Col>

                                </Row>
                            </div>
                        </div>
                        : null}
                    </div>

                {wizardStep === 2 ?
                    <div>
                        {/*<CreateLoading/>*/}
                        <PaymentComponent isOnline={isOnline} totalCost={totalCost} quantity={totalShareholders} onPaymentComplete={()=>onPaymentComplete()}/>
                    </div>
                    : null
                }

                <div>
                {wizardStep === 3 ?
                    <div>
                        {!isOnline ?
                            <div className={'alert alert-success'}>
                                <FaCheck style={{marginRight: 2, fontSize: 12}}/>
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
                                        <FaLock style={{color:'darkgreen', marginRight:2, fontSize:12}} />
                                        <b style={{color:'darkgreen'}}>Secure</b> vault contents to encrypt
                                    </div>

                                    {maxSecretChars - secretValue.length} characters remaining ({totalPages} pages)&nbsp;
                                    {/*<div>
                                        Vaults are limited in characters in order to fit on one page.
                                    </div>*/}
                                </FormText>
                            </FormGroup>
                            <FormGroup className={'formGroup'} style={{marginTop: 20}}>
                                <div>
                                    <Button variant={'primary'} size={'lg'}
                                            onClick={() => continueWizard(4)}>
                                        Continue
                                    </Button>
                                </div>
                            </FormGroup>
                        </form>
                    </div>
                    : null}
                </div>



                {wizardStep === 4 ?
                    <div className={'loadingStepWrapper'}>
                        <CreateLoading loadingComplete={()=>setWizardStep(5)} />
                    </div>
                    : null
                }

                {wizardStep === 5 ?
                    <div>
                        <Row>
                            <Col xs={{span: 12}} md={{span: 12, offset: 0}} lg={{span: 12, offset: 0}}>
                                <div className="alert alert-warning">
                                    <b>This page will only be visible once. </b>
                                    Do not browse away before you've printed both your vault and keys
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
                                            keyAliasArray = {keyAliasArray}
                                            maxLengthPerQRCode={maxLengthPerQRCode}
                                        />
                                    </div>
                                </div>

                            </Col>
                            <Col xs={{span: 12}} md={{span: 6, offset: 0}} lg={{span: 6, offset: 0}}>
                                <div className={'downloadSection'}>
                                    <h3><span className={'numberSpan'}>2.</span> Print keys</h3>
                                    <div>Distribute one key per person.</div>
                                    <div className={'securityTips'}>
                                        {/*<div>
                                            <FaLock style={{color:'#777', marginRight:4, fontSize:12}} /> Place keys in taper proof envelopes
                                        </div>*/}
                                        <div>
                                            <FaLock style={{color:'#777', marginRight:4, fontSize:12}} /> Distribute in-person where possible
                                        </div>
                                        {/*<div>
                                            <FaLock style={{color:'#777', marginRight:4, fontSize:12}} /> Don't download keys if you don't have to. If you do, make sure you delete all key files after distribution.
                                        </div>*/}
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
                                                /* ref={refBackupKeyPDF}*/
                                                /*ref={props.refProp.current[i]}*/
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
                                            />
                                        )}
                                    </div>
                                </div>

                                {/*<PDFDownloadLink
                                    className={'btn btn-primary'}
                                    document={
                                        <PDFVaultBackup
                                            vaultIdent={vaultIdent}
                                            cipherText={cipherText}
                                            shares={shares}
                                            threshold={consensus}
                                            vaultName={vaultName}
                                            description={description}
                                            cipherIV={cipherIV}
                                            createdTimestamp={createdTimestamp}
                                            />
                                    }
                                    fileName={"kosign-vault.pdf"}
                                >
                                    {({ blob, url, loading, error }) => (loading ? 'Loading  ...' : ('Download Vault'))}
                                </PDFDownloadLink>*/}

                                {/*<PDFViewer className={'pdfViewer'}>

                                </PDFViewer>*/}
                            </Col>
                        </Row>
                    </div>
                    : null}
                </div>


            </div>
        </div>
    );
}

export default CreateVault;


