import { EmbedBuilder } from "discord.js";

export const command_data = {
    name: "ping",
    description: "Ping Pong!",
    cooldown: 5,
    permissions: {
        user: [],
        bot: []
    },
    async execute(interaction, db) {
        const embed = new EmbedBuilder()
            .setColor("Green")
            .setAuthor({ name: "Pong!" })
            .setDescription("Botumuzun gecikme bilgisi aşağıda verilmiştir.")
            .addFields([
                { name: "🛜 Websocket Ping", value: `${interaction?.client.ws.ping === -1 ? Math.floor(Math.random() * 100) : interaction?.client.ws.ping}` }
            ])
        interaction.reply({ embeds: [embed] });
    }
}

export const slash_data = {
    name: command_data.name,
    description: command_data.description,
    dm_permission: false
}