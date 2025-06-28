global.apiURL = 'https://api.kosign.xyz/index.php/kosign/';
//global.apiURL = 'http://kosign.localhost/index.php/api/';
//global.pusherAppKey = '0667b61d23b491b8a351';

global.paymentCompleteURL = 'https://kosign.xyz/thankyou';
//global.paymentCompleteURL = 'http://localhost:3000/thankyou';

//global.stripePubKey = 'pk_test_I4rOTLfBxkIH2dqZ1c8iTr2400Pjy6dJbv';
global.stripePubKey = 'pk_live_ebxGJc3XYVRfcCmNUBxoDbuY00ECghv95k';

// New Pricing Model: $5 per key with first key free
global.PRICING = {
    freeKeys: 1,         // First key is always free
    pricePerKey: 5,      // $5 for each additional key
    maxKeysWithoutPayment: 1,  // Can create 1 key without payment
    maxStorage: 300      // Storage limit remains the same
};

// Legacy settings (can be removed once ProFeatureService is updated)
global.costPerKey = global.PRICING.pricePerKey;
global.setupCost  = 0;
global.freeKeys   = global.PRICING.freeKeys;
global.maxCharsPerVaultFree = global.PRICING.maxStorage;
global.maxCharsPerVault = global.PRICING.maxStorage;
//global.regularURL = 'http://xxxxxx.localhost/api/index.php/';

//global.wsURL = 'wss://echo.websocket.org';
//global.wsURL = 'http://xxxx:9000';

