const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const { utils } = require("ram-api.js");

module.exports = {
    name: 'ping',
    command: 'both',
    description: 'get ping info',
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {*} extras 
     */
    async slash(client, interaction, extras) {
        await interaction.deferReply();

        let b;
        if (Math.round(client.ws.ping) >= 300) b = "true";
        else b = "false"

        let d = 'false';

        if (Math.round(Date.now() - client.pingdate) >= 500) d = "true";

        var ramapiping;

        await utils.ping().then(data => ramapiping = data.ping);

        let c = "false";

        if (Math.round(ramapiping) >= 400) c = "true"

        let embed = new MessageEmbed().setDescription(`Bots ping: {Lag: ${d}, Ping: ${client.ws.ping}ms} \n Discrods api ping: {Lag: ${b}, Ping: ${client.ws.ping}ms} \n Ram api ping: {Lag: ${c}, Ping: ${ramapiping}}`).setColor("RANDOM")

        interaction.editReply({ embeds: [embed] });
    },
    async msg(client, message, args, extras) {
        let b;
        if (Math.round(client.ws.ping) >= 300) b = "true";
        else b = "false"

        let d = 'false';

        if (Math.round(Date.now() - client.pingdate) >= 500) d = "true";

        var ramapiping;

        await utils.ping().then(data => ramapiping = data.ping);

        let c = "false";

        if (Math.round(ramapiping) >= 400) c = "true"

        let embed = new MessageEmbed().setDescription(`Bots ping: {Lag: ${d}, Ping: ${client.ws.ping}ms} \n Discrods api ping: {Lag: ${b}, Ping: ${client.ws.ping}ms} \n Ram api ping: {Lag: ${c}, Ping: ${ramapiping}}`).setColor("RANDOM")

        message.channel.send({ embeds: [embed] });
    }
}