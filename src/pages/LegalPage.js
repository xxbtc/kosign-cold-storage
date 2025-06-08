import React, {Component, useEffect} from 'react'
import { Link , useNavigate} from 'react-router-dom'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Layout from "../components/Layout";

import '../style/index.css';
import '../style/homepage.css';
import {Button, NavItem} from 'reactstrap';
//import {FaTelegram, FaTwitter} from 'react-icons/fa';

import Container from 'react-bootstrap/Container';
import Navbar from '../components/NavbarTop';
import Footer from '../components/Footer';

//import {ContractService} from '../services/ContractService';
import Cookies from 'universal-cookie';

import {MdCancel} from 'react-icons/md';
import {FaCheckCircle} from 'react-icons/fa';
import {RiErrorWarningLine} from 'react-icons/ri';
import {FaChevronLeft} from 'react-icons/fa';



function LegalPage() {

    const navigate = useNavigate();
    //const cookies  = new Cookies();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);



    return (
        <Layout>
            <Navbar loggedIn={false}/>
            <div className={'pageWrapper'}>

                <Container>
                    <div className={'pageNavWrapper'}>
                        <div>
                            <h2 className={'pageTitle'}>Terms of Service</h2>
                        </div>
                        <div className={'backButtonWrapper'}>
                            <Link className='backButton' to={'/'}>
                                <FaChevronLeft className={'backButtonIcon'}/> Back
                            </Link>
                        </div>
                    </div>

                    <div className={'pageWrapperInner'}>
                        <h3>AGREEMENT</h3>
                        <p>
                            Last update: 08 June 2025
                            <br/><br/>
                            By accessing and using this Site, including any of its products or services, you agree to
                            be bound by these Terms of Use and you agree to be bound by the applicable law.
                            If you do not agree with all of these terms of use, then you must discontinue use immediately.
                        </p>

                        <h3>ABOUT KOSIGN SERVICE</h3>
                        <p>
                            Kosign provides a client-side encryption service for creating secure data vaults. All encryption 
                            and decryption happens in your browser - we never have access to your vault contents or decryption keys. 
                            Our open source unlock utility ensures your vaults remain accessible independently of our service.
                        </p>

                        <h3>CHANGES TO THESE TERMS</h3>
                        <p>
                            We reserve the right to modify these Terms at any time. For instance, we may need to
                            change these Terms if we come out with a new feature or for some other reason.
                            Whenever we make changes to these Terms, the changes are effective immediately
                            after we post such revised Terms (indicated by revising the date at the top of these
                            Terms) or upon your acceptance if we provide a mechanism for your immediate
                            acceptance of the revised Terms (such as a click-through confirmation or
                            acceptance button). It is your responsibility to check this website for
                            changes to these Terms.

                            If you continue to use the Service after the revised Terms go into effect,
                            then you have accepted the changes to these Terms.
                        </p>

                        <h3>PRIVACY POLICY</h3>
                        <p>For information about how we collect and use information about users of the Service,
                            including any of its products or services, please check out our privacy
                            policy available at <Link to={'/privacy'}>https://kosign.xyz/privacy</Link>
                        </p>

                        <h3>THIRD PARTY SERVICES</h3>
                        <p>
                            From time to time, we may provide you with links to third party websites or services
                            that we do not own or control. Your use of the Service may also include the use of 
                            third-party payment processors, analytics services, and the open source libraries we depend on.
                            Your use of such third party applications, websites, and services
                            is governed by that party's own terms of service or privacy policies. We encourage
                            you to read the terms and conditions and privacy policy of any third party application,
                            website or service that you visit or use.
                        </p>

                        <h3>YOUR RESPONSIBILITIES</h3>
                        <p>
                            When you create vaults using the Service, you are solely responsible for:
                            <ul>
                                <li>Safeguarding your vault backups and key shares</li>
                                <li>Ensuring you have secure offline storage for your printed vaults and keys</li>
                                <li>Distributing key shares to trusted individuals according to your chosen threshold</li>
                                <li>The security and confidentiality of your vault contents</li>
                                <li>Making backup copies of your vaults and keys</li>
                            </ul>
                            <strong>Important:</strong> Due to our zero-knowledge architecture, we cannot recover lost vaults 
                            or provide access if you lose your vault backups and key shares.
                        </p>

                        <h3>USER CONTENT & CONDUCT</h3>
                        <p>
                            You are responsible for any content you choose to encrypt and store in your vaults, 
                            including its legality, reliability, and appropriateness. You agree not to use the Service 
                            for any unlawful purposes or to store illegal content. Since we cannot access your vault 
                            contents, you acknowledge full responsibility for ensuring your content complies with applicable laws.
                        </p>

                        <h3>INTELLECTUAL PROPERTY</h3>
                        <p>
                            We put a lot of effort into creating the Service, including the logo and all designs, text, 
                            graphics, pictures, information and other content (excluding your content). This property is 
                            owned by us or our licensors and it is protected by U.S. and international copyright laws.
                            
                            Our open source unlock utility is provided under open source licenses - please refer to the 
                            specific license terms in our GitHub repository at 
                            <a href="https://github.com/xxbtc/kosign-unlock" target="_blank" rel="noopener noreferrer"> github.com/xxbtc/kosign-unlock</a>.

                            Your rights do not include: (i) publicly performing or publicly displaying the Service;
                            (ii) modifying or otherwise making any derivative uses of the Service or any portion
                            thereof (except for the open source components); (iii) using any data mining, robots or similar data gathering or extraction
                            methods; (iv) downloading (other than page caching) of any portion of the Service or
                            any information contained therein; (v) reverse engineering or accessing the Service
                            in order to build a competitive product.
                        </p>

                        <h3>LINKS AND THIRD PARTY CONTENT</h3>
                        <p>
                            You may create a hyperlink to the Service. But, you may not use, frame or utilize
                            framing techniques to enclose any of our Service without our express written consent.
                            We make no claim or representation regarding, and accept no responsibility
                            for third party websites accessible by hyperlink from the Service or websites linking
                            to the Service. When you leave the Service, you should be aware that these Terms
                            and our policies no longer govern.

                            Since vault contents are encrypted client-side, we don't review, verify or
                            authenticate any content you store. We make no
                            representations, warranties, or guarantees relating to the quality, suitability,
                            truth, accuracy or completeness of any content you choose to encrypt. You acknowledge
                            sole responsibility for and assume all risk arising from
                            your use of or reliance on any content you store in your vaults.
                        </p>

                        <h3>FEES AND PAYMENT</h3>
                        <p>
                            Payment may be required to access Pro features of the Service.
                            You agree to provide current and complete information for purchases made via the Service.
                            You will be billed via secure third-party payment processors for purchases
                            made via the Service. Sales tax will be added as deemed
                            required by us. We may change prices at any time. Payments will be
                            denominated in U.S dollars.
                        </p>

                        <h3>CANCELLATION</h3>
                        <p>
                            All purchases are non-refundable. However, due to our zero-knowledge architecture,
                            your vaults will continue to function independently even if you cancel your Pro subscription
                            or our service becomes unavailable, as long as you have your vault backups and unlock keys.
                        </p>

                        <h3>GOVERNING LAW</h3>
                        <p>
                            The validity of these Terms and the rights, obligations, and relations of the parties
                            under these Terms will be construed and determined under and in accordance with the
                            laws of the State of Israel, without regard to conflicts of law principles.
                        </p>

                        <h3>JURISDICTION</h3>
                        <p>
                            You expressly agree that exclusive jurisdiction for any dispute with the
                            Service or relating to your use of it, resides in the courts of
                            Israel and you further agree and expressly consent to the exercise of
                            personal jurisdiction in the courts of Israel
                            in connection with any such dispute including any claim involving Service.
                            You further agree that you and Service will not commence against the other
                            a class action, class arbitration or other representative action or proceeding.
                        </p>

                        <h3>TERMINATION</h3>
                        <p>
                            We reserve the right to suspend or disable your access to or use of the Service at any time.
                            However, your existing vaults will remain functional through our open source unlock utility,
                            ensuring you retain access to your encrypted data regardless of service availability.
                        </p>

                        <h3>DATA AND VAULT SECURITY</h3>
                        <p>
                            <strong>Zero-Knowledge Architecture:</strong> Due to our client-side encryption design, 
                            we do not store, transmit, or have access to your vault contents or decryption keys. 
                            All sensitive data remains exclusively in your control.
                            
                            <strong>Your Responsibility:</strong> You are solely responsible for:
                            <ul>
                                <li>Backing up your vault files and key shares securely</li>
                                <li>Ensuring the security of your printed vault materials</li>
                                <li>Properly distributing key shares to trusted individuals</li>
                                <li>Testing vault recovery procedures</li>
                            </ul>
                            
                            <strong>No Recovery Possible:</strong> We cannot recover, restore, or provide access to 
                            lost vaults or keys. You acknowledge and accept full responsibility for vault backup and recovery.
                            You hereby waive any right of action against us arising from loss of vault access due to 
                            lost backups or keys.
                        </p>

                        <h3>OPEN SOURCE COMMITMENT</h3>
                        <p>
                            Our unlock utility is open source and will remain freely available. This ensures your vaults 
                            remain accessible even if our service becomes unavailable. You are encouraged to download 
                            and verify the unlock utility from our official repository.
                        </p>

                        <h3>COPYRIGHT</h3>
                        <p>
                            In accordance with the Digital Millennium Copyright Act ("DMCA") and
                            other applicable law, we have adopted a policy of terminating, in appropriate
                            circumstances and, at our sole discretion, access to the Service for users who
                            are deemed to be repeat infringers.
                        </p>

                        <h3>DISCLAIMER, INDEMNIFICATION, LIMITATION OF LIABILITY</h3>
                        <p>
                            THE SERVICE AND ANY OTHER SERVICE AND CONTENT INCLUDED ON OR OTHERWISE MADE AVAILABLE TO
                            YOU THROUGH THE SERVICE ARE PROVIDED TO YOU ON AN AS IS OR AS AVAILABLE BASIS WITHOUT
                            ANY REPRESENTATIONS OR WARRANTIES OF ANY KIND.
                            WE DISCLAIM ANY AND ALL WARRANTIES AND REPRESENTATIONS (EXPRESS OR IMPLIED,
                            ORAL OR WRITTEN) WITH RESPECT TO THE SERVICE AND CONTENT INCLUDED ON OR OTHERWISE
                            MADE AVAILABLE TO YOU THROUGH THE SERVICE WHETHER ALLEGED TO ARISE BY OPERATION OF LAW,
                            BY REASON OF CUSTOM OR USAGE IN THE TRADE, BY COURSE OF DEALING OR OTHERWISE.

                            <strong>VAULT SECURITY DISCLAIMER:</strong> While we implement industry-standard security practices 
                            for our website and services, the security of your vault contents depends entirely on your 
                            proper handling of vault backups and key shares. We provide tools and guidance but cannot 
                            guarantee the security of improperly stored materials.

                            IN NO EVENT WILL WE BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY SPECIAL,
                            INDIRECT, INCIDENTAL, EXEMPLARY OR CONSEQUENTIAL DAMAGES OF ANY KIND ARISING
                            OUT OF OR IN CONNECTION WITH THE SERVICE OR ANY OTHER SERVICE AND/OR CONTENT
                            INCLUDED ON OR OTHERWISE MADE AVAILABLE TO YOU THROUGH THE SERVICE, INCLUDING
                            BUT NOT LIMITED TO LOSS OF VAULT ACCESS, LOSS OF ENCRYPTED DATA, OR INABILITY
                            TO RECOVER VAULT CONTENTS, REGARDLESS OF THE FORM OF ACTION, WHETHER IN CONTRACT, 
                            TORT, STRICT LIABILITY OR OTHERWISE, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY 
                            OF SUCH DAMAGES OR ARE AWARE OF THE POSSIBILITY OF SUCH DAMAGES. OUR TOTAL LIABILITY 
                            FOR ALL CAUSES OF ACTION AND UNDER ALL THEORIES OF LIABILITY WILL BE LIMITED TO THE 
                            AMOUNT YOU PAID TO US. THIS SECTION WILL BE GIVEN FULL EFFECT EVEN IF ANY REMEDY 
                            SPECIFIED IN THIS AGREEMENT IS DEEMED TO HAVE FAILED OF ITS ESSENTIAL PURPOSE.

                            You agree to defend, indemnify and hold us harmless from and against any and all costs,
                            damages, liabilities, and expenses (including attorneys' fees, costs, penalties,
                            interest and disbursements) we incur in relation to, arising from, or for the purpose
                            of avoiding, any claim or demand from a third party relating to your use of the
                            Service or the use of the Service by any person using your account,
                            including any claim that your use of the Service violates any applicable law or
                            regulation, or the rights of any third party, and/or your violation of these Terms.
                        </p>

                        <h3>ENTIRE AGREEMENT</h3>
                        <p>
                            These Terms constitute the entire agreement between you and us regarding the use of the Service, 
                            superseding any prior agreements between you and us relating to your use of the Service.
                        </p>

                        <h3>QUESTIONS</h3>
                        <p>
                            Questions or comments about the Service may be directed to us at: 
                            <a href="mailto:support@kosign.xyz"> support@kosign.xyz</a>.
                        </p>

                    </div>

                </Container>
            </div>
        </Layout>
    );

}

export default LegalPage;

