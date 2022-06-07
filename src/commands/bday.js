const { MessageEmbed } = require("discord.js");
const { fun } = require("ram-api.js")
const { apiversion, apikey } = require("../../config")

module.exports = {
    name: 'bday',
    description: 'get a happy bday',
    command: 'false',
    async msg(client, message, args, extras) {
        fun.birthday(apiversion, apikey, "english").then(data => {

            const embed = new MessageEmbed();
            embed.setDescription(data.text);
            embed.setImage(data.url);
            embed.setColor("RANDOM");

            message.reply({ embeds: [embed] })
        })
    }
}