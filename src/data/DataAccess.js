import DATA from './DATA_RAW.js';

// let _settings = {
//     //ignoredIDs: ['ActionName_list', 'addAliPayArticles', 'addKlarnaArticles', 'addYandexArticles', 'addRefundArticles', 'amountToggleON', 'amountToggleOFF', 'Capture_list', 'computedString', 'Country_list', 'Currency_list', 'currencyToggleON', 'currencyToggleOFF', 'displayInsideIframe', 'IframeOverlayMaskSource', 'IsOffline_list', 'MerchantID_list', 'MethodID_list', 'MethodID_sortList', 'MethodOptionID_list', 'noHash', 'pasteImport', 'pasteExport', 'pasteParamsBtn', 'pasteParamsWrap', 'pastedParams', 'pasteBtnApply', 'pasteSave', 'pasteDelete', 'pasteList', 'pasteCreateFromForm', 'pasteActionFeedback', 'pasteExportedData', 'pasteSelectText', 'PostURL', 'PostURL_custom', 'RedirectInIframe_list', 'MerchantRedirectInIframe_list', 's2pOverlayMask', 'SiteID_list', 'SkipHPP_list', 'Signature', 'embed-lightbox', 'sc-IframeOverlayMaskSource', 'sc-iframeEmbedWidth', 'sc-iframeEmbedHeight'],
//     ignoredValues: ['', 'undefined', undefined, 'Pay', /* 'NOVALUE' */, null, 'NOVALUE', 'novalue'],
//     ignoredValuesForHash: ['NOVALUE', 'novalue']
// };

