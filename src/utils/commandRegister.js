import chalk from "chalk";

export default client => {
    const commands = client.commands.map(command => command.slash_data)
    client.application.commands.set(commands).then(() => {
        console.log(chalk.green("[COMMANDS]"), chalk.gray("Botun komutları yüklendi."));
    });
};