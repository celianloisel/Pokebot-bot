const Logger = require("../../utils/Logger");

module.exports = {
    name: "ready",
    once: true,
    async execute(client) {
        Logger.client(`Ready! Logged in as ${client.user.tag}`);

        client.user.setPresence({
            activities: [{name: "/help", type: 3}],
            // "COMPETING"	ActivityType.Competing	5
            // "CUSTOM"	    ActivityType.Custom	    4
            // "LISTENING"	ActivityType.Listening	2
            // "PLAYING"	ActivityType.Playing	0
            // "STREAMING"	ActivityType.Streaming	1
            // "WATCHING"	ActivityType.Watching	3
            status: "online",
        });

        if (process.env.NODE_ENV === "DEV") {
            const devGuild = await client.guilds.cache.get(process.env.DEV_GUILD_ID);
            if (devGuild) {
                await devGuild.commands.set(client.commands.map((cmd) => cmd));
            } else {
                Logger.warn("Le serveur devGuild n'a pas été trouvé.");
            }
        } else {
            await client.application.commands.set(client.commands.map(cmd => cmd))
        }
    },
};