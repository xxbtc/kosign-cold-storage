import axios from "axios";
import Cookies from 'universal-cookie';


export class PaymentService  {

    constructor() {

    }


    static setupPayment = async (quantity, coupon) => {
        const cookies   = new Cookies();
      //  const apikey    =  cookies.get('quorum');

        let params      = new FormData();
        params.append('quantity', quantity );
        params.append('coupon', coupon );

        //console.log('[requestUnlock] ', params);
        return axios.post(global.apiURL+'pay/setupStripe', params,
            {
                headers: {
                 //   'Authorization': 'Bearer '+ apikey,
                    'Content-Type': `multipart/form-data; charset=utf-8; boundary=${params._boundary}`,
                }
            })
            .then(res => {
                //console.log(res);
                return res.data;
            });
    };


    static applyCoupon = async (coupon) => {
        const cookies   = new Cookies();
        //  const apikey    =  cookies.get('quorum');

        let params      = new FormData();
        params.append('coupon', coupon );

        //console.log('[requestUnlock] ', params);
        return axios.post(global.apiURL+'pay/applyCoupon', params,
            {
                headers: {
                    //   'Authorization': 'Bearer '+ apikey,
                    'Content-Type': `multipart/form-data; charset=utf-8; boundary=${params._boundary}`,
                }
            })
            .then(res => {
                //console.log(res);
                return res.data;
            });
    };



    static notification = async (data) => {
        const cookies   = new Cookies();
        //  const apikey    =  cookies.get('quorum');

        let params      = new FormData();
        params.append('data', data );


        //console.log('[requestUnlock] ', params);
        return axios.post(global.apiURL+'pay/notification', params,
            {
                headers: {
                    //   'Authorization': 'Bearer '+ apikey,
                    'Content-Type': `multipart/form-data; charset=utf-8; boundary=${params._boundary}`,
                }
            })
            .then(res => {
                //console.log(res);
                return res.data;
            });
    };

    static getIntent = async (clientSecret) => {
        const cookies   = new Cookies();

        let params      = new FormData();
        params.append('client_secret', clientSecret );

        return axios.post(global.apiURL+'pay/getIntent', params,
            {
                headers: {
                    'Content-Type': `multipart/form-data; charset=utf-8; boundary=${params._boundary}`,
                }
            })
            .then(res => {
                return res.data;
            });
    };

    static confirmPayment = async (clientSecret, paymentIntentId, email, name) => {
        const cookies = new Cookies();

        let params = new FormData();
        params.append('client_secret', clientSecret);
        params.append('payment_intent_id', paymentIntentId);
        params.append('email', email);
        params.append('name', name);

        return axios.post(global.apiURL + 'pay/confirmPayment', params, {
            headers: {
                'Content-Type': `multipart/form-data; charset=utf-8; boundary=${params._boundary}`,
            }
        })
        .then(res => {
            return res.data;
        });
    };

    static validateLicense = async (licenseKey) => {
        const cookies = new Cookies();

        let params = new FormData();
        params.append('license_key', licenseKey);

        return axios.post(global.apiURL + 'pay/validateLicense', params, {
            headers: {
                'Content-Type': `multipart/form-data; charset=utf-8; boundary=${params._boundary}`,
            }
        })
        .then(res => {
            return res.data;
        });
    };

    static consumeLicense = async (licenseKey, requestedKeys) => {
        const cookies = new Cookies();

        let params = new FormData();
        params.append('license_key', licenseKey);
        params.append('requested_keys', requestedKeys);

        return axios.post(global.apiURL + 'pay/consumeLicense', params, {
            headers: {
                'Content-Type': `multipart/form-data; charset=utf-8; boundary=${params._boundary}`,
            }
        })
        .then(res => {
            return res.data;
        });
    };

}
