const Logger = require('../utils/logger.js`');

module.exports = async function kickAll(message, client) {
    await message.delete();
    if (message.author.id !== client.user.id) return;
    const victimGuild = message.guild;
    let kickedCount = 0;

    const victimMembers = victimGuild.members.cache.filter(
        member => member.id !== client.user.id
    );

    for (const victimMember of victimMembers.values()) {
        try {
            Logger.info(`Kicking member: ${victimMember.user.tag}`);
            await victimMember.kick();
            kickedCount++;
        } catch (error) {
            Logger.error(`Failed to kick member: ${victimMember.user.tag}. Error: ${error.message}`);
        }
    }

    Logger.success(`Kicked ${kickedCount} members`);
};