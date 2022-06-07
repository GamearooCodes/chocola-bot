const { info } = require("ram-api.js");
const { apiversion } = require("../../config");

module.exports = {
    name: 'ready',
    async run() {
        console.log('ready  ')

        info.version_check(apiversion);
    }
}