const {glob} = require("glob");
const Logger = require("../Logger");

module.exports = async (client) => {
    (await glob(`${process.cwd()}/src/events/**/*.js`)).map(async (eventFile) => {
        const event = require(`${process.cwd()}\\${eventFile}`);

        if (!event.name)
            return Logger.warn(
                `Evénement non-déclenché: ajouter un nom à votre événement ↓\nFichier -> ${eventFile}`
            );

        if (!eventList.includes(event.name)) {
            return Logger.typo(
                `Evenement non-déclenché: erreur de typo ↓\nFichier -> ${eventFile}`
            );
        }

        if (event.once) {
            client.once(event.name, (...args) => event.execute(client, ...args));
        } else {
            client.on(event.name, (...args) => event.execute(client, ...args));
        }

        Logger.event(`- ${event.name}`);
    });
};

const eventList = ["applicationCommandPermissionsUpdate", "autoModerationActionExecution", "autoModerationRuleCreate", "autoModerationRuleDelete", "autoModerationRuleUpdate", "channelCreate", "channelDelete", "channelPinsUpdate", "channelUpdate", "debug", "emojiCreate", "emojiDelete", "emojiUpdate", "error", "guildAuditLogEntryCreate", "guildAvailable", "guildBanAdd", "guildBanRemove", "guildCreate", "guildDelete", "guildIntegrationsUpdate", "guildMemberAdd", "guildMemberAvailable", "guildMemberRemove", "guildMembersChunk", "guildMemberUpdate", "guildScheduledEventCreate", "guildScheduledEventDelete", "guildScheduledEventUpdate", "guildScheduledEventUserAdd", "guildScheduledEventUserRemove", "guildUnavailable", "guildUpdate", "interactionCreate", "inviteCreate", "inviteDelete", "messageCreate", "messageDelete", "messageDeleteBulk", "messageReactionAdd", "messageReactionRemove", "messageReactionRemoveAll", "messageReactionRemoveEmoji", "messageUpdate", "presenceUpdate", "ready", "roleCreate", "roleDelete", "roleUpdate", "shardDisconnect", "shardError", "shardReady", "shardReconnecting", "shardResume", "stageInstanceCreate", "stageInstanceDelete", "stageInstanceUpdate", "stickerCreate", "stickerDelete", "stickerUpdate", "threadCreate", "threadDelete", "threadListSync", "threadMembersUpdate", "threadMemberUpdate", "threadUpdate", "typingStart", "userUpdate", "voiceStateUpdate", "warn", "webhooksUpdate", "webhookUpdate"];