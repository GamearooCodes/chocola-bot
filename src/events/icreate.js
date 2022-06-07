const { Client, CommandInteraction, Permissions } = require("discord.js");
const { beta } = require("../../config");

module.exports = {
    name: 'int',
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
    async run(client, interaction) {
        const { commandName } = interaction;

        if (!interaction.isCommand()) return;

        let command = client.commands.get(commandName);

        let commands = client.application.commands;

        let devguild;

        if (beta) devguild = client.guilds.cache.get('936050113602793483');

        if (beta) commands = devguild.commands;

        if (!command || command.command === 'false') {
            interaction.reply(`This command is ether removed or is msg only so i removed it`);

            commands.delete(interaction.commandId).then(cmd => console.log(`removed ${commandName} from slash`))
        }

        const permcheck = new Permissions(command.perm);

        if (!interaction.member.permissions.has(permcheck)) return interaction.reply({ content: `Missing ${permcheck.toArray().join(", ")}`, ephemeral: true });

        let extras = {};
        if (command.command === "both") command.both(client, null, null, interaction, extras, "int");
        else command.slash(client, interaction, extras);
    }
}