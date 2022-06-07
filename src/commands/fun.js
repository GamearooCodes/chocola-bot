const { Permissions, Client, CommandInteraction, MessageEmbed } = require("discord.js");
const { fun, images } = require("ram-api.js");
const { apiversion, apikey } = require("../../config");

module.exports = {
    name: 'fun',
    command: 'true',
    description: 'get the fun commands',
    options: [
        {
            name: 'bday',
            description: 'get a happy bday from the bot',
            type: 'SUB_COMMAND',
        },
        {
            name: 'nekoparaimg',
            description: 'get a nekopara image',
            type: 'SUB_COMMAND'
        },
        {
            name: 'hello',
            description: 'get a hello',
            type: 'SUB_COMMAND'
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
        let cmd = interaction.options.getSubcommand();

        switch (cmd) {
            case 'bday':
                fun.birthday(apiversion, apikey, 'english').then(data => {
                    const embed = new MessageEmbed();
                    embed.setDescription(data.text);
                    embed.setImage(data.url);
                    embed.setColor("RANDOM");

                    interaction.reply({ embeds: [embed] })
                })
                break;
            case "nekoparaimg":
                images.nekopara(apiversion, apikey).then(data => {
                    let embed2 = new MessageEmbed().setImage(data.url).setColor("RANDOM");

                    interaction.reply({ embeds: [embed2] })
                })
                break;
            case "hello": {
                fun.hello(apiversion, apikey, "english").then(data => {
                    interaction.reply(data.text);
                })
            }
        }
    },
    async msg(client, message, args, extras) {
        let cmd = args[1].toLowerCase();

        switch (cmd) {
            case 'bday':
                fun.birthday(apiversion, apikey, 'english').then(data => {
                    const embed = new MessageEmbed();
                    embed.setDescription(data.text);
                    embed.setImage(data.url);
                    embed.setColor("RANDOM");

                    message.reply({ embeds: [embed] })
                })
                break;
            case "nekoparaimg":
                images.nekopara(apiversion, apikey).then(data => {
                    let embed2 = new MessageEmbed().setImage(data.url).setColor("RANDOM");

                    message.reply({ embeds: [embed2] })
                })
                break;
        }
    }
}