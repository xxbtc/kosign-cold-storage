import secrets from 'secrets.js'; //TODO:fix to secrets.js-grempe
const CryptoJS = require("crypto-js");

export  class EncryptionService  {

    constructor() {

    }

    static hash =  (dataToHash) => {
        return CryptoJS.SHA256(dataToHash).toString();
    };

    static encrypt = async (dataToEncrypt, password) => {

        let salt        = CryptoJS.lib.WordArray.random(16);
        let passphrase  = CryptoJS.lib.WordArray.random(16);
        let iv          = CryptoJS.lib.WordArray.random(16);

        if (password) {
            passphrase  = password;
            salt        = password;
        }

        const encryptionOptions = {
            iv      : iv,
            mode    : CryptoJS.mode.CBC,
            padding : CryptoJS.pad.Pkcs7,
            hasher  : CryptoJS.algo.SHA256
        };

        const key        = CryptoJS.PBKDF2(passphrase, salt, {keySize: 256/32, iterations: 100000});
        const ciphertext = CryptoJS.AES.encrypt(dataToEncrypt, key, encryptionOptions);

        return {
            cipherText        : ciphertext.ciphertext.toString(CryptoJS.enc.Hex),
            cipherKey         : ciphertext.key.toString(CryptoJS.enc.Hex),
            cipherIV          : ciphertext.iv.toString(CryptoJS.enc.Hex),
            cipherOpenSSL     : ciphertext.toString(),
            encryptionOptions : encryptionOptions
        };
    };

    static decrypt = async (dataToDecrypt, secretKey, iv) => {
        const encryptionOptions = {
            iv      : CryptoJS.enc.Hex.parse(iv),
            mode    : CryptoJS.mode.CBC,
            padding : CryptoJS.pad.Pkcs7,
            hasher  : CryptoJS.algo.SHA256
        };

        const key = CryptoJS.enc.Hex.parse(secretKey);
        const ciphertext = CryptoJS.enc.Hex.parse(dataToDecrypt);
        const decrypted = CryptoJS.AES.decrypt({ciphertext:ciphertext}, key, encryptionOptions);
        return decrypted.toString(CryptoJS.enc.Utf8);
    };


    /* used decrypt using deterministic key */
    static decryptDeterministic = async (dataToDecrypt, secretKey, iv) => {
        const encryptionOptions = {
            iv      : CryptoJS.enc.Hex.parse(iv),
            mode    : CryptoJS.mode.CBC,
            padding : CryptoJS.pad.Pkcs7,
            hasher  : CryptoJS.algo.SHA256
        };

        const key = CryptoJS.PBKDF2(secretKey, secretKey, {keySize: 256/32, iterations: 100000});
        const ciphertext = CryptoJS.enc.Hex.parse(dataToDecrypt);
        const decrypted = CryptoJS.AES.decrypt({ciphertext:ciphertext}, key, encryptionOptions);
        return decrypted.toString(CryptoJS.enc.Utf8);
    };

    static splitKey = async (secretKey, numberOfShares, threshold) => {
        // convert the text into a hex string
        const pwHex = secrets.str2hex(secretKey); // => hex string
        // e.g. split into 10 shares, with a threshold of 4
        const shares = secrets.share(pwHex, numberOfShares, threshold);
        //console.log('shares: ', shares);
        return shares;
    };

    static combineShares = async (shares) => {
        let comb = secrets.combine(shares);
        return secrets.hex2str(comb);
    }
}

