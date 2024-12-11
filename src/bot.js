const { Client, Guild, GuildMember } = require('discord.js-selfbot-v13');
const Logger = require('./util/logger.js');
const kickAll = require('./commands/kickAll');
const banAll = require('./commands/banAll');
const nukeRoles = require('./commands/nukeRoles');
const nukeChannels = require('./commands/nukeChannels');
require('dotenv').config();

const client = new Client();

client.on('ready', async () => {
    Logger.success(`${client.user.username} is ready!`);
});

client.on("messageCreate", async message => {
    if (message.content === '!nukeRoles') {
        await nukeRoles(message, client);
    }
    if (message.content === '!nukeChannels') {
        await nukeChannels(message, client);
    }
    if (message.content === '!kickAll') {
        await kickAll(message, client);
    }
    if (message.content === '!banAll') {
        await banAll(message, client);
    }
    if (message.conent === '!nukeAll') {
        await nukeRoles(message, client);
        await nukeChannels(message, client);
        await kickAll(message, client);
        await banAll(message, client);
    }
});

client.login(process.env.TOKEN);