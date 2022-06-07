const { Client, CommandInteraction, Permissions } = require("discord.js");
const { fun } = require("ram-api.js");
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
     */
    async slash(client, interaction, extras) {
        let lang = interaction.options.getString('language') || 'english';

        console.log(lang)

        fun.hello(apiversion, apikey, lang).then(data => {
            interaction.reply(data.text);
        })
    },
    async msg(client, message, args, extras) {
        let lang = args[1] || 'english';

        fun.hello(apiversion, apikey, lang).then(data => {
            message.reply(data.text)
        })


    }
}

