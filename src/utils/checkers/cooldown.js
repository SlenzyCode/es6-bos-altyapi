import { Collection } from "discord.js";
const cooldowns = new Collection();

export default (command, user_id) => {

    if (user_id == process.env.OWNER) return false;
    if (!cooldowns.has(command.command_data.name)) cooldowns.set(command.command_data.name, new Collection());

    const now = Date.now();
    const timestamps = cooldowns.get(command.command_data.name);
    const cooldownAmount = (command.command_data.cooldown || parseInt(process.env.DEFAULT_COOLDOWN) < 1 ? 3 : parseInt(process.env.DEFAULT_COOLDOWN)) * 1000;

    if (timestamps.has(user_id)) {
        const expiration = timestamps.get(user_id) + cooldownAmount;
        if (now < expiration) {
            const timeLeft = Math.round((expiration - now) / 1000);
            return timeLeft;
        }

        return false;
    }

    timestamps.set(user_id, now);
    setTimeout(() => timestamps.delete(user_id), cooldownAmount);
    return false;
};