import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Layout from "../components/Layout";
import {Container,  Button, Modal} from 'react-bootstrap';
import {EncryptionService} from "../services/EncryptionService";

import '../style/index.css';
import '../style/createPage.css';
import '../style/forms.css';

import Navbar from "../components/NavbarTop";
import { QrReader } from 'react-qr-reader';

import {AiOutlineQrcode} from 'react-icons/ai';
import {ImKey} from 'react-icons/im';
import {FaChevronRight, FaLock, FaLockOpen} from 'react-icons/fa';

import Lottie from 'lottie-react-web'
import LottieAnimation from '../animations/5427-scan-qr-code.json'
import LottieAnimationSuccess  from '../animations/97240-success'
import {Oval} from 'react-loading-icons';
import PDFVaultBackup from '../components/PDFVaultBackup';
import PDFKeyBackup from "../components/PDFKeyBackup";

function TestPage() {

    const navigate              = useNavigate();
    const [showScanner, setShowScanner] = useState(false);


    useEffect(()=>{
        let result = EncryptionService.generateListOfCombinedWords();
        //console.log('mnemonic is ', result);
    }, []);


    return (
        <Layout>
            <Navbar loggedIn/>
            <div className={'pageWrapper'}>
                <Container>
                    <Row>
                        <Col xs={{span: 12, offset: 0}} md={{span: 12, offset: 0}} lg={{span: 12, offset: 0}}>
                            <PDFVaultBackup
                                vaultIdent={'jopavault'}
                                cipherText={'kl;kljljkjljkljljljkhaskhf'}
                                shares={['slfkdjlasfjlasjlafjsdlfjsldjflasjfjsaf', 'aslkfjdslfjaslfja;lsfjaslfjs', 'asldfkjslfjasldj']}
                                threshold={2}
                                vaultName={'wowsuch vault whwhwh'}
                                description={'this si shteihsahifaslh aslhlsadhlashlashglashglahglashglahg lashgla glhasg lhas lghalsh'}
                                cipherIV={'lasfj3f3f3f3fdalsfalskfhlashflahds'}
                                createdTimestamp={'2024-23-23'}
                                qrtype={'printable'}
                                keyAliasArray = {[
                                    'josdf-asdkfjs', 'adsfkjlsj-lskdjlsfj', 'skfljsjhf-jdshsfkjh', 'skfljsjhf-jdshsfkjh', 'skfljsjhf-jdshsfkjh', 'skfljsjhf-jdshsfkjh', 'skfljsjhf-jdshsfkjh', 'skfljsjhf-jdshsfkjh', 'skfljsjhf-jdshsfkjh', 'skfljsjhf-jdshsfkjh',
                                    'josdf-asdkfjs', 'adsfkjlsj-lskdjlsfj', 'skfljsjhf-jdshsfkjh', 'skfljsjhf-jdshsfkjh', 'skfljsjhf-jdshsfkjh', 'skfljsjhf-jdshsfkjh', 'skfljsjhf-jdshsfkjh', 'skfljsjhf-jdshsfkjh', 'skfljsjhf-jdshsfkjh', 'skfljsjhf-jdshsfkjh'
                                ]}
                                maxLengthPerQRCode  = {1000}
                            />

                            {/*<div>
                                <PDFKeyBackup
                                    vaultIdent={'asdfasdfhaskfhasklfjhaskfh'}
                                    threshold={3}
                                    vaultName={'asdfljashfkajsfhlaksjfhlakshf'}
                                    description={'asdkfjhaslkfdjhaslfkjhaslkfhaslkfhjaslkfhaslkfhaslkjdfhkas'}
                                    createdTimestamp={'asdkfjhasfkjhasfldh'}
                                    myDecryptedKey={'asldkfjaskfhaslkjfhaslkdjfhlaskjfhlaksjghlaskgjlaksjg'}
                                    qrtype={'printable'}
                                />
                            </div>*/}
                        </Col>
                    </Row>
                </Container>
            </div>
        </Layout>
    )

}

export default TestPage;


