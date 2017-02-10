'use strict';
ionicApp
.factory('httpInterceptor', ['APP_CONFIG',
function (APP_CONFIG) {
    return {
        request: function (config) {
            if(config.url[0] === '/'){
                config.url = APP_CONFIG.host + config.url;
            }

            return config;
        }
    }
}])
;