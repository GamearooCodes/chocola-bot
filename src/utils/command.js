const { readdirSync } = require("fs")
const { Client } = require('discord.js');
const { beta } = require("../../config");

/**
 * 
 * @param {Client} client 
 */
module.exports = (client) => {
    const commands2 = readdirSync("./src/commands").filter((f) => f.endsWith('.js'));

    let commands = client.application.commands;

    if (beta) commands = client.guilds.cache.get('936050113602793483').commands;



    for (let file of commands2) {
        let command = require(`../commands/${file}`);

        client.commands.set(command.name, command);

        if (command.command === "true") {
            let { name, options, description } = command;

            commands?.create({
                name,
                description,
                options,
            })

            console.log(`Loaded command ${name} as slash command`)

        }
        if (command.command === "both") {
            let { name, options, description } = command;

            commands?.create({
                name,
                description,
                options,
            })

            console.log(`Loaded command ${command.name} as slash & msg command`)
        }
        if (command.command === "false") {
            console.log(`Loaded command ${command.name} as msg cmd`)
        }
    }
}