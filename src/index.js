const {Client, Events} = require('discord.js');
require("dotenv").config()

const client = new Client({intents: 1});

client.once(Events.ClientReady, c => {
    console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.login(process.env.BOT_TOKEN).catch(error => {
    console.error('An error occurred while logging in:', error);
});
