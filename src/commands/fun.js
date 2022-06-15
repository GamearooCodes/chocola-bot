const { Permissions, Client, CommandInteraction, MessageEmbed } = require("discord.js");
const { APiClient } = require("ram-api.js");


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
     * @param {APiClient} apiclient
     */
    async slash(client, interaction, extras, apiclient) {
        let cmd = interaction.options.getSubcommand();

        switch (cmd) {
            case 'bday':
                apiclient.bday("english").then(data => {
                    const embed = new MessageEmbed();
                    embed.setDescription(data.text);
                    embed.setImage(data.url);
                    embed.setColor("RANDOM");

                    interaction.reply({ embeds: [embed] })
                })
                break;
            case "nekoparaimg":
                apiclient.nekopara().then(data => {
                    let embed2 = new MessageEmbed().setImage(data.url).setColor("RANDOM");

                    interaction.reply({ embeds: [embed2] })
                })
                break;
            case "hello": {
                apiclient.hello("english").then(data => {
                    interaction.reply(data.text);
                })
            }
        }
    },


}