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
                            Last update: 13 May 2023
                            <br/><br/>
                            By accessing and using this Site, including any of its products or services, you agree to
                            be bound by these Terms of Use and you agree to be bound by the applicable law.
                            If you do not agree with all of these terms of use, then you must discontinue use immediately.
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
                            that we do not own or control. Your use of the Service, including any of its products
                            or services, may also include the use of applications that are developed or owned
                            by a third party. Your use of such third party applications, websites, and services
                            is governed by that party's own terms of service or privacy policies. We encourage
                            you to read the terms and conditions and privacy policy of any third party application,
                            website or service that you visit or use.
                        </p>

                        <h3>ACCOUNT</h3>
                        <p>
                            When you create an account or vault (or use another service) on the Service, including
                            any of its products or services, you agree to maintain the security of your materials
                            and accept all risks of unauthorized access to any data or other information you
                            provide to the Service.
                        </p>

                        <h3>USER CONTENT & CONDUCT</h3>
                        <p>
                            Our Service, including any of its products or services, allows you and other users to post,
                            link and otherwise make available content. You are responsible for the content that you
                            make available to the Service, including its legality, reliability, and appropriateness.
                        </p>

                        <h3>INTELLECTUAL PROPERTY</h3>
                        <p>
                            We put a lot of effort into creating the Service, including any of its products or services, including the logo and all designs, text, graphics, pictures, information and other content (excluding your content). This property is owned by us or our licensors and it is protected by U.S. and international copyright laws.

                            Your rights do not include: (i) publicly performing or publicly displaying the Service;
                            (ii) modifying or otherwise making any derivative uses of the Service or any portion
                            thereof; (iii) using any data mining, robots or similar data gathering or extraction
                            methods; (iv) downloading (other than page caching) of any portion of the Service or
                            any information contained therein; (v) reverse engineering or accessing the Service
                            in order to build a competitive product
                        </p>

                        <h3>LINKS AND THIRD PARTY CONTENT</h3>
                        <p>
                            You may create a hyperlink to the Service. But, you may not use, frame or utilize
                            framing techniques to enclose any of our Service without our express written consent.
                            We as the Service provider make no claim or representation regarding, and accepting no responsibility
                            for third party websites accessible by hyperlink from the Service or websites linking
                            to the Service. When you leave the Service, you should be aware that these Terms
                            and our policies no longer govern.

                            If there is any content on the Service from you and others, we don't review, verify or
                            authenticate it, and it may include inaccuracies or false information. We make no
                            representations, warranties, or guarantees relating to the quality, suitability,
                            truth, accuracy or completeness of any content contained in the Service. You acknowledge
                            sole responsibility for and assume all risk arising from
                            your use of or reliance on any content.
                        </p>

                        <h3>FEES AND PAYMENT</h3>
                        <p>
                            Payment may be required to access some or all of the Service.
                            You agree to provide current and complete information for purchases made via the Service.
                            You will be billed via an online billing service for purchases
                            made via the Service. Sales tax will be added  as deemed
                            required by us. We may change prices at any time. Payments will be
                            denominated in U.S dollars.
                        </p>


                        <h3>CANCELLATION</h3>
                        <p>
                            All purchases are non-refundable.
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
                            personal jurisdiction in the courts of the Israel
                            in connection with any such dispute including any claim involving Service.
                            You further agree that you and Service will not commence against the other
                            a class action, class arbitration or other representative action or proceeding.
                        </p>

                        <h3>TERMINATION</h3>
                        <p>We reserve the right to suspend or disable your access to or use of the Service at any time.</p>

                        <h3>USER DATA</h3>
                        <p>
                            We will maintain certain data that you transmit to the Service, as well as data relating
                            to your use of the Service.
                            You are solely responsible for all data that you transmit or that relates to any
                            activity you have undertaken using the Service.
                            You agree that we shall have no liability to you for any loss or corruption
                            of any such data, and you hereby waive any right of action against us arising
                            from any such loss or corruption of such data.
                        </p>

                        <h3>COPYWRITE</h3>
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

                            IN NO EVENT WILL WE BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY SPECIAL,
                            INDIRECT, INCIDENTAL, EXEMPLARY OR CONSEQUENTIAL DAMAGES OF ANY KIND ARISING
                            OUT OF OR IN CONNECTION WITH THE SERVICE OR ANY OTHER SERVICE AND/OR CONTENT
                            INCLUDED ON OR OTHERWISE MADE AVAILABLE TO YOU THROUGH THE SERVICE, REGARDLESS
                            OF THE FORM OF ACTION, WHETHER IN CONTRACT, TORT, STRICT LIABILITY OR OTHERWISE,
                            EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES OR ARE AWARE OF THE
                            POSSIBILITY OF SUCH DAMAGES. OUR TOTAL LIABILITY FOR ALL CAUSES OF ACTION AND
                            UNDER ALL THEORIES OF LIABILITY WILL BE LIMITED TO THE AMOUNT YOU PAID TO US.
                            THIS SECTION WILL BE GIVEN FULL EFFECT EVEN IF ANY REMEDY SPECIFIED IN THIS
                            AGREEMENT IS DEEMED TO HAVE FAILED OF ITS ESSENTIAL PURPOSE.

                            You agree to defend, indemnify and hold us harmless from and against any and all costs,
                            damages, liabilities, and expenses (including attorneys' fees, costs, penalties,
                            interest and disbursements) we incur in relation to, arising from, or for the purpose
                            of avoiding, any claim or demand from a third party relating to your use of the
                            Service or the use of the Service by any person using your account,
                            including any claim that your use of the Service violates any applicable law or
                            regulation, or the rights of any third party, and/or your violation of these Terms.

                            NO EVENT WILL WE OR OUR DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE TO YOU OR ANY THIRD PARTY
                            FOR ANY DIRECT, INDIRECT, EXEMPLARY, INCIDENTAL, CONSEQUENTIAL, SPECIAL, OR PUNITIVE DAMAGES,
                            INCLUDING LOST PROFIT, LOSS OF DATA, LOST REVENUE, OR OTHER DAMAGES
                            ARISING FROM YOUR USE OF THE SITE, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
                        </p>

                        <h3>ENTIRE AGREEMENT</h3>
                        <p>
                            These Terms constitute the entire agreement between you and us (the Service provider)
                            regarding the use of the Service, superseding any prior agreements between you and us
                            relating to your use of the Service.
                        </p>

                        <h3>
                            QUESTIONS
                        </h3>
                        <p>
                            Questions or comments about the Service may be directed to us at: support@kosign.xyz.

                        </p>


                    </div>

                </Container>
            </div>
        </Layout>
    );

}

export default LegalPage;

