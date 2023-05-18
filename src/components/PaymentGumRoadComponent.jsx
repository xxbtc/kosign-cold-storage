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

function PaymentGumRoadComponent(props) {

    const navigate                          = useNavigate();
    // let [stripeIntentID, setStripeIntentID] = useState();
    let [clientSecret, setStripeClientSecret] = useState('');
    let [stripePubKey, setStripePubKey]     = useState();
    let [isLoading, setIsLoading]           = useState(false);
    let [isOnline, setIsOnline]             = useState(props.isOnline);
    let [totalCost, setTotalCost]           = useState(props.totalCost);
    let [couponApplied, setCouponApplied]   = useState(false);
    let [elementOptions, setElementOptions] = useState();


   /* useEffect(()=>{
        const queryString = window.location.search;
        setIsLoading(false);
        // Create a new URLSearchParams object from the query string
        const params = new URLSearchParams(queryString);
        // Retrieve the values using the parameter names
        const productId             = params.get('product_id');
        const product_permalink     = params.get('product_permalink');
        const sale_id               = params.get('sale_id');
        PaymentService.setupGumroadPayment(productId, product_permalink, sale_id).then((response)=>{
            console.log('setupGumroadPayment', response);
            setIsLoading(false);
        }).catch(error => {
            console.log('payment intent ERROR');
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        });
    },[]);*/


    useEffect(()=>{
        if (props.isOnline != isOnline) {
            setIsOnline(props.isOnline);
        }
    }, [props.isOnline]);



 /*   useEffect(()=>{
        if (!clientSecret) return;
        setIsLoading(false);
    }, [clientSecret]);*/


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

            {isLoading?<div className={'centerLoading'}><Oval stroke="#000" strokeWidth={10} strokeOpacity={1} speed={1} style={{width:25}} /></div> :null}

            {!isLoading ?
                <div>
                    {/*<div className={'invoiceTotalWrapper'}>
                        <div style={{margin:0, padding:0}}>
                            Purchase details
                        </div>
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
                    </div>*/}

                    <div>
                        <iframe src={'https://kosignxyz.gumroad.com/l/kosign'+props.quantity} height={600} width={'100%'} />
                    </div>

                </div>
            : null}


        </div>
    )

}

export default PaymentGumRoadComponent;

