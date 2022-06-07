const si = require("systeminformation");
var pjson = require("../../package.json");
const moment = require("moment");
const { MessageEmbed, Permissions, Client, CommandInteraction, Message } = require("discord.js");
const { apiv, apiversion } = require("../../config");
const { versioncheck } = require("ram-api.js/oldcode");

module.exports = {
    name: 'clientinfo',
    command: 'both',
    description: 'get client info',
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {*} args 
     * @param {CommandInteraction} interaction 
     * @param {*} extras 
     * @param {*} type 
     */

    async both(client, message, args, interaction, extras, type) {
        let msg;

        if (type === "msg") msg = await message.channel.send('Finding info');
        if (type === "int") interaction.deferReply();


        let embed = await info(client);

        if (msg) msg.delete();

        if (type === "msg") message.channel.send({ embeds: [embed] })
        if (type === 'int') interaction.editReply({ embeds: [embed] })
    }


}

async function info(bot) {
    let memused;
    let memtotal;
    let os;
    let node;
    let cpu;
    let net;
    let nets;
    let ramapiv;
    let disk;
    let docker;
    await si.mem().then((data) => {
        memused = data.active;
        memtotal = data.total;
    });
    await si.dockerContainerStats().then((data) => {
        docker = data;
    });
    await si.osInfo().then((data) => {
        os = data;
    });
    await si.fsSize().then((data) => {
        disk = data;
    });
    await si.versions().then((data) => {
        node = data;
    });
    await si.cpu().then((data) => {
        cpu = data;
    });
    await si.networkStats().then((data) => {
        net = data;
    });
    await si.networkInterfaces().then((data) => {
        nets = data;
    });

    seconds = Number(await si.time().uptime);
    let totalSeconds = bot.uptime / 1000;

    var d = Math.floor(seconds / (3600 * 24));
    var h = Math.floor((seconds % (3600 * 24)) / 3600);
    var m = Math.floor((seconds % 3600) / 60);
    var s = Math.floor(seconds % 60);
    var bd = Math.floor(totalSeconds / (3600 * 24));
    var bh = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    var bm = Math.floor((totalSeconds % 3600) / 60);
    var bs = Math.floor(totalSeconds % 60);

    memused = await formatBytes(memused);

    await versioncheck(apiversion).then((data) => {
        ramapiv = data;
    });


    async function formatBytes(bytes, decimals = 0) {
        if (bytes === 0) return "0 Bytes";

        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB"];

        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
    }

    memtotal = await formatBytes(memtotal);

    let totaldiskbytes = await disk[0].size;
    let useddiskbytes = await disk[0].used;

    let totaldisk = await formatBytes(await totaldiskbytes);
    let useddisk = await formatBytes(await useddiskbytes);

    const embed = new MessageEmbed()
        .setTitle("Server/Client Info!")
        .addField(
            "Discord.js",
            `${(await pjson.dependencies["discord.js"]) || "NULL"}`,
            true
        )
        .addField(
            "Memery",
            `${(await memused) || "NULL"} / ${(await memtotal) || "NULL"}`,
            true
        )
        .addField(
            "Storage",
            `${(await useddisk) || "NULL"} / ${(await totaldisk) || "NULL"}`,
            true
        )
        .addField("Storage Type", `${(await disk[0].type) || "NULL"}`, true)
        .addField("Os", `${(await os.platform) || "NULL"}`, true)
        .addField("Os Version", `${(await os.distro) || "NULL"}`, true)
        .addField("node.js", `${(await node.node) || "NULL"}`, true)
        .addField("Npm", `${(await node.npm) || "NULL"}`, true)
        .addField("Ram-api.js", `${(await pjson.dependencies["ram-api.js"]) || "NULL"}`, true)
        .addField("Processors", `${(await cpu.processors) || "NULL"}`, true)
        .addField("Cpu Cores", `${(await cpu.cores) || "NULL"}`, true)
        .addField(
            "Cpu Manufacturer",
            `${(await cpu.manufacturer) || "NULL"}`,
            true
        )
        .addField(
            "Ram Api",
            `Version: ${ramapiv.version} Outdated: ${ramapiv.outdated} Supported: ${ramapiv.supported}`
        )
        .addField("Cpu Brand", `${(await cpu.brand) || "NULL"}`, true)
        .addField(
            "Timezone:",
            `${(await si.time().timezoneName) || "NULL"}`,
            true
        )
        .addField(
            "Time",
            `${(await moment(await si.time().current).format("hh:mm:ss A")) || "NULL"
            }`,
            true
        )
        .addField(
            "Today's Date",
            `${moment(await si.time().current).format("dddd, MMMM Do YYYY") || "NULL"
            }`,
            true
        )
        .addField(
            "System Uptime",
            `${d ? `${d} Days,` : " "} ${h ? `${h} Hours,` : " "} ${m ? `${m} Minutes,` : " "
            } ${s || "NULL"} Seconds`,
            false
        )
        .addField(
            "Bots Uptime",
            `${bd ? `${bd} Days,` : " "} ${bh ? `${bh} Hours,` : " "} ${bm ? `${bm} Minutes,` : " "
            } ${bs || "NULL"} Seconds`,
            false
        );

    memused = "";
    memtotal = "";
    os = "";
    node = "";
    cpu = "";
    net = "";
    nets = "";
    disk = "";
    docker = "";

    return embed;




}