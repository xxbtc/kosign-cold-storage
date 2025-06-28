import secrets from 'secrets.js'; //TODO:fix to secrets.js-grempe
import { CURRENT_VAULT_VERSION, VAULT_VERSIONS } from '../config/vaultConfig';

const CryptoJS = require("crypto-js");
const bip39 = require('bip39');


export class EncryptionService {
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
            mode    : CryptoJS.mode.CTR,
            padding : CryptoJS.pad.NoPadding,
            hasher  : CryptoJS.algo.SHA256
        };

        const key = CryptoJS.PBKDF2(passphrase, salt, {
            keySize: 256/32, 
            iterations: 100000
        });
        
        const ciphertext = CryptoJS.AES.encrypt(dataToEncrypt, key, encryptionOptions);

        return {
            cipherText: ciphertext.ciphertext.toString(CryptoJS.enc.Hex),
            cipherKey: ciphertext.key.toString(CryptoJS.enc.Hex),
            cipherIV: ciphertext.iv.toString(CryptoJS.enc.Hex),
            cipherOpenSSL: ciphertext.toString(),
            version: CURRENT_VAULT_VERSION
        };
    };

    static decrypt = async (dataToDecrypt, secretKey, iv, version = CURRENT_VAULT_VERSION) => {
        // Version validation
        if (!VAULT_VERSIONS[version]) {
            throw new Error(`Unsupported vault version: ${version}. Please update your software.`);
        }

        const encryptionOptions = {
            iv      : CryptoJS.enc.Hex.parse(iv),
            mode    : CryptoJS.mode.CTR,
            padding : CryptoJS.pad.NoPadding,
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
            mode    : CryptoJS.mode.CTR,
            padding : CryptoJS.pad.NoPadding,
            hasher  : CryptoJS.algo.SHA256
        };

        const key = CryptoJS.PBKDF2(secretKey, secretKey, {keySize: 256/32, iterations: 100000});
        const ciphertext = CryptoJS.enc.Hex.parse(dataToDecrypt);
        const decrypted = CryptoJS.AES.decrypt({ciphertext:ciphertext}, key, encryptionOptions);
        return decrypted.toString(CryptoJS.enc.Utf8);
    };

    static splitKey = async (secretKey, numberOfShares, threshold) => {
        console.log('splitKey called with:', { numberOfShares, threshold });
        
        // Validate threshold constraints (secrets.js library requirement)
        if (numberOfShares > 1 && threshold === 1) {
            throw new Error('Cryptographic library requires threshold >= 2 for multiple keys. Use single key instead.');
        }
        
        // convert the text into a hex string
        const pwHex = secrets.str2hex(secretKey); // => hex string
        // split into numberOfShares shares, with given threshold
        const shares = secrets.share(pwHex, numberOfShares, threshold);
        console.log('Generated', shares.length, 'shares with threshold', threshold);
        return shares;
    };

    static combineShares = async (shares) => {
        console.log('combineShares called with', shares.length, 'shares');
        
        try {
            let comb = secrets.combine(shares);
            return secrets.hex2str(comb);
        } catch (error) {
            console.error('Error in combineShares:', error);
            throw new Error(`Failed to combine shares: ${error.message}`);
        }
    };



    static generateListOfCombinedWords =  (amount) => {

        let  mnemonic = [];
        let entropy;
        for (let i = 0; i < 4; i++) {
            // Generate a random 128-bit entropy
            entropy = CryptoJS.lib.WordArray.random(16);

            // Convert the entropy to a mnemonic phrase
            mnemonic.push(bip39.entropyToMnemonic(entropy.toString()).split(' '));

            //console.log('Mnemonic phrase', i + 1, ':', mnemonic);
        }
        //console.log('asking for this amount of words:', amount);
        let cleanWords = [];

        mnemonic.forEach((row) => {
            row.forEach((word) => {
                    cleanWords.push((word));
            });
        });

       // console.log('clearn words ', cleanWords);

        let returnArray = [];
        let c = 0;
        for (let i = 0; i < cleanWords.length; i += 2) {
            const word1 = cleanWords[i];
            const word2 = cleanWords[i + 1];

            const combined = word1+'-' + word2;
          //  console.log('combined is now ', combined);

            if (c<amount) {
                returnArray.push(combined);
                c++;
            }
        }

        //console.log('returning words: ', returnArray);

        return returnArray;
    }
}

