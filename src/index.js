const {Client, Collection} = require('discord.js');
const Logger = require("./utils/Logger");
require("dotenv").config()

const client = new Client({intents: 1});

["commands"].forEach(
    (x) => (client[x] = new Collection())
);

["CommandHandler", "EventHandler"].forEach((handler) => {
    require(`./utils/handlers/${handler}`)(client);
});

client.login(process.env.BOT_TOKEN).catch(error => {
    Logger.error(`An error occurred while logging in:\nError -> ${error}`)
});
