let formModel = {
    params: [
        {name: "Post URL", isPaymentParam: false},
        {name: "MerchantID", isPaymentParam: true},
        {name: "Amount", isPaymentParam: true},
        {name: "Currency", isPaymentParam: true},
        {name: "ReturnURL", isPaymentParam: true},
        {name: "Country", isPaymentParam: true},
        {name: "Hash", isPaymentParam: true},
        {name: "ComputedString", isPaymentParam: true},
        {name: "MethodID", isPaymentParam: true},
        {name: "CustomerEmail", isPaymentParam: true},
        {name: "ReferenceNumber", isPaymentParam: true},
        {name: "CustomerName", isPaymentParam: true},
        {name: "CustomerPhone", isPaymentParam: true},
        {name: "Description", isPaymentParam: true},
        {name: "SkipHPP", isPaymentParam: true},
        {name: "RedirectInIframe", isPaymentParam: true},
        {name: "MerchantRedirectInIframe", isPaymentParam: true},
        {name: "DisplayInsideIframe", isPaymentParam: false},
        {name: "IframeOverlaySource", isPaymentParam: false},
        
        
    ],
    helpers: [
        {for: "MerchantID"},
        {for: "Currency"},
        {for: "Country"},
        {for: "MethodID"},
        {for: "SkipHPP"},
        {for: "RedirectInIframe"},
        {for: "MerchantRedirectInIframe"},
    ]
};

export default formModel;