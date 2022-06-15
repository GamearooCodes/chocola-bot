const { MessageEmbed } = require('discord.js');
const { images, utils, APiClient } = require('ram-api.js');
const { apiversioncheck } = require('ram-api.js/oldcode');
const { apikey, apiversion } = require('../../config');
module.exports = {
    name: "nekopara",
    description: 'get a nekopara image',
    command: 'false',
    /**
     * 
     * @param {*} client 
     * @param {*} message 
     * @param {*} args 
     * @param {*} extras 
     * @param {APiClient} apiclient 
     * @returns 
     */
    async msg(client, message, args, extras, apiclient) {
        let data = await apiclient.nekopara().catch(err => {

            return message.reply(`Opps.... sorry something went wrong try again later.....`)
        });

        if (!data) return console.log('ERROR');

        let embed2 = new MessageEmbed().setImage(data.url).setColor("RANDOM");

        message.channel.send({ embeds: [embed2] })
    }
}