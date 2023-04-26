import React, { useEffect, useRef, useState} from 'react'
import { Link , useParams, useNavigate} from 'react-router-dom'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Layout from "../components/Layout";
import {Container, Form, FormGroup, FormText, FormLabel, Button} from 'react-bootstrap';
import {EncryptionService} from "../services/EncryptionService";
import Navbar from "../components/NavbarTop";

import '../style/index.css';
import '../style/createPage.css';
import '../style/forms.css';
import ShareKeyshare from "../components/ShareKeyshare";

import Lottie from 'lottie-react-web'
import LottieAnimationVault from '../animations/31217-vault'
import CreateMintKeys from "../components/CreateMintKeys";
import CreateLoading from "../components/CreateLoading";
import PDFVaultBackup from '../components/PDFVaultBackup';
import * as htmlToImage from "html-to-image";



function CreatePage(props) {

    const [secretValue, setSecretValue]             = useState('');
    const [cipherText, setCiphertext]               = useState(null);
    const [cipherKey, setCipherKey]                 = useState(null);
    const [cipherIV, setCipherIV]                   = useState(null);
    const [cipherOpenSSL, setCipherOpenSSL]         = useState(null);
    const [consensus, setConsensus]                 = useState(2);
    const [vaultIdent, setVaultIdent]               = useState(null);
    const [wizardStep, setWizardStep]               = useState(1);
    const [shares, setShares]                       = useState(false);
    const [vaultName, setVaultName]                 = useState('');
    const [totalShareholders, setTotalShareholders] = useState(2);
    const [maxSecretChars, setMaxChars]                     = useState(1470);
    const [description, setDescription]                     = useState();

    const [pageTitle, setPageTitle]                   = useState('Create a vault');
    const [createdTimestamp, setCreatedTimestamp]      = useState();
    const refBackupVaultPDF = useRef(null);

    const [showPDFBackupVault, setShowPDFBackupVault] = useState();

    const setSecret = (newSecretValue) => {
        if (newSecretValue.length > secretValue.length) {
            if ((secretValue.length >= maxSecretChars) || (newSecretValue.length-1>=maxSecretChars)) {
                return;
            }
        }
        setSecretValue(newSecretValue);
    };

    const createVault = () => {
        setWizardStep(3);
        setTimeout(() => {
           // console.log('secret value is ', secretValue);
            EncryptionService.encrypt(secretValue, false).then((encryptionResult)=>{
                setCiphertext(encryptionResult.cipherText);
                setCipherKey(encryptionResult.cipherKey);
                setCipherIV(encryptionResult.cipherIV);
                setCipherOpenSSL(encryptionResult.cipherOpenSSL);
                setVaultIdent('kosign-coldstorage');
                setCreatedTimestamp(Math.floor(Date.now() / 1000));
                EncryptionService.splitKey(encryptionResult.cipherKey, parseInt(totalShareholders), parseInt(consensus)).then((xshares) => {
                    setShares(xshares);
                    setWizardStep(4);
                    setPageTitle('Download your vault backup');
                });
            });
        }, 500);
    };


    const continueWizard = () => {
       // console.log('continuing with secret', secretValue);
        if (!secretValue) {
            alert('Enter a secret to store in the vault');
            return;
        }
        if (!vaultName) {
            alert('Enter a vault name');
            return;
        }

        if (wizardStep+1===5) {
            setPageTitle('Key Ceremony');
        }
        setWizardStep(wizardStep+1);
    };


    useEffect(()=>{
        //hide key every time tab is changed;
        htmlToImage.toJpeg(refBackupVaultPDF.current, { quality: 0.95, cacheBust:true, skipAutoScale:true })
            .then(function (dataUrl) {
                let link = document.createElement('a');
                link.download = 'kosign-vault-'+vaultName+'.jpeg';
                link.href = dataUrl;
                link.click();
                setShowPDFBackupVault(false);
                continueWizard();
            });
    }, [showPDFBackupVault]);


    return (
        <Layout>
            <Navbar loggedIn/>
            <div className={'pageWrapper'}>

                <Container>
                    <div className={'pageNavWrapper'}>
                        <div>
                            <h2 className={'pageTitle'}>{pageTitle}</h2>
                        </div>
                        <div className={'backButtonWrapper'}>
                        </div>
                    </div>

                    <div className={'pageWrapperInner'}>

                        {wizardStep === 1 ?
                            <div>
                                <div>
                                    <Row style={{ height:'100%'}}>
                                        <Col xs={{span:12}} md={{span:5, offset:0}} lg={{span:5, offset:0}}>
                                            <div className={'animationWrapper'}>
                                                <Lottie
                                                    options={{
                                                        animationData: LottieAnimationVault,
                                                        loop: false
                                                    }}
                                                    width={350}
                                                    height={350}
                                                />
                                            </div>
                                        </Col>
                                        <Col xs={{span:12}} md={{span:7, offset:0}} lg={{span:7, offset:0}}>
                                            <Form>
                                                <div className={'createSectionWrapper'}>
                                                    <FormGroup className={'formGroup'} controlId="formBasicName">
                                                        <FormLabel className={'formLabel'}>Vault Name</FormLabel>
                                                        <input name="vaultName" type="text" placeholder={'Vault Name'} onChange={(e)=>setVaultName(e.target.value)} className={'form-control formControls'}/>
                                                        <FormText className="text-muted">
                                                            The vault name will be visible on paper backups and will help you and your key guardians identify the vault.
                                                        </FormText>
                                                    </FormGroup>

                                                    <FormGroup className={'formGroup'} controlId="formBasicName">
                                                        <FormLabel className={'formLabel'}>Description</FormLabel>
                                                        <textarea
                                                            value={description}
                                                            onChange={(e) => setDescription(e.target.value)}
                                                            className={'form-control'}
                                                            placeholder={'Vault description'}
                                                            rows={2}
                                                        />
                                                        <FormText className="text-muted">
                                                            Descriptive text that will be visible on paper backups of your vault and keys.
                                                            Consider using this space for any special instructions that you want to have on the paper.
                                                        </FormText>
                                                    </FormGroup>

                                                    <FormGroup className={'formGroup'} controlId="formBasicEmail">
                                                        <FormLabel className={'formLabel'}>Secret data</FormLabel>
                                                        <textarea
                                                            value={secretValue}
                                                            onChange={(e) => setSecret(e.target.value)}
                                                            className={'form-control'}
                                                            placeholder={'Your secret text'}
                                                            rows={4}
                                                        />
                                                        <FormText className="text-muted">
                                                            {maxSecretChars-secretValue.length} characters remaining &nbsp;
                                                            <div>
                                                                Vaults are limited in characters in order to fit on a single paper.
                                                            </div>
                                                        </FormText>
                                                    </FormGroup>
                                                    <FormGroup className={'formGroup'} style={{marginTop:50}}>
                                                        <div>
                                                            <Button variant = {'primary'} size= {'lg'} onClick = {()=>continueWizard()}>
                                                                Continue
                                                            </Button>
                                                        </div>
                                                    </FormGroup>
                                                </div>
                                            </Form>
                                        </Col>

                                    </Row>
                                </div>
                            </div>
                        : null}


                        {wizardStep === 2 ?
                            <div>
                                <CreateMintKeys setShareholders         = {(val) => setTotalShareholders(val)}
                                                setConsensus            = {(val) => setConsensus(val) }
                                                createVault             = {() => createVault()}
                                />
                            </div>
                        : null}

                        {wizardStep === 3 ?
                            <CreateLoading/>
                        :null }

                        {wizardStep === 4 ?
                            <div>
                                <Row style={{ height:'100%', alignItems:'center'}}>
                                    <Col xs={{span:12}} md={{span:12, offset:0}} lg={{span:12, offset:0}}>
                                        <div>
                                            <div >
                                                <div className={'alert'}>
                                                   Download and print your encrypted vault backup. Your vault can only be opened using {consensus} out of {shares.length} keys.

                                                    <div style={{marginTop:20}}>
                                                        <Button
                                                            className={'btn-primary'}
                                                            size={'lg'}
                                                            onClick={() => setShowPDFBackupVault(true)}
                                                        >
                                                            Download Vault
                                                        </Button>
                                                    </div>
                                                </div>
                                                {showPDFBackupVault?
                                                    <div ref={refBackupVaultPDF}>
                                                        <PDFVaultBackup
                                                            vaultIdent={vaultIdent}
                                                            description={description}
                                                            shares={shares}
                                                            threshold={consensus}
                                                            vaultName={vaultName}
                                                            cipherIV={cipherIV}
                                                            createdTimestamp={createdTimestamp}
                                                            cipherText={cipherText}
                                                        />
                                                    </div>
                                                :null}

                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                            :null }

                        {wizardStep === 5 ?
                            <div>
                                <Row style={{ height:'100%', alignItems:'center'}}>
                                    <Col xs={{span:12}} md={{span:12, offset:0}} lg={{span:12, offset:0}}>
                                        <ShareKeyshare
                                            vaultIdent={vaultIdent}
                                            description={description}
                                            shares={shares}
                                            threshold={consensus}
                                            vaultName={vaultName}
                                            cipherIV={cipherIV}
                                            createdTimestamp={createdTimestamp}
                                            cipherText={cipherText}
                                        />
                                    </Col>
                                </Row>
                            </div>
                        :null }

                    </div>
                </Container>
            </div>
        </Layout>
    )

}


export default CreatePage;


