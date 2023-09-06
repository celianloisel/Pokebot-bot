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

process.on("exit", (code) => {
    Logger.client(`Le processus s'est arrêté avec le code: ${code}!`);
});

process.on("uncaughtException", (err, origin) => {
    Logger.error(`UNCAUGHT_EXCEPTION: ${err}`);
    console.error(`Origine: ${origin}`);
});

process.on("unhandledRejection", (reason, promise) => {
    Logger.warn(`UNHANDLED_REJECTION: ${reason}`);
    console.log(promise);
});

process.on("warning", (...args) => Logger.warn(...args));

client.login(process.env.BOT_TOKEN).catch(error => {
    Logger.error(`An error occurred while logging in:\nError -> ${error}`)
});
