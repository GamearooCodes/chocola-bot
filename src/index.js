const { Client, Intents, Collection } = require("discord.js");
const { APiClient } = require('ram-api.js');
const { apiversion, apikey, token } = require("../config");
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_BANS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
        Intents.FLAGS.GUILD_WEBHOOKS,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_VOICE_STATES,
        Intents.FLAGS.DIRECT_MESSAGES,
        Intents.FLAGS.GUILD_INVITES,
        Intents.FLAGS.GUILD_INTEGRATIONS,
        Intents.FLAGS.GUILD_MESSAGE_TYPING,
        Intents.FLAGS.GUILD_SCHEDULED_EVENTS,

    ],
    allowedMentions: {
        parse: ["users", "roles", "everyone"],
        repliedUser: true,
    },
    partials: ["CHANNEL", "GUILD_MEMBER", "MESSAGE", "REACTION", "USER"],
});

client.commands = new Collection();
client.events = new Collection();

let apiclient = new APiClient(apikey, apiversion);



client.on('ready', async () => {
    await ["event", 'command'].forEach(item => {
        require(`./utils/${item}`)(client);
    })


    client.events.get('ready').run(apiclient);

})

client.on(`interactionCreate`, (interaction) => {
    client.pingdate = Date.now();
    client.events.get('int').run(client, interaction, apiclient);
})
client.on(`messageCreate`, async message => {
    client.pingdate = Date.now();
    client.events.get('message').run(message, client, apiclient);
})

client.login(token)

