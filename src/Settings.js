const settings = {
    // used to simulate a parameter sent with no value
    noValueString: "novalue",
    //ignoredValues: ["", "undefined", undefined, "Pay", null, "NOVALUE", "novalue"],
    initialValues: {
        transactionType: [
            {
                name: 'payment',
                postValues: {
                    'MerchantTransactionID': '1234567890',
                    'Amount': '100',
                    'Currency': 'EUR',
                    'ReturnURL': 'https://demo.smart2pay.com/redirect.php',
                }
            },
            {
                name: 'payout',
                postValues: {
                    'MerchantTransactionID': '1234567890',
                    'Amount': '100',
                    'Currency': 'EUR',
                }
            },
            {
                name: 'recurrent',
                postValues: {}
            },
            {
                name: 'refund',
                postValues: {
                    'MerchantTransactionID': '1234567890',
                    'Amount': '100',
                }
            },
            {
                name: 'capture',
                postValues: {
                    'Amount': '100',
                }
            },
            {
                name: 'cancel',
                postValues: {}
            }                                                            
        ],
        postUrlData: {
            formAction: 'https://apitest.smart2pay.com/',
            postUrlName: 'demo'
        }
    }
    //ignoredValuesForHash: ['NOVALUE', 'novalue'],
    //allowedTags: ['INPUT', 'SELECT', 'TEXTAREA'],
    //postForm: document.getElementById('s2pform'),
};

export default settings;