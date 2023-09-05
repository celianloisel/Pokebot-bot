const {Client, Events} = require('discord.js');
const Logger = require("./utils/Logger");
require("dotenv").config()

const client = new Client({intents: 1});

client.once(Events.ClientReady, c => {
    Logger.info(`Ready! Logged in as ${c.user.tag}`)
});

client.login(process.env.BOT_TOKEN).catch(error => {
    Logger.error(`An error occurred while logging in:\n    ${error}`)
});
