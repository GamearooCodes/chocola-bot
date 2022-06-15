const { Client, CommandInteraction, Permissions } = require("discord.js");
const { fun, APiClient } = require("ram-api.js");
const { apiversion, apikey } = require("../../config");

module.exports = {
    name: 'hello',
    command: 'false',
    description: 'Gets you a hello',
    options: [
        {
            name: 'language',
            type: 'STRING',
            description: 'the language to post as',
            required: false,
            choices: [
                {
                    name: 'english',
                    value: 'english'
                },
                {
                    name: 'spanish',
                    value: 'spanish'
                }
            ]
        }
    ],
    perm: Permissions.FLAGS.SEND_MESSAGES,
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {*} extras 
     * @param {APiClient} apiclient
     */

    async msg(client, message, args, extras, apiclient) {
        let lang = args[1] || 'english';

        apiclient.hello("english").then(data => {
            message.reply(data.text)
        })


    }
}

