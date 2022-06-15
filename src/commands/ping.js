const { Client, CommandInteraction, MessageEmbed, Message } = require("discord.js");
const { utils, APiClient } = require("ram-api.js");

module.exports = {
    name: 'ping',
    command: 'both',
    description: 'get ping info',

    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {*} args 
     * @param {CommandInteraction} interaction 
     * @param {*} extras 
     * @param {APiClient} apiclient
     */
    async both(client, message, args, interaction, extras, type, apiclient) {

        let b;
        if (Math.round(client.ws.ping) >= 300) b = "true";
        else b = "false"

        let d = 'false';

        if (Math.round(Date.now() - client.pingdate) >= 500) d = "true";

        var ramapiping;

        await apiclient.ping().then(data => ramapiping = data.ping);

        let c = "false";

        if (Math.round(ramapiping) >= 400) c = "true"

        let embed = new MessageEmbed().setDescription(`Bots ping: {Lag: ${d}, Ping: ${client.ws.ping}ms} \n Discrods api ping: {Lag: ${b}, Ping: ${client.ws.ping}ms} \n Ram api ping: {Lag: ${c}, Ping: ${ramapiping}}`).setColor("RANDOM")

        if (type === "msg") message.channel.send({ embeds: [embed] });
        if (type === "int") interaction.reply({ embeds: [embed] })
    }
}