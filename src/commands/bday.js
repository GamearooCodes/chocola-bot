const { MessageEmbed } = require("discord.js");
const { APiClient } = require("ram-api.js");



module.exports = {
    name: 'bday',
    description: 'get a happy bday',
    command: 'false',
    /**
     * 
     * @param {*} client 
     * @param {*} message 
     * @param {*} args 
     * @param {*} extras 
     * @param {APiClient} apiclient
     */
    async msg(client, message, args, extras, apiclient) {
        apiclient.bday("english").then(data => {

            const embed = new MessageEmbed();
            embed.setDescription(data.text);
            embed.setImage(data.url);
            embed.setColor("RANDOM");

            message.reply({ embeds: [embed] })
        })
    }
}