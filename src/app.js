import { Client, Collection } from "discord.js";
import { readdirSync } from "fs";
import db from "croxydb";
import "dotenv/config";

process.on("uncaughtException", (err) => console.error(err.stack));
process.on("unhandledRejection", (err) => console.error(err.stack));

const client = new Client({
    intents: 3276543,
    partials: ["User", "GuildMember", "Message"]
})

client.commands = new Collection();

readdirSync(__dirname + "/events").forEach(async file => {
    const event = await import(`./events/${file}`).then(m => m.default);
    event(client, db);
});

readdirSync(__dirname + "/commands").forEach(category => {

    readdirSync(__dirname + `/commands/${category}`).forEach(async file => {
        const command = await import(`./commands/${category}/${file}`);
        client.commands.set(command.command_data.name, command);
    });

});

client.login(process.env.TOKEN);