import commandRegister from "../utils/commandRegister.js"
import chalk from "chalk";

export default client => {
    client.once("ready", async () => {
        console.log(chalk.green("[BOT]"), chalk.gray("Bot başarıyla çalıştırıldı."));

        if (parseInt(process.env.COMMAND_SAVE)) commandRegister(client);
    });
};