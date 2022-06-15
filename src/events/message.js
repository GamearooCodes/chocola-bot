const { Message, Client, Permissions } = require("discord.js")

module.exports = {
    name: 'message',
    /**
     * 
     * @param {Message} message 
     * @param {Client} client 
     */
    async run(message, client, apiclient) {
        if (message.author.bot) return;

        let prefix = 'c.';

        if (!message.content.toLowerCase().startsWith(prefix)) return;

        let args = message.content.substring(prefix.length).split(" ");

        const cmd = args[0].toLowerCase();
        const command = client.commands.get(cmd);
        if (!command) return;
        const permcheck = new Permissions(command.perm);

        if (!message.member.permissions.has(permcheck)) return message.reply(`Missing ${permcheck.toArray()}`);
        let extras = {
            prefix
        }
        if (command.command === "true") return;
        if (command.command === "both") command.both(client, message, args, null, extras, "msg", apiclient);
        else command.msg(client, message, args, extras, apiclient)
    }
}