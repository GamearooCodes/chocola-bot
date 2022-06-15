const { APiClient } = require("ram-api.js");


module.exports = {
    name: 'ready',
    /**
     * 
     * @param {APiClient} apiclient 
     */
    async run(apiclient) {
        console.log('ready  ')

        apiclient.version_check();
    }
}