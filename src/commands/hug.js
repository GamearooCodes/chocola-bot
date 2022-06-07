const { MessageEmbed, Client, Message, CommandInteraction } = require("discord.js")
const { fun } = require("ram-api.js")
const { apiversion, apikey } = require("../../config")

module.exports = {
    name: 'hug',
    command: 'both',
    options: [
        {
            name: 'user',
            description: 'the user to hug',
            type: 'USER',
            required: true
        }
    ],
    description: 'hug a member',
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {*} args 
     * @param {*} extras 
     */

    async msg(client, message, args, extras) {
        let member = message.mentions.members.first() || message.member
        fun.hug(apiversion, apikey).then(data => {
            let embed = new MessageEmbed();

            embed.setDescription(`${message.author} hug ${member}`);
            embed.setImage(data.url);

            message.channel.send({ embeds: [embed] })
        })
    },
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {*} extras 
     */
    async slash(client, interaction, extras) {
        let member = interaction.options.getMember('user')
        fun.hug(apiversion, apikey).then(data => {
            let embed = new MessageEmbed();

            embed.setDescription(`${interaction.member} hug ${member}`);
            embed.setImage(data.url);

            interaction.reply({ embeds: [embed] })
        })
    }
}