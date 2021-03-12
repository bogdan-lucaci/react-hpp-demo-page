import DATA from './DATA_RAW.js';



let _settings = {
    //ignoredIDs: ['ActionName_list', 'addAliPayArticles', 'addKlarnaArticles', 'addYandexArticles', 'addRefundArticles', 'amountToggleON', 'amountToggleOFF', 'Capture_list', 'computedString', 'Country_list', 'Currency_list', 'currencyToggleON', 'currencyToggleOFF', 'displayInsideIframe', 'IframeOverlayMaskSource', 'IsOffline_list', 'MerchantID_list', 'MethodID_list', 'MethodID_sortList', 'MethodOptionID_list', 'noHash', 'pasteImport', 'pasteExport', 'pasteParamsBtn', 'pasteParamsWrap', 'pastedParams', 'pasteBtnApply', 'pasteSave', 'pasteDelete', 'pasteList', 'pasteCreateFromForm', 'pasteActionFeedback', 'pasteExportedData', 'pasteSelectText', 'PostURL', 'PostURL_custom', 'RedirectInIframe_list', 'MerchantRedirectInIframe_list', 's2pOverlayMask', 'SiteID_list', 'SkipHPP_list', 'Signature', 'embed-lightbox', 'sc-IframeOverlayMaskSource', 'sc-iframeEmbedWidth', 'sc-iframeEmbedHeight'],
    ignoredValues: ['', 'undefined', undefined, 'Pay', /* 'NOVALUE' */, null, 'NOVALUE', 'novalue'],
    ignoredValuesForHash: ['NOVALUE', 'novalue']
};

const DATA_ACCESS = {
    // OUT  :   an array of postURL objects
    // [ {"ID":"1" , "DisplayName":"...", "Name":"...", "URL":"..."}, {...}, ... etc ]
    getPostURLs: function() {
        return DATA.postURLs.map(function(elem) {
            return {
                'ID': elem.ID,
                'Name': elem.Name,
                'DisplayName': elem.DisplayName,
                'URL': elem.URL,
            };
        });
    },
    // OUT  :   an array of merchant objects for a given environment:
    // [ {"ID": "...", "Alias": "...", "Signature": "..."}, {...}, ... etc ]
    getMerchantsForEnv: function(envName) {
        let envObj = DATA.postURLs.filter(
            function(item, index, self) {
                return item['Name'] === envName;
            },
        )[0];
        return envObj ? envObj['MerchantID'] : [];
    },
    // OUT  :   an array of site objects for a given environment and merchant id:
    // [ {"MerchantID": "...", "SiteID": "...", "Active": "...", "Signature": "...", "Environment": "..."}, {...}, ... etc ]
    getMerchantSitesForEnvAndMerchantId: function(env, merchantId) {
        return DATA.siteids.filter(
            function(item, index, self) {
                return item['Environment'] === env && item['MerchantID'] == merchantId;
            },
        );
    },
    // OUT  :   an array of method objects:
    // [ {"ID":".." , "DisplayName":"..." , "LogoURL":"..."}, {...}, ... etc ]
    getMethods: function() {
        return DATA.paymentMethods;
    },
    // OUT  :   an array of method option objects for a given merchant id:
    // [ {"ID":"..." , "DisplayName":"...", "MethodID":"...", "LogoURL":"..."}, {...}, ... etc ]
    getMethodOptionsForMethod: function(methodId) {
        return DATA.methodOptions.filter(
            function(item, index, self) {
                return item['MethodID'] == methodId;
            },
        );
    },
    // OUT  :   an array of country objects:
    // [ {"ID":".." , "Code":"...", "Name":"..."}, {...}, ... etc ]
    getCountries: function() {
        return DATA.countries;
    },
    // OUT  :   an array of currency objects:
    // [ {"Code":"..." , "Name":"..." }, {...}, ... etc ]
    getCurrencies: function() {
        return DATA.currencies;
    },
    // OUT  :   an array of custom parameters objects
    // [ {"label":"...", "value":"..."}, {...}, ... etc ]
    getCustomParams: function() {
        return DATA.customParameters;
    },

    // OUT  :   an array of objects containing input's helper's data
    // [ {"id": "...", "val": "..."}]
    getHelperData: function (inputName, envName, merchantId ) {
        //if (inputName === 'SiteID') alert(inputName);
        switch (inputName) {
            case 'Country':
                return (
                    DATA_ACCESS.getCountries().map(country => (
                        {
                            id: country.Code,
                            val: (country.Code + ' | ' + country.Name)
                        }
                    ))
                )
                break;
            case 'Currency':
                return (
                    DATA_ACCESS.getCurrencies().map(currency => (
                        {
                            id: currency.Code,
                            val: (currency.Code + ' | ' + currency.Name)
                        }
                    ))
                )
                break;
            case 'MerchantID':
                return (
                    DATA_ACCESS.getMerchantsForEnv(envName).map(merchant => (
                        {
                            id: merchant.ID,
                            val: (merchant.ID + ' | ' + merchant.Alias)
                        }
                    ))
                )
                break;
            case 'SiteID':
                // console.log(envName, DATA_ACCESS.getMerchantSitesForEnvAndMerchantId('test', '1000').filter(site => site.Active === '1').map(site => (
                //     {
                //         id: site.SiteID,
                //         val: site.SiteID
                //     }
                // )));
                //console.log('--- for ENV:', envName, ', siteID helper has ' + DATA_ACCESS.getMerchantSitesForEnvAndMerchantId(envName, '1000').length + ' values !');
                return (
                    DATA_ACCESS.getMerchantSitesForEnvAndMerchantId(envName, merchantId)
                        .filter(site => site.Active === '1')
                        .map(site => (
                            {
                                id: site.SiteID,
                                val: site.SiteID
                            }
                        ))
                )
                break;
    
            default:
                return []
                break;
    
        }
    
    } 
};

export default DATA_ACCESS;