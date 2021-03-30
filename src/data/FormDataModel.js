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
        // Mandatory
        { name: "MerchantID", area: [1] },
        { name: "MerchantTransactionID", area: [1], tooltip: "Click label to generate a new MTID" },
        { name: "Amount", area: [1] },
        { name: "Currency", area: [1] },
        { name: "ReturnURL", area: [1] },
        { name: "Country", area: [1], tooltip: "Not Mandatory but RECOMMENDED" },
        { name: "Hash", area: [1] },

        // Flow Control
        { name: "MethodID", area: [2] },
        { name: "CustomerEmail", area: [2] },
        { name: "ReferenceNumber", area: [2] },
        { name: "CustomerName", area: [2] },
        { name: "CustomerPhone", area: [2] },
        { name: "Description", area: [2] },
        { name: "SkipHPP", area: [2] },
        { name: "RedirectInIframe", area: [2] },
        { name: "MerchantRedirectInIframe", area: [2] },

        // Optional        
        { name: "SiteID", area: [3] },
        { name: "SkinID", area: [3] },
        { name: "IncludeMethodIDs", area: [3] },
        { name: "ExcludeMethodIDs", area: [3] },
        { name: "PrioritizeMethodIDs", area: [3] },
        { name: "Guaranteed", area: [3] },
        { name: "Language", area: [3] },
        { name: "OriginatorTransactionID", area: [3] },

        // Method Specific
        { name: "MethodOptionID", area: [4] },
        { name: "PayerAmount", area: [4] },
        { name: "Street", area: [4] },
        { name: "StreetNumber", area: [4] },
        { name: "ZipCode", area: [4] },
        { name: "City", area: [4] },
        { name: "State", area: [4] },
        { name: "CustomerAddress", area: [4] },
        { name: "AccountNumber", area: [4] },
        { name: "IBAN", area: [4] },
        { name: "BIC", area: [4] },
        { name: "Company", area: [4] },
        { name: "CustomerSocialSecurityNumber", area: [4] },
        { name: "Articles", area: [4] },
        // Method Specific / Alipay
        { name: "IsOffline", area: [4, 1] },
        { name: "StoreName", area: [4, 1] },
        { name: "StoreID", area: [4, 1] },
        { name: "TerminalID", area: [4, 1] },
        // Method Specific / Cards
        { name: "Installments", area: [4, 2] },
        { name: "CardHolderName", area: [4, 2] },
        { name: "CardType", area: [4, 2] },
        { name: "ExpirationMonth", area: [4, 2] },
        { name: "ExpirationYear", area: [4, 2] },
        { name: "SecurityCode", area: [4, 2] },
        { name: "CustomerCPF", area: [4, 2] },
        { name: "CustomerZipCode", area: [4, 2] },
        // Method Specific / DLocal - India
        { name: "Address", area: [4, 3] },
        // Method Specific / Klarna
        { name: "CustomerFirstName", area: [4, 4] },
        { name: "CustomerLastName", area: [4, 4] },
        { name: "CustomerGender", area: [4, 4] },
        { name: "CustomerDateOfBirth", area: [4, 4] },
        { name: "CustomerBillingAddress", area: [4, 4] },
        { name: "CustomerShippingAddress", area: [4, 4] },
        { name: "CustomerAccountNumber", area: [4, 4] },
        { name: "CustomerBankName", area: [4, 4] },
        // Method Specific / Todito Cash
        { name: "CardNumber", area: [4, 5] },
        { name: "CardPIN", area: [4, 5] },
        // Method Specific / Union Pay
        { name: "Capture", area: [4, 6] },

        // Payouts
        { name: "CustomerBankAccountID", area: [5] },
        { name: "CryptoAddress", area: [5] },
        { name: "CryptoCurrency", area: [5] },
        { name: "ActionName", area: [5] },

        // Recurrent Payments
        { name: "ActionName", area: [6] },
        { name: "MerchantPreapprovalID", area: [6] },
        { name: "PreapprovalDescription", area: [6] },
        { name: "PreapprovalID", area: [6] },
        { name: "PreapprovalReturnURL", area: [6] },
        // Recurrent Payments / Slimpay
        { name: "FirstName", area: [6, 1] },
        { name: "LastName", area: [6, 1] },
        { name: "Email", area: [6, 1] },
        { name: "Phone", area: [6, 1] },
        { name: "ExecutionDate", area: [6, 1] },
        // Recurrent Payments / Skrill
        { name: "PreapprovedMaximumAmount", area: [6, 2] },
        // Recurrent Payments / Pay by mobile (Fortumo)
        { name: "PreapprovedFrequency", area: [6, 3] },

        // Refunds
        { name: "ActionName", area: [7] },
        { name: "InitialPaymentID", area: [7] },
        // Refunds / Extra Parameters
        { name: "InitialPaymentID", area: [7, 1] },
        { name: "BankAccountType", area: [7, 1] },
        { name: "BankAddress", area: [7, 1] },
        { name: "BankAgencyCode", area: [7, 1] },
        { name: "BankCode", area: [7, 1] },
        { name: "BankCountry", area: [7, 1] },
        { name: "BankName", area: [7, 1] },
        { name: "BankSortCode", area: [7, 1] },
        { name: "SWIFTcode", area: [7, 1] },
        { name: "BankSWIFTID", area: [7, 1] },
        { name: "CPFAccountHolder", area: [7, 1] },
        { name: "CustomerAccountNumber", area: [7, 1] },
        { name: "CustomerCity", area: [7, 1] },
        { name: "CustomerCountry", area: [7, 1] },
        { name: "CustomerIBAN", area: [7, 1] },
        // Refunds / Manual Support Work Details Needed
        { name: "THBankAccountNumber", area: [7, 2] },
        { name: "BankBranch", area: [7, 2] },
        { name: "AccountNoIDR", area: [7, 2] },

        // Capture Payments
        { name: "ActionName", area: [8] },
        { name: "InitialPaymentID", area: [8] },

        // Cancel Payments
        { name: "ActionName", area: [9] },
        { name: "InitialPaymentID", area: [9] },
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