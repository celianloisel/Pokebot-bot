const {glob} = require("glob");
const Logger = require("../Logger");

module.exports = async (client) => {
    (await glob(`${process.cwd()}/src/commands/**/*.js`)).map(async (cmdFile) => {
        const cmd = require(`${process.cwd()}\\${cmdFile}`);

        if (!cmd.name)
            return Logger.warn(
                `Commande non-chargée: ajouter un nom à votre commande ↓\nFichier -> ${cmdFile}`
            );

        if (!cmd.description && cmd.type !== "USER")
            return Logger.warn(
                `Commande non-chargée: ajouter une description à votre commande ↓\nFichier -> ${cmdFile}`
            );

        if (!cmd.category)
            return Logger.warn(
                `Commande non-chargée: ajouter une catégorie à votre commande ↓\nFichier -> ${cmdFile}`
            );

        if (!cmd.permissions)
            return Logger.warn(
                `Commande non-chargée: ajouter des permissions à votre commande ↓\nFichier -> ${cmdFile}`
            );

        if (cmd.ownerOnly === undefined)
            return Logger.warn(
                `Commande non-chargée: indiquer si la commande est ownerOnly ↓\nFichier -> ${cmdFile}`
            );

        if (!cmd.usage)
            return Logger.warn(
                `Commande non-chargée: ajouter une utilisation (usage) à votre commande ↓\nFichier -> ${cmdFile}`
            );

        if (!cmd.examples)
            return Logger.warn(
                `Commande non-chargée: ajouter des exemples (examples) à votre commande ↓\nFichier -> ${cmdFile}`
            );

        await client.commands.set(cmd.name, cmd);
        Logger.command(`- ${cmd.name}`);
    });
};
