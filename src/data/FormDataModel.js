let formModel = {
    areas: [
        { id: 1, name: "Mandatory", collapseFor: [] },
        { id: 2, name: "Flow Control", collapseFor: ['demo', 'live'] },
        { id: 3, name: "Optional", collapseFor: ['demo', 'live'] },
        {
            id: 4, name: "Method Specific", collapseFor: ['demo', 'live'], 
            subArea: [
                { id: 1, name: "Alipay" },
                { id: 2, name: "Cards" },
                { id: 3, name: "DLocal - India" },
                { id: 4, name: "Klarna" },
                { id: 5, name: "Todito Cash" },
                { id: 6, name: "Union Pay" },
            ]
        },
        { id: 5, name: "Payouts", collapseFor: ['demo', 'live'] },
        {
            id: 6, name: "Recurrent Payments", collapseFor: ['demo', 'live'],
            subArea: [
                { id: 1, name: "SlimPay" },
                { id: 2, name: "Skrill" },
                { id: 3, name: "Pay by mobile (Fortumo)" },
            ]
        },
        {
            id: 7, name: "Refunds", collapseFor: ['demo', 'live'],
            subArea: [
                { id: 1, name: "Extra Parameters" },
                { id: 2, name: "Manual Support Work Details Needed" }
            ]
        },
        { id: 8, name: "Capture Payments", collapseFor: ['demo', 'live'] },
        { id: 9, name: "Cancel Payments", collapseFor: ['demo', 'live'] }
    ],
    params: [
        //{name: "Post URL", isPaymentParam: false, area: [1]},
        // Mandatory
        { name: "MerchantID", isPaymentParam: true, area: [1] },
        { name: "Signature", isPaymentParam: false, area: [1] }, // comment if we want to remove it from form
        { name: "MerchantTransactionID", isPaymentParam: true, area: [1], tooltip: "Click label to generate a new MTID" },
        { name: "Amount", isPaymentParam: true, area: [1] },
        { name: "Currency", isPaymentParam: true, area: [1] },
        { name: "ReturnURL", isPaymentParam: true, area: [1] },
        { name: "Country", isPaymentParam: true, area: [1], tooltip: "Not Mandatory but RECOMMENDED" },
        { name: "Hash", isPaymentParam: true, area: [1] },
        //{ name: "ComputedString", isPaymentParam: false, area: [1] },

        // Flow Control
        { name: "MethodID", isPaymentParam: true, area: [2] },
        { name: "CustomerEmail", isPaymentParam: true, area: [2] },
        { name: "ReferenceNumber", isPaymentParam: true, area: [2] },
        { name: "CustomerName", isPaymentParam: true, area: [2] },
        { name: "CustomerPhone", isPaymentParam: true, area: [2] },
        { name: "Description", isPaymentParam: true, area: [2] },
        { name: "SkipHPP", isPaymentParam: true, area: [2] },
        { name: "RedirectInIframe", isPaymentParam: true, area: [2] },
        { name: "MerchantRedirectInIframe", isPaymentParam: true, area: [2] },
        { name: "DisplayInsideIframe", isPaymentParam: false, area: [2] },
        { name: "IframeOverlaySource", isPaymentParam: false, area: [2] },

        // Optional        
        { name: "SiteID", isPaymentParam: true, area: [3] },
        { name: "SkinID", isPaymentParam: true, area: [3] },
        { name: "IncludeMethodIDs", isPaymentParam: true, area: [3] },
        { name: "ExcludeMethodIDs", isPaymentParam: true, area: [3] },
        { name: "PrioritizeMethodIDs", isPaymentParam: true, area: [3] },
        { name: "Guaranteed", isPaymentParam: true, area: [3] },
        { name: "Language", isPaymentParam: true, area: [3] },
        { name: "OriginatorTransactionID", isPaymentParam: true, area: [3] },

        // Method Specific
        { name: "MethodOptionID", isPaymentParam: true, area: [4] },
        { name: "PayerAmount", isPaymentParam: true, area: [4] },
        { name: "Street", isPaymentParam: true, area: [4] },
        { name: "StreetNumber", isPaymentParam: true, area: [4] },
        { name: "ZipCode", isPaymentParam: true, area: [4] },
        { name: "City", isPaymentParam: true, area: [4] },
        { name: "State", isPaymentParam: true, area: [4] },
        { name: "CustomerAddress", isPaymentParam: true, area: [4] },
        { name: "AccountNumber", isPaymentParam: true, area: [4] },
        { name: "IBAN", isPaymentParam: true, area: [4] },
        { name: "BIC", isPaymentParam: true, area: [4] },
        { name: "Company", isPaymentParam: true, area: [4] },
        { name: "CustomerSocialSecurityNumber", isPaymentParam: true, area: [4] },
        { name: "Articles", isPaymentParam: true, area: [4] },
        // Method Specific / Alipay
        { name: "IsOffline", isPaymentParam: true, area: [4, 1] },
        { name: "StoreName", isPaymentParam: true, area: [4, 1] },
        { name: "StoreID", isPaymentParam: true, area: [4, 1] },
        { name: "TerminalID", isPaymentParam: true, area: [4, 1] },
        // Method Specific / Cards
        { name: "Installments", isPaymentParam: true, area: [4, 2] },
        { name: "CardHolderName", isPaymentParam: true, area: [4, 2] },
        { name: "CardType", isPaymentParam: true, area: [4, 2] },
        { name: "ExpirationMonth", isPaymentParam: true, area: [4, 2] },
        { name: "ExpirationYear", isPaymentParam: true, area: [4, 2] },
        { name: "SecurityCode", isPaymentParam: true, area: [4, 2] },
        { name: "CustomerCPF", isPaymentParam: true, area: [4, 2] },
        { name: "CustomerZipCode", isPaymentParam: true, area: [4, 2] },
        // Method Specific / DLocal - India
        { name: "Address", isPaymentParam: true, area: [4, 3] },
        // Method Specific / Klarna
        { name: "CustomerFirstName", isPaymentParam: true, area: [4, 4] },
        { name: "CustomerLastName", isPaymentParam: true, area: [4, 4] },
        { name: "CustomerGender", isPaymentParam: true, area: [4, 4] },
        { name: "CustomerDateOfBirth", isPaymentParam: true, area: [4, 4] },
        { name: "CustomerBillingAddress", isPaymentParam: true, area: [4, 4] },
        { name: "CustomerShippingAddress", isPaymentParam: true, area: [4, 4] },
        { name: "CustomerAccountNumber", isPaymentParam: true, area: [4, 4] },
        { name: "CustomerBankName", isPaymentParam: true, area: [4, 4] },
        // Method Specific / Todito Cash
        { name: "CardNumber", isPaymentParam: true, area: [4, 5] },
        { name: "CardPIN", isPaymentParam: true, area: [4, 5] },
        // Method Specific / Union Pay
        { name: "Capture", isPaymentParam: true, area: [4, 6] },

        // Payouts
        { name: "CustomerBankAccountID", isPaymentParam: true, area: [5] },
        { name: "CryptoAddress", isPaymentParam: true, area: [5] },
        { name: "CryptoCurrency", isPaymentParam: true, area: [5] },
        { name: "ActionName", isPaymentParam: true, area: [5] },

        // Recurrent Payments
        { name: "ActionName", isPaymentParam: true, area: [6] },
        { name: "MerchantPreapprovalID", isPaymentParam: true, area: [6] },
        { name: "PreapprovalDescription", isPaymentParam: true, area: [6] },
        { name: "PreapprovalID", isPaymentParam: true, area: [6] },
        { name: "PreapprovalReturnURL", isPaymentParam: true, area: [6] },
        // Recurrent Payments / Slimpay
        { name: "FirstName", isPaymentParam: true, area: [6, 1] },
        { name: "LastName", isPaymentParam: true, area: [6, 1] },
        { name: "Email", isPaymentParam: true, area: [6, 1] },
        { name: "Phone", isPaymentParam: true, area: [6, 1] },
        { name: "ExecutionDate", isPaymentParam: true, area: [6, 1] },
        // Recurrent Payments / Skrill
        { name: "PreapprovedMaximumAmount", isPaymentParam: true, area: [6, 2] },
        // Recurrent Payments / Pay by mobile (Fortumo)
        { name: "PreapprovedFrequency", isPaymentParam: true, area: [6, 3] },

        // Refunds
        { name: "ActionName", isPaymentParam: true, area: [7] },
        { name: "InitialPaymentID", isPaymentParam: true, area: [7] },
        // Refunds / Extra Parameters
        { name: "InitialPaymentID", isPaymentParam: true, area: [7, 1] },
        { name: "BankAccountType", isPaymentParam: true, area: [7, 1] },
        { name: "BankAddress", isPaymentParam: true, area: [7, 1] },
        { name: "BankAgencyCode", isPaymentParam: true, area: [7, 1] },
        { name: "BankCode", isPaymentParam: true, area: [7, 1] },
        { name: "BankCountry", isPaymentParam: true, area: [7, 1] },
        { name: "BankName", isPaymentParam: true, area: [7, 1] },
        { name: "BankSortCode", isPaymentParam: true, area: [7, 1] },
        { name: "SWIFTcode", isPaymentParam: true, area: [7, 1] },
        { name: "BankSWIFTID", isPaymentParam: true, area: [7, 1] },
        { name: "CPFAccountHolder", isPaymentParam: true, area: [7, 1] },
        { name: "CustomerAccountNumber", isPaymentParam: true, area: [7, 1] },
        { name: "CustomerCity", isPaymentParam: true, area: [7, 1] },
        { name: "CustomerCountry", isPaymentParam: true, area: [7, 1] },
        { name: "CustomerIBAN", isPaymentParam: true, area: [7, 1] },
        // Refunds / Manual Support Work Details Needed
        { name: "THBankAccountNumber", isPaymentParam: true, area: [7, 2] },
        { name: "BankBranch", isPaymentParam: true, area: [7, 2] },
        { name: "AccountNoIDR", isPaymentParam: true, area: [7, 2] },

        // Capture Payments
        { name: "ActionName", isPaymentParam: true, area: [8] },
        { name: "InitialPaymentID", isPaymentParam: true, area: [8] },

        // Cancel Payments
        { name: "ActionName", isPaymentParam: true, area: [9] },
        { name: "InitialPaymentID", isPaymentParam: true, area: [9] },
    ],
    helpers: [
        { for: "MerchantID" },
        { for: "Currency" },
        { for: "Country" },
        { for: "MethodID" },
        { for: "SkipHPP" },
        { for: "RedirectInIframe" },
        { for: "MerchantRedirectInIframe" },
        { for: "SiteID" },
        { for: "Articles" },
        { for: "IsOffline" },
        { for: "Capture" },
        { for: "ActionName" },
    ]
};

export default formModel;