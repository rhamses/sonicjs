var eventBusService = require('./event-bus.service');
   
var baseUrl;
var pageContent;

module.exports = globalService = {


    startup: async function () {
        eventBusService.on('requestBegin', async function (options) {
            // console.log('global startup')
            if(options){
                baseUrl = `${options.req.protocol}://${options.req.headers.host}`;
            }
        });
    },

    getBaseUrl: function () {
        return baseUrl;
    }

}