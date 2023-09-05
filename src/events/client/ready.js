const Logger = require("../../utils/Logger");
const { ActivityType } = require('discord.js');

module.exports = {
    name: "ready",
    once: true,
    async execute(client) {
        Logger.client(`Ready! Logged in as ${client.user.tag}`);

        client.user.setPresence({
            activities: [{ name: "/help", type: 3 }],
            // "COMPETING"	ActivityType.Competing	5
            // "CUSTOM"	    ActivityType.Custom	    4
            // "LISTENING"	ActivityType.Listening	2
            // "PLAYING"	ActivityType.Playing	0
            // "STREAMING"	ActivityType.Streaming	1
            // "WATCHING"	ActivityType.Watching	3
            status: "online",
        });
    },
};