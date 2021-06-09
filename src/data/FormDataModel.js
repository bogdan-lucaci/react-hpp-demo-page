let formModel = {
    areas: [
        { id: 1, name: "Mandatory", collapseFor: [] },
        { id: 2, name: "Flow Control", collapseFor: ["demo", "live"] },
        { id: 3, name: "Optional", collapseFor: ["demo", "live"] },
        {
            id: 4, name: "Method Specific", collapseFor: ["demo", "live"],
            subArea: [
                { id: 41, name: "Alipay" },
                { id: 42, name: "Cards" },
                { id: 43, name: "DLocal - India" },
                { id: 44, name: "Klarna" },
                { id: 45, name: "Todito Cash" },
                { id: 46, name: "Union Pay" },
            ]
        },
        {
            id: 5, name: "Payouts", collapseFor: ["demo", "live"],
            subArea: [
                { id: 51, name: "Interac Instant" }
            ]
        },
        {
            id: 6, name: "Recurrent Payments", collapseFor: ["demo", "live"],
            subArea: [
                { id: 61, name: "SlimPay" },
                { id: 62, name: "Skrill" },
                { id: 63, name: "Pay by mobile (Fortumo)" },
            ]
        },
        {
            id: 7, name: "Refunds", collapseFor: ["demo", "live"],
            subArea: [
                { id: 71, name: "Extra Parameters" },
                { id: 72, name: "Manual Support Work Details Needed" }
            ]
        },
        { id: 8, name: "Capture Payments", collapseFor: ["demo", "live"] },
        { id: 9, name: "Cancel Payments", collapseFor: ["demo", "live"] }
    ],
    params: [
        // Mandatory
        { name: "MerchantID", area: 1 },
        { name: "MerchantTransactionID", onlyFor: ["payment", "payout", "refund"], area: 1, tooltip: "Click label to generate a new MTID" },
        { name: "Amount", onlyFor: ["payment", "payout", "refund", "capture"], area: 1 },
        { name: "Currency", onlyFor: ["payment", "payout"], area: 1 },
        { name: "ReturnURL", onlyFor: ["payment"], area: 1 },
        { name: "Country", onlyFor: ["payment", "payout", "recurrent"], area: 1, tooltip: "Not Mandatory but RECOMMENDED" },
        { name: "Hash", onlyFor: ["payment", "payout"], area: 1 },

        // Flow Control
        { name: "MethodID", onlyFor: ["payment", "payout", "recurrent"], area: 2, tooltip: "Click label to toggle sort by name/id" },
        { name: "CustomerEmail", onlyFor: ["payment", "payout", "recurrent", "refund", "capture"], area: 2 },
        { name: "ReferenceNumber", onlyFor: ["payment"], area: 2 },
        { name: "CustomerName", onlyFor: ["payment", "payout", "recurrent"], area: 2 },
        { name: "CustomerPhone", onlyFor: ["payment", "capture"], area: 2 },
        { name: "Description", onlyFor: ["payment", "recurrent"], area: 2 },
        { name: "SkipHPP", onlyFor: ["payment"], area: 2 },
        { name: "RedirectInIframe", onlyFor: ["payment"], area: 2 },
        { name: "MerchantRedirectInIframe", onlyFor: ["payment"], area: 2 },

        // Optional        
        { name: "SiteID", area: 3 },
        { name: "SkinID", onlyFor: ["payment"], area: 3 },
        { name: "IncludeMethodIDs", onlyFor: ["payment"], area: 3 },
        { name: "ExcludeMethodIDs", onlyFor: ["payment"], area: 3 },
        { name: "PrioritizeMethodIDs", onlyFor: ["payment"], area: 3 },
        { name: "Guaranteed", onlyFor: ["payment"], area: 3 },
        { name: "Language", onlyFor: ["payment"], area: 3 },
        { name: "OriginatorTransactionID", onlyFor: ["payment", "recurrent"], area: 3 },

        // Method Specific
        { name: "MethodOptionID", area: 4, onlyFor: ["payment", "recurrent"] },
        { name: "PayerAmount", area: 4, onlyFor: ["payment"] },
        { name: "Street", area: 4, onlyFor: ["payment", "payout", "recurrent"] },
        { name: "StreetNumber", area: 4, onlyFor: ["payment", "recurrent"] },
        { name: "ZipCode", area: 4, onlyFor: ["payment", "payout", "recurrent"] },
        { name: "City", area: 4, onlyFor: ["payment", "payout", "recurrent"] },
        { name: "State", area: 4, onlyFor: ["payment"] },
        { name: "CustomerAddress", area: 4, onlyFor: ["payment"] },
        { name: "AccountNumber", area: 4, onlyFor: ["payment"] },
        { name: "IBAN", area: 4, onlyFor: ["payment", "payout"] },
        { name: "BIC", area: 4, onlyFor: ["payment"] },
        { name: "Company", area: 4, onlyFor: ["payment", "payout", "capture"] },
        { name: "CustomerSocialSecurityNumber", area: 4, onlyFor: ["payment"] },
        { name: "Articles", area: 4, onlyFor: ["payment", "recurrent", "capture"] },
        // Method Specific / Alipay
        { name: "IsOffline", onlyFor: ["payment"], area: 4, subArea: 41 },
        { name: "StoreName", onlyFor: ["payment"], area: 4, subArea: 41 },
        { name: "StoreID", onlyFor: ["payment"], area: 4, subArea: 41 },
        { name: "TerminalID", onlyFor: ["payment"], area: 4, subArea: 41 },
        // Method Specific / Cards
        { name: "Installments", onlyFor: ["payment"], area: 4, subArea: 42 },
        { name: "CardHolderName", onlyFor: ["payment"], area: 4, subArea: 42 },
        { name: "CardType", onlyFor: ["payment"], area: 4, subArea: 42 },
        { name: "ExpirationMonth", onlyFor: ["payment"], area: 4, subArea: 42 },
        { name: "ExpirationYear", onlyFor: ["payment"], area: 4, subArea: 42 },
        { name: "SecurityCode", onlyFor: ["payment"], area: 4, subArea: 42 },
        { name: "CustomerCPF", onlyFor: ["payment"], area: 4, subArea: 42 },
        { name: "CustomerZipCode", onlyFor: ["payment"], area: 4, subArea: 42 },
        // Method Specific / DLocal - India
        { name: "Address", onlyFor: ["payment"], area: 4, subArea: 43 },
        // Method Specific / Klarna
        { name: "CustomerFirstName", onlyFor: ["payment", "recurrent", "refund", "capture"], area: 4, subArea: 44 },
        { name: "CustomerLastName", onlyFor: ["payment", "recurrent", "refund", "capture"], area: 4, subArea: 44 },
        { name: "CustomerGender", onlyFor: ["payment", "capture"], area: 4, subArea: 44 },
        { name: "CustomerDateOfBirth", onlyFor: ["payment"], area: 4, subArea: 44 },
        { name: "CustomerBillingAddress", onlyFor: ["payment"], area: 4, subArea: 44 },
        { name: "CustomerShippingAddress", onlyFor: ["payment", "capture"], area: 4, subArea: 44 },
        { name: "CustomerAccountNumber", onlyFor: ["payment", "recurrent"], area: 4, subArea: 44 },
        { name: "CustomerBankName", onlyFor: ["payment"], area: 4, subArea: 44 },
        // Method Specific / Todito Cash
        { name: "CardNumber", onlyFor: ["payment"], area: 4, subArea: 45 },
        { name: "CardPIN", onlyFor: ["payment"], area: 4, subArea: 45 },
        // Method Specific / Union Pay
        { name: "Capture", onlyFor: ["payment"], area: 4, subArea: 46 },

        // Payouts
        { name: "ActionName", onlyFor: ["payout"], area: 5 },
        { name: "CustomerBankAccountID", onlyFor: ["payout"], area: 5 },
        { name: "CryptoAddress", onlyFor: ["payout"], area: 5 },
        { name: "CryptoCurrency", onlyFor: ["payout"], area: 5 },
        // Payouts / Interac Instant
        { name: "SecurityQuestion", onlyFor: ["payout"], area: 5, subArea: 51 },
        { name: "SecurityAnswer", onlyFor: ["payout"], area: 5, subArea: 51 },
        { name: "IPAddress", onlyFor: ["payout"], area: 5, subArea: 51 },

        // Recurrent Payments
        { name: "ActionName", onlyFor: ["recurrent"], area: 6 },
        { name: "MerchantPreapprovalID", onlyFor: ["recurrent"], area: 6 },
        { name: "PreapprovalDescription", onlyFor: ["recurrent"], area: 6 },
        { name: "PreapprovalID", onlyFor: ["recurrent"], area: 6 },
        { name: "PreapprovalReturnURL", onlyFor: ["recurrent"], area: 6 },
        // Recurrent Payments / Slimpay
        { name: "FirstName", onlyFor: ["recurrent"], area: 6, subArea: 61 },
        { name: "LastName", onlyFor: ["recurrent"], area: 6, subArea: 61 },
        { name: "Email", onlyFor: ["recurrent"], area: 6, subArea: 61 },
        { name: "Phone", onlyFor: ["recurrent"], area: 6, subArea: 61 },
        { name: "ExecutionDate", onlyFor: ["recurrent"], area: 6, subArea: 61 },
        // Recurrent Payments / Skrill
        { name: "PreapprovedMaximumAmount", onlyFor: ["recurrent"], area: 6, subArea: 62 },
        // Recurrent Payments / Pay by mobile (Fortumo)
        { name: "PreapprovedFrequency", onlyFor: ["recurrent"], area: 6, subArea: 63 },

        // Refunds
        { name: "ActionName", onlyFor: ["refund"], area: 7 },
        { name: "InitialPaymentID", onlyFor: ["refund"], area: 7 },
        // Refunds / Extra Parameters
        { name: "BankAccountType", onlyFor: ["refund"], area: 7, subArea: 71 },
        { name: "BankAddress", onlyFor: ["refund"], area: 7, subArea: 71 },
        { name: "BankAgencyCode", onlyFor: ["refund"], area: 7, subArea: 71 },
        { name: "BankCode", onlyFor: ["refund"], area: 7, subArea: 71 },
        { name: "BankCountry", onlyFor: ["refund"], area: 7, subArea: 71 },
        { name: "BankName", onlyFor: ["refund"], area: 7, subArea: 71 },
        { name: "BankSortCode", onlyFor: ["refund"], area: 7, subArea: 71 },
        { name: "SWIFTcode", onlyFor: ["refund"], area: 7, subArea: 71 },
        { name: "BankSWIFTID", onlyFor: ["refund"], area: 7, subArea: 71 },
        { name: "CPFAccountHolder", onlyFor: ["refund"], area: 7, subArea: 71 },
        { name: "CustomerAccountNumber", onlyFor: ["refund"], area: 7, subArea: 71 },
        { name: "CustomerCity", onlyFor: ["refund"], area: 7, subArea: 71 },
        { name: "CustomerCountry", onlyFor: ["refund"], area: 7, subArea: 71 },
        { name: "CustomerIBAN", onlyFor: ["refund"], area: 7, subArea: 71 },
        // Refunds / Manual Support Work Details Needed
        { name: "THBankAccountNumber", onlyFor: ["refund"], area: 7, subArea: 72 },
        { name: "BankBranch", onlyFor: ["refund"], area: 7, subArea: 72 },
        { name: "AccountNoIDR", onlyFor: ["refund"], area: 7, subArea: 72 },

        // Capture Payments
        { name: "ActionName", onlyFor: ["capture"], area: 8 },
        { name: "InitialPaymentID", onlyFor: ["capture"], area: 8 },

        // Cancel Payments
        { name: "ActionName", onlyFor: ["cancel"], area: 9 },
        { name: "InitialPaymentID", onlyFor: ["cancel"], area: 9 },
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