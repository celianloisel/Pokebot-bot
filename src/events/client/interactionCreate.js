const {PermissionsBitField} = require("discord.js");
const ownerId = process.env.OWNER_ID;

module.exports = {
    name: "interactionCreate",
    once: false,
    async execute(client, interaction) {

        if (interaction.isCommand()) {
            const cmd = client.commands.get(interaction.commandName);
            if (!cmd) return interaction.reply("Cette commande n'existe pas!");

            if (cmd.ownerOnly) {
                if (interaction.user.id !== ownerId)
                    return interaction.reply({
                        content:
                            "La seule personne pouvant taper cette commande est l'owner du bot!",
                        ephemeral: true,
                    });
            }

            if (!interaction.member.permissions.has([cmd.permissions])) {
                const result = [];

                for (const perm of Object.keys(PermissionsBitField.Flags)) {
                    if (new PermissionsBitField(cmd.permissions).has(PermissionsBitField.Flags[perm])) {
                        result.push(perm);
                    }
                }

                return interaction.reply({
                    content: `Vous n'avez pas la/les permission(s) requise(s) (\`${result.join(
                        ", "
                    )}\`) pour taper cette commande!`,
                    ephemeral: true,
                });
            }

            await cmd.runInteraction(client, interaction);
        }
    },
};