const DATA_ACCESS = {
    // OUT  :   an array of postURL objects
    // [ {"ID":"1" , "DisplayName":"...", "Name":"...", "URL":"..."}, {...}, ... etc ]
    getPostURLs: function () {
        return DATA.postURLs.map(function (elem) {
            return {
                'ID': elem.ID,
                'Name': elem.Name,
                'DisplayName': elem.DisplayName,
                'URL': elem.URL,
            };
        });
    },
    // OUT  :   an object containing the post Url data for a given post URL name
    getPostURLByName: name => DATA_ACCESS.getPostURLs().find(postUrl => postUrl.Name.toLowerCase() === name.toLowerCase()),
    // OUT  :   an array of merchant objects for a given environment:
    // [ {"ID": "...", "Alias": "...", "Signature": "..."}, {...}, ... etc ]
    getMerchantsForEnv: function (envName) {
        let envObj = DATA.postURLs.filter(
            function (item, index, self) {
                return item['Name'] === envName;
            },
        )[0];
        return envObj ? envObj['MerchantID'] : [];
    },
    // OUT  :   an array of site objects for a given environment and merchant id:
    // [ {"MerchantID": "...", "SiteID": "...", "Active": "...", "Signature": "...", "Environment": "..."}, {...}, ... etc ]
    getMerchantSitesForEnvAndMerchantId: function (env, merchantId) {
        return DATA.siteids.filter(
            function (item, index, self) {
                return item['Environment'] === env && item['MerchantID'] === merchantId;
            },
        );
    },
    // OUT  :   an array of method objects:
    // [ {"ID":".." , "DisplayName":"..." , "LogoURL":"..."}, {...}, ... etc ]
    getMethods: function () {
        return DATA.paymentMethods;
    },
    // OUT  :   an array of method option objects for a given merchant id:
    // [ {"ID":"..." , "DisplayName":"...", "MethodID":"...", "LogoURL":"..."}, {...}, ... etc ]
    getMethodOptionsForMethod: function (methodId) {
        return DATA.methodOptions.filter(
            function (item, index, self) {
                return item['MethodID'] === methodId;
            },
        );
    },
    // OUT  :   an array of country objects:
    // [ {"ID":".." , "Code":"...", "Name":"..."}, {...}, ... etc ]
    getCountries: function () {
        return DATA.countries;
    },
    // OUT  :   an array of currency objects:
    // [ {"Code":"..." , "Name":"..." }, {...}, ... etc ]
    getCurrencies: function () {
        return DATA.currencies;
    },
    // OUT  :   an array of custom parameters objects
    // [ {"label":"...", "value":"..."}, {...}, ... etc ]
    getCustomParams: function () {
        return DATA.customParameters;
    },

    // OUT  :   a string containing site's signature if present OR merchant's signature 
    getSignatureForEnvAndMerchantAndSite: (envName, merchantId, siteId) => {
        if (envName) {
            const merchant = DATA_ACCESS.getMerchantsForEnv(envName)
                .find(merchant => merchant.ID === merchantId);
            const site = DATA_ACCESS.getMerchantSitesForEnvAndMerchantId(envName, merchantId)
                .find(site => site.SiteID === siteId);

            if (siteId) {
                return (site && site['Signature']) || (merchant && merchant['Signature']);
            }
            else if (merchantId)
                return (merchant && merchant['Signature']) || '';
            else
                return '';
        }
        else
            return '';
    },
    // OUT  :   an array of objects containing input's helper's data
    // [ {"id": "...", "val": "..."}]
    getHelperData: function (inputName, envName, merchantId, transactionType) {
        //if (inputName === 'SiteID') alert(inputName);
        switch (inputName) {
            case 'MerchantID':
                return (
                    DATA_ACCESS.getMerchantsForEnv(envName).map(merchant => (
                        {
                            id: merchant.ID,
                            val: merchant.ID,
                            displayVal: (merchant.ID + ' | ' + merchant.Alias)
                        }
                    ))
                )
            case 'Currency':
                return (
                    DATA_ACCESS.getCurrencies().map(currency => (
                        {
                            id: currency.Code,
                            val: currency.Code,
                            displayVal: (currency.Code + ' | ' + currency.Name)
                        }
                    ))
                )
            case 'Country':
                return (
                    DATA_ACCESS.getCountries().map(country => (
                        {
                            id: country.Code,
                            val: country.Code,
                            displayVal: (country.Code + ' | ' + country.Name)
                        }
                    ))
                )
            case 'MethodID':
                return (
                    DATA_ACCESS.getMethods().map(method => (
                        {
                            id: method.ID,
                            val: method.ID,
                            displayVal: `${method.DisplayName} (${method.ID})`,
                            dataSet: [{ key: 'logourl', val: method.LogoURL }]
                        }
                    ))
                )
            case 'SiteID':
                return (
                    DATA_ACCESS.getMerchantSitesForEnvAndMerchantId(envName, merchantId)
                        .filter(site => site.Active === '1')
                        .map(site => (
                            {
                                id: site.SiteID,
                                val: site.SiteID,
                                displayVal: site.SiteID
                            }
                        ))
                )
            case 'Capture':
            case 'MerchantRedirectInIframe':
            case 'RedirectInIframe':
            case 'SkipHPP':
                return ([
                    { id: 101, val: '0', displayVal: '0' },
                    { id: 102, val: '1', displayVal: '1' },
                ])
            case 'IsOffline':
                return ([
                    { id: 201, val: 'true', displayVal: 'true' },
                    { id: 202, val: 'false', displayVal: 'false' },
                ])
            case 'Articles':
                return ([
                    {
                        id: 301,
                        val: 'Name=Metro Exodus - Gold Edition&Quantity=1;Name=Dragon Age™: Origins - Ultimate Edition&Quantity=1',
                        displayVal: 'AliPay'
                    },
                    {
                        id: 302,
                        val: 'ID=1&Quantity=1&Name=Nikon 35mm&Price=60&Type=5&TaxType=1&MerchantArticleID=123;ID=2&Quantity=2&Name=Trepied&Price=20&Type=5&MerchantArticleID=124',
                        displayVal: 'Klarna'
                    },
                    {
                        id: 303,
                        val: 'ID=1&Quantity=1&Name=Nikon 35mm&Price=60&Type=5&TaxType=1&MerchantArticleID=123;ID=2&Quantity=2&Name=Trepied&Price=20&Type=5&TaxType=1&MerchantArticleID=124',
                        displayVal: 'Yandex'
                    },
                    {
                        id: 304,
                        val: 'ID=1&Quantity=1;ID=2&Quantity=2',
                        displayVal: 'Refund'
                    }
                ])
            case 'ActionName':
                switch (transactionType) {
                    case 'payout':
                        return ([{ id: 401, val: 'InitiatePayout', displayVal: 'InitiatePayout' }])
                    case 'recurrent':
                        return ([
                            { id: 501, val: 'OpenPreapproval', displayVal: 'OpenPreapproval' },
                            { id: 502, val: 'GetPreapprovalStatus', displayVal: 'GetPreapprovalStatus' },
                            { id: 503, val: 'UpdatePreapproval', displayVal: 'UpdatePreapproval' },
                            { id: 504, val: 'ClosePreapproval', displayVal: 'ClosePreapproval' },
                            { id: 505, val: 'InitiateRecurrentPayment', displayVal: 'InitiateRecurrentPayment' }
                        ])
                    case 'refund':
                        return ([{ id: 601, val: 'InitiateRefund', displayVal: 'InitiateRefund' }])
                    case 'capture':
                        return ([{ id: 701, val: 'CapturePayment', displayVal: 'CapturePayment' }])
                    case 'cancel':
                        return ([{ id: 801, val: 'CancelPayment', displayVal: 'CancelPayment' }])
                }
            default:
                return []

        }

    }
};

export default DATA_ACCESS;