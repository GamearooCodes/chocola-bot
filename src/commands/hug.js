const { MessageEmbed, Client, Message, CommandInteraction } = require("discord.js")
const { fun, APiClient } = require("ram-api.js")
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
     * @param {CommandInteraction} interaction 
     * @param {*} extras 
     * @param {*} type 
     * @param {APiClient} apiclient
     */
    async both(client, message, args, interaction, extras, type, apiclient) {
        let member;
        let asker;

        if (type === "int") {
            member = interaction.options.getMember('user');
            asker = interaction.member
        }
        if (type === "msg") {
            member = message.mentions.members.first() || message.guild.members.fetch(args[1]) || message.member;

            asker = message.author
        }


        let response = interaction;

        if (type === "msg") response = message;

        if (!member) return response.reply("Member not found!");

        apiclient.hug().then(data => {
            let embed = new MessageEmbed().setDescription(`${asker} Hugs ${member}`).setImage(data.url);

            response.reply({ embeds: [embed] })
        })

    }
}