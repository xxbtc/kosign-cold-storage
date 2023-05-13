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




    static getIntent = async (clientSecret) => {
        const cookies   = new Cookies();
     //   const apikey    =  cookies.get('quorum');
        let params      = new FormData();
        params.append('clientSecret', clientSecret );
        //console.log('[requestUnlock] ', params);
        return axios.post(global.apiURL+'pay/getIntent', params,
            {
                headers: {
                    //'Authorization': 'Bearer '+ apikey,
                    'Content-Type': `multipart/form-data; charset=utf-8; boundary=${params._boundary}`,
                }
            })
            .then(res => {
                //console.log(res);
                return res.data;
            });
    };


}
