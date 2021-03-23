const settings = {
    // used to simulate a parameter sent with no value
    noValueString: "novalue",
    //ignoredValues: ["", "undefined", undefined, "Pay", null, "NOVALUE", "novalue"],
    initialValues: {
        postValues: {
            'Amount': '100',
            'Currency': 'EUR',
            'ReturnURL': 'https://demo.smart2pay.com/redirect.php'
        },
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