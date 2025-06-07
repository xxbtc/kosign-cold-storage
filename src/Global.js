global.apiURL = 'https://api.kosign.xyz/index.php/kosign/';
//global.apiURL = 'http://kosign.localhost/index.php/api/';
//global.pusherAppKey = '0667b61d23b491b8a351';

global.paymentCompleteURL = 'https://kosign.xyz/thankyou';
//global.paymentCompleteURL = 'http://localhost:3000/thankyou';

//global.stripePubKey = 'pk_test_I4rOTLfBxkIH2dqZ1c8iTr2400Pjy6dJbv';
global.stripePubKey = 'pk_test_I4rOTLfBxkIH2dqZ1c8iTr2400Pjy6dJbv';

// Plan Limits - Centralized Configuration
global.FREE_PLAN = {
    maxShares: 2,        // Free plan allows up to 2 keys
    maxStorage: 500      // 500 character limit for free
};

global.PRO_PLAN = {
    maxShares: 20,       // Pro plan allows up to 20 keys  
    maxStorage: 5000     // 5000 character limit for pro
};

// Legacy settings (can be removed once ProFeatureService is updated)
global.costPerKey = 0;
global.setupCost  = 0;
global.freeKeys   = global.FREE_PLAN.maxShares;  // Use the centralized value
global.maxCharsPerVaultFree = global.FREE_PLAN.maxStorage;
global.maxCharsPerVault = global.PRO_PLAN.maxStorage;
//global.regularURL = 'http://xxxxxx.localhost/api/index.php/';

//global.wsURL = 'wss://echo.websocket.org';
//global.wsURL = 'http://xxxx:9000';

