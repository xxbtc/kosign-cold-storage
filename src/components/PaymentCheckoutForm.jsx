import React, { Component, useState, useEffect } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Layout from "../components/Layout";
import {Button, Carousel, CarouselItem, FormGroup, FormText} from 'react-bootstrap';
import '../style/index.css';
import '../style/forms.css';

import {
    CardElement,
    useStripe,
    useElements,
    PaymentElement
} from "@stripe/react-stripe-js";
import {PaymentService} from "../services/PaymentService";
import {Oval} from "react-loading-icons";


function PaymentCheckoutForm(props) {

    const navigate                          = useNavigate();


    const stripe = useStripe();
    const elements = useElements();

    const [message, setMessage]         = useState(null);
    const [isLoading, setIsLoading]     = useState(true);
    const [showCoupon, setShowCoupon]   = useState(!props.couponApplied);
    const [couponCode, setCouponCode]   = useState('');


    useEffect(() => {
        /*if (!stripe) {
            return;
        }

        /!* const clientSecret = new URLSearchParams(window.location.search).get(
             "payment_intent_client_secret"
         );*!/

        if (!props.stripeClientSecret) {
            return;
        }

        stripe.retrievePaymentIntent(props.stripeClientSecret).then(({ paymentIntent }) => {
            switch (paymentIntent.status) {
                case "succeeded":
                    setMessage("Payment succeeded!");
                    break;
                case "processing":
                    setMessage("Your payment is processing.");
                    break;
                case "requires_payment_method":
                    setMessage("Your payment was not successful, please try again.");
                    break;
                default:
                    setMessage("Something went wrong.");
                    break;
            }
        });*/

    }, [stripe]);

    const payNow = async () => {
        //console.log('paying...');
        if (!stripe || !elements) {
            //console.log('error: stripe not loaded...');
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }
        setIsLoading(true);
        const cardElement = elements.getElement(CardElement);
        /*const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                // Make sure to change this to your payment completion page
                return_url: global.paymentCompleteURL,
            },
        });*/

       /* const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                // Make sure to change this to your payment completion page
                return_url: global.paymentCompleteURL,
            },
        });
*/
       /* stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: cardElement,
                billing_details: {
                    name: 'Jenny Rosen',
                },
            },
        }).then((result)=>{
            console.log('result is ', result);
        }).catch((e)=>{
            console.log('payment error ', e);
        })*/

        await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: global.paymentCompleteURL,
            },
            redirect: 'if_required'
        }).then((result)=>{
            //console.log('payment confirmed ....',result);
            props.onPaymentComplete();
        }).catch((e)=>{
            //console.log('payment error ', e);
        });

        /*stripe.confirmCardSetup(props.clientSecret,{
            payment_method: {
                card: cardElement
            },
        }).then(function(result) {
            console.log('card confirmed, creating subscription ....',result);

            // Handle result.error or result.setupIntent
            if (result.error) {
                alert(result.error.message);
                return;
            }


            PaymentService.createSubscription(result.setupIntent.payment_method).then((response)=>{
                navigate('/thankyou');
            }).catch(error => {
                console.log('createSubscription ERROR');
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            });

        });*/



        // This point will only be reached if there is an immediate error when
        // confirming the payment. Otherwise, your customer will be redirected to
        // your `return_url`. For some payment methods like iDEAL, your customer will
        // be redirected to an intermediate site first to authorize the payment, then
        // redirected to the `return_url`.
        /*if (error.type === "card_error" || error.type === "validation_error") {
            setMessage(error.message);
        } else {
            setMessage("An unexpected error occurred.");
        }*/

        //setIsLoading(false);
    };

    const applyCoupon = () => {
        props.applyCoupon(couponCode);
    };

    const elementIsReady = () => {
       // props.onReady();

        setIsLoading(false);

    };

    return (
        <div>
            {isLoading?<div className={'centerLoading'}><Oval stroke="#1786ff" strokeWidth={10} strokeOpacity={1} speed={1} style={{width:25}} /></div>:null}

            {/*<CardElement id="payment-element" options={cardStyle} onReady={()=>elementIsReady()} />*/}
            <PaymentElement onReady={()=>elementIsReady()}/>

            <div style={{marginTop:20}}>
                {showCoupon ?
                    <div style={{display:'flex', flex:1, flexDirection:'row', alignItems:'center'}}>
                        <input name="vaultName" type="text" placeholder={'Coupon Code'}
                               onChange={(e) => setCouponCode(e.target.value)}
                               value={couponCode}
                               className={'form-control formControls'}
                               style={{width:200}}
                        />
                        <Button
                            variant = {'default'}
                            size    = {'md'}
                            id="submit222"
                            disabled={isLoading}
                            onClick={()=>applyCoupon()}
                        >
                            Apply
                        </Button>
                    </div>
                    :
                    <Link to={'#'} className={'linkage'} onClick={() => setShowCoupon(true)}>+ Add Coupon Code</Link>
                }
            </div>

            <Button
                variant = {'primary'}
                size    = {'lg'}
                id="submit"
                disabled={isLoading || !stripe || !elements}
                style={{marginTop:40}}
                onClick={()=>payNow()}
            >
                Pay Now
            </Button>
            {/* Show any error or success messages */}
            {message && <div id="payment-message">{message}</div>}
        </div>
    )

}

const cardStyle = {
    style: {
        base: {
            color: "#32325d",
            fontFamily: 'Arial, sans-serif',
            fontSmoothing: "antialiased",
            fontSize: "1.2rem",
            "::placeholder": {
                color: "#32325d"
            },
        },
        invalid: {
            fontFamily: 'Arial, sans-serif',
            color: "#fa755a",
            iconColor: "#fa755a"
        },

    }
};


export default PaymentCheckoutForm;

