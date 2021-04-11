let formModel = {
    areas: [
        { id: 1, name: "Mandatory", collapseFor: [] },
        { id: 2, name: "Flow Control", collapseFor: ['demo', 'live'] },
        { id: 3, name: "Optional", collapseFor: ['demo', 'live'] },
        {
            id: 4, name: "Method Specific", collapseFor: ['demo', 'live'], 
            subArea: [
                { id: 41, name: "Alipay" },
                { id: 42, name: "Cards" },
                { id: 43, name: "DLocal - India" },
                { id: 44, name: "Klarna" },
                { id: 45, name: "Todito Cash" },
                { id: 46, name: "Union Pay" },
            ]
        },
        { id: 5, name: "Payouts", collapseFor: ['demo', 'live'] },
        {
            id: 6, name: "Recurrent Payments", collapseFor: ['demo', 'live'],
            subArea: [
                { id: 61, name: "SlimPay" },
                { id: 62, name: "Skrill" },
                { id: 63, name: "Pay by mobile (Fortumo)" },
            ]
        },
        {
            id: 7, name: "Refunds", collapseFor: ['demo', 'live'],
            subArea: [
                { id: 71, name: "Extra Parameters" },
                { id: 72, name: "Manual Support Work Details Needed" }
            ]
        },
        { id: 8, name: "Capture Payments", collapseFor: ['demo', 'live'] },
        { id: 9, name: "Cancel Payments", collapseFor: ['demo', 'live'] }
    ],
    params: [
        // Mandatory
        { name: "MerchantID", area: 1 },
        { name: "MerchantTransactionID", area: 1, tooltip: "Click label to generate a new MTID" },
        { name: "Amount", area: 1 },
        { name: "Currency"/*, onlyFor: ['payment', 'payout']*/, area: 1 },
        { name: "ReturnURL", area: 1 },
        { name: "Country", area: 1, tooltip: "Not Mandatory but RECOMMENDED" },
        { name: "Hash", area: 1 },

        // Flow Control
        { name: "MethodID", area: 2, tooltip: "Click label to toggle sort by name/id" },
        { name: "CustomerEmail", area: 2 },
        { name: "ReferenceNumber", area: 2 },
        { name: "CustomerName", area: 2 },
        { name: "CustomerPhone", area: 2 },
        { name: "Description", area: 2 },
        { name: "SkipHPP", area: 2 },
        { name: "RedirectInIframe", area: 2 },
        { name: "MerchantRedirectInIframe", area: 2 },

        // Optional        
        { name: "SiteID", area: 3 },
        { name: "SkinID", area: 3 },
        { name: "IncludeMethodIDs", area: 3 },
        { name: "ExcludeMethodIDs", area: 3 },
        { name: "PrioritizeMethodIDs", area: 3 },
        { name: "Guaranteed", area: 3 },
        { name: "Language", area: 3 },
        { name: "OriginatorTransactionID", area: 3 },

        // Method Specific
        { name: "MethodOptionID", area: 4 },
        { name: "PayerAmount", area: 4 },
        { name: "Street", area: 4 },
        { name: "StreetNumber", area: 4 },
        { name: "ZipCode", area: 4 },
        { name: "City", area: 4 },
        { name: "State", area: 4 },
        { name: "CustomerAddress", area: 4 },
        { name: "AccountNumber", area: 4 },
        { name: "IBAN", area: 4 },
        { name: "BIC", area: 4 },
        { name: "Company", area: 4 },
        { name: "CustomerSocialSecurityNumber", area: 4 },
        { name: "Articles", area: 4 },
        // Method Specific / Alipay
        { name: "IsOffline", area: 4, subArea: 41 },
        { name: "StoreName", area: 4, subArea: 41 },
        { name: "StoreID", area: 4, subArea: 41 },
        { name: "TerminalID", area: 4, subArea: 41 },
        // Method Specific / Cards
        { name: "Installments", area: 4, subArea: 42 },
        { name: "CardHolderName", area: 4, subArea: 42 },
        { name: "CardType", area: 4, subArea: 42 },
        { name: "ExpirationMonth", area: 4, subArea: 42 },
        { name: "ExpirationYear", area: 4, subArea: 42 },
        { name: "SecurityCode", area: 4, subArea: 42 },
        { name: "CustomerCPF", area: 4, subArea: 42 },
        { name: "CustomerZipCode", area: 4, subArea: 42 },
        // Method Specific / DLocal - India
        { name: "Address", area: 4, subArea: 43 },
        // Method Specific / Klarna
        { name: "CustomerFirstName", area: 4, subArea: 44 },
        { name: "CustomerLastName", area: 4, subArea: 44 },
        { name: "CustomerGender", area: 4, subArea: 44 },
        { name: "CustomerDateOfBirth", area: 4, subArea: 44 },
        { name: "CustomerBillingAddress", area: 4, subArea: 44 },
        { name: "CustomerShippingAddress", area: 4, subArea: 44 },
        { name: "CustomerAccountNumber", area: 4, subArea: 44 },
        { name: "CustomerBankName", area: 4, subArea: 44 },
        // Method Specific / Todito Cash
        { name: "CardNumber", area: 4, subArea: 45 },
        { name: "CardPIN", area: 4, subArea: 45 },
        // Method Specific / Union Pay
        { name: "Capture", area: 4, subArea: 46 },

        // Payouts
        { name: "CustomerBankAccountID", onlyFor: ['payout'], area: 5 },
        { name: "CryptoAddress", onlyFor: ['payout'], area: 5 },
        { name: "CryptoCurrency", onlyFor: ['payout'], area: 5 },
        { name: "ActionName", onlyFor: ['payout'], area: 5 },

        // Recurrent Payments
        { name: "ActionName", onlyFor: ['recurrent'], area: 6 },
        { name: "MerchantPreapprovalID", onlyFor: ['recurrent'], area: 6 },
        { name: "PreapprovalDescription", onlyFor: ['recurrent'], area: 6 },
        { name: "PreapprovalID", onlyFor: ['recurrent'], area: 6 },
        { name: "PreapprovalReturnURL", onlyFor: ['recurrent'], area: 6 },
        // Recurrent Payments / Slimpay
        { name: "FirstName", onlyFor: ['recurrent'], area: 6, subArea: 61 },
        { name: "LastName", onlyFor: ['recurrent'], area: 6, subArea: 61 },
        { name: "Email", onlyFor: ['recurrent'], area: 6, subArea: 61 },
        { name: "Phone", onlyFor: ['recurrent'], area: 6, subArea: 61 },
        { name: "ExecutionDate", onlyFor: ['recurrent'], area: 6, subArea: 61 },
        // Recurrent Payments / Skrill
        { name: "PreapprovedMaximumAmount", onlyFor: ['recurrent'], area: 6, subArea: 62 },
        // Recurrent Payments / Pay by mobile (Fortumo)
        { name: "PreapprovedFrequency", onlyFor: ['recurrent'], area: 6, subArea: 63 },

        // Refunds
        { name: "ActionName", onlyFor: ['refund'], area: 7 },
        { name: "InitialPaymentID", onlyFor: ['refund'], area: 7 },
        // Refunds / Extra Parameters
        { name: "BankAccountType", onlyFor: ['refund'], area: 7, subArea: 71 },
        { name: "BankAddress", onlyFor: ['refund'], area: 7, subArea: 71 },
        { name: "BankAgencyCode", onlyFor: ['refund'], area: 7, subArea: 71 },
        { name: "BankCode", onlyFor: ['refund'], area: 7, subArea: 71 },
        { name: "BankCountry", onlyFor: ['refund'], area: 7, subArea: 71 },
        { name: "BankName", onlyFor: ['refund'], area: 7, subArea: 71 },
        { name: "BankSortCode", onlyFor: ['refund'], area: 7, subArea: 71 },
        { name: "SWIFTcode", onlyFor: ['refund'], area: 7, subArea: 71 },
        { name: "BankSWIFTID", onlyFor: ['refund'], area: 7, subArea: 71 },
        { name: "CPFAccountHolder", onlyFor: ['refund'], area: 7, subArea: 71 },
        { name: "CustomerAccountNumber", onlyFor: ['refund'], area: 7, subArea: 71 },
        { name: "CustomerCity", onlyFor: ['refund'], area: 7, subArea: 71 },
        { name: "CustomerCountry", onlyFor: ['refund'], area: 7, subArea: 71 },
        { name: "CustomerIBAN", onlyFor: ['refund'], area: 7, subArea: 71 },
        // Refunds / Manual Support Work Details Needed
        { name: "THBankAccountNumber", onlyFor: ['refund'], area: 7, subArea: 72 },
        { name: "BankBranch", onlyFor: ['refund'], area: 7, subArea: 72 },
        { name: "AccountNoIDR", onlyFor: ['refund'], area: 7, subArea: 72 },

        // Capture Payments
        { name: "ActionName", onlyFor: ['capture'], area: 8 },
        { name: "InitialPaymentID", onlyFor: ['capture'], area: 8 },

        // Cancel Payments
        { name: "ActionName", onlyFor: ['cancel'], area: 9 },
        { name: "InitialPaymentID", onlyFor: ['cancel'], area: 9 },
    ],
    helpers: [
        { for: "MerchantID" },
        { for: "Currency" },
        { for: "Country" },
        { for: "MethodID" },
        { for: "SiteID" },
        { for: "Capture" },
        { for: "MerchantRedirectInIframe" },
        { for: "RedirectInIframe" },
        { for: "SkipHPP" },
        { for: "IsOffline" },
        { for: "Articles" },
        { for: "ActionName" },
    ]
};

export default formModel;