import React, {Component, useEffect, useState} from 'react'
import { Link , useNavigate, useParams} from 'react-router-dom'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Layout from "../components/Layout";


import {Button} from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Navbar from '../components/NavbarTop';
import Footer from '../components/Footer';

import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import {PaymentService} from "../services/PaymentService";
import PaymentCheckoutForm from "../components/PaymentCheckoutForm";

import {FaChevronRight, FaLock, FaLockOpen, FaInfoCircle, FaCheck} from 'react-icons/fa';
import {MdWarningAmber} from 'react-icons/md';
//import LottieAnimationLoading from "../animations/98288-loading";
//import Lottie from "lottie-react-web";
import {Oval} from "react-loading-icons";

let stripePromise = loadStripe(global.stripePubKey);

function PaymentComponent(props) {

    const navigate                          = useNavigate();
    // let [stripeIntentID, setStripeIntentID] = useState();
    let [clientSecret, setStripeClientSecret] = useState('');
    let [stripePubKey, setStripePubKey]     = useState();
    let [isLoading, setIsLoading]           = useState(true);
    let [isOnline, setIsOnline]             = useState(props.isOnline);
    let [totalCost, setTotalCost]           = useState(props.totalCost);
    let [couponApplied, setCouponApplied]   = useState(false);
    let [elementOptions, setElementOptions] = useState();

    useEffect(() => {
        //get payment intent from server
        if (!props.quantity) return;
        //console.log('stripe promise is ', stripePromise);
     //   console.log('setting up payment ....', props.quantity);
        setupStripe('');

    }, [props]);

    useEffect(()=>{
        if (props.isOnline != isOnline) {
            setupStripe('');
            setIsOnline(props.isOnline);
        }
    }, [props.isOnline]);

    const setupStripe = (coupon) => {
        //console.log('setting up payment with coupon ', coupon);
        PaymentService.setupPayment(props.quantity, coupon).then((response)=>{
            //console.log('SETUPPYAMENTRESPONSE', response);
            setStripePubKey(response.stripePubkey);
            setStripeClientSecret(response.clientSecret);
            setIsLoading(false);
            let clientSecret = response.clientSecret;
            let tmpObj = {
                clientSecret,
                appearance,
            };

            setElementOptions(tmpObj);
            //  console.log('payment setup is ', response);
            // setStripeIntentID(response.setup_intent_id);
            //stripePromise = loadStripe(response.stripe_pubkey);
        }).catch(error => {
            //console.log('payment intent ERROR');
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        });
    };

    const applyCoupon = (coupon) => {
        if (couponApplied) {
            alert ('You already have a coupon applied');
            return;
        }
        setIsLoading(true);
        PaymentService.applyCoupon(coupon).then((response)=>{
            if (response.result) {
                //console.log('total cost is ', totalCost,' amountoff is', response.amountOff);
                if (response.amountOff>=(totalCost*100)) {
                    setIsLoading(false);
                    props.onPaymentComplete();
                    return;
                }

                let newTotalCost = ((totalCost*100) - (response.amountOff)) /100;
                setCouponApplied(response.amountOff);
                setTotalCost(newTotalCost);
                if (newTotalCost>0) {
                    setupStripe(coupon);
                }
            }
            //console.log('COUPON SETUP', response);
        }).catch(error => {
            alert ('invalid coupon code');
            //console.log('coupon setup ERROR');
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        });
    };

 /*   useEffect(()=>{
        if (!clientSecret) return;
        setIsLoading(false);
    }, [clientSecret]);*/

    const appearance = {
        theme: 'flat',
        variables: {
            fontFamily: ' "Gill Sans", sans-serif',
            fontLineHeight: '1.5',
            borderRadius: '10px',
            colorBackground: '#F6F8FA',
            colorPrimaryText: '#262626',
            fontSizeSm:'18px'
        },
        rules: {
            '.Block': {
                backgroundColor: 'var(--colorBackground)',
                boxShadow: 'none',
                padding: '12px'
            },
            '.Input': {
                padding: '12px',
                backgroundColor: '#cfe2ff',
            },
            '.Input:disabled, .Input--invalid:disabled': {
                color: 'lightgray'
            },
            '.Tab': {
                padding: '10px 12px 8px 12px',
                border: 'none'
            },
            '.Tab:hover': {
                border: 'none',
                boxShadow: '0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 7px rgba(18, 42, 66, 0.04)'
            },
            '.Tab--selected, .Tab--selected:focus, .Tab--selected:hover': {
                border: 'none',
                backgroundColor: '#fff',
                boxShadow: '0 0 0 1.5px var(--colorPrimaryText), 0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 7px rgba(18, 42, 66, 0.04)'
            },
            '.Label': {
                fontWeight: '500'
            }
        }
    };

   /* const elementOptions = {
        clientSecret,
        appearance,
    };*/

    const elementIsReady = () => {
        setIsLoading(false);
    }

    return (
        <div style={{minHeight:200}}>

            {!props.isOnline ?
                <div className={'alert alert-danger'}>
                    <MdWarningAmber style={{marginRight: 2, fontSize: 22}}/>
                    <b>You are offline. Enable your internet to complete payment.</b>
                </div>
                :
                null
            }

            {isLoading?<div className={'centerLoading'}><Oval stroke="#000" strokeWidth={10} strokeOpacity={1} speed={1} style={{width:25}} /></div>:null}

            {!isLoading && elementOptions?
                <Elements key={'elementkey'+elementOptions.clientSecret} options={elementOptions} stripe={stripePromise}>
                    <div className={'invoiceTotalWrapper'}>
                        {/*<div style={{margin:0, padding:0}}>
                            Purchase details
                        </div>*/}
                        <div className={'invoiceDetails'}>
                            <div className={'invoiceRow'}>
                                <div>
                                    Vault with {props.quantity} keys
                                </div>
                                <div>
                                    ${props.totalCost}
                                </div>
                            </div>
                            {couponApplied?
                                <div>
                                    <div className={'invoiceRow'}>
                                        <div>
                                            Coupon discount
                                        </div>
                                        <div>
                                           - ${couponApplied/100}
                                        </div>
                                    </div>
                                    <div className={'invoiceRow'}>
                                        <div>
                                            <b>Total Cost:</b>
                                        </div>
                                        <div>
                                            <b>${totalCost}</b>
                                        </div>
                                    </div>
                                </div>
                            : null }
                        </div>
                    </div>
                    <PaymentCheckoutForm
                        onReady             = {()=>elementIsReady()}
                        clientSecret        = {clientSecret}
                        onPaymentComplete   = {()=>props.onPaymentComplete()}
                        applyCoupon         = {(coupon)=>applyCoupon(coupon)}
                        couponApplied       = {couponApplied}
                    />
                </Elements>
            : null}


        </div>
    )

}

export default PaymentComponent;

