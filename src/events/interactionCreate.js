import ButtonHandler from "../utils/handlers/ButtonHandler.js";
import ModalHandler from "../utils/handlers/ModalHandler.js";
import AutocompleteHandler from "../utils/handlers/AutocompleteHandler.js";
import StringSelectMenuHandler from "../utils/handlers/StringSelectMenuHandler.js";
import ChannelSelectMenuHandler from "../utils/handlers/ChannelSelectMenuHandler.js";
import CooldownChecker from "../utils/checkers/cooldown.js";
import permissionChecker from "../utils/checkers/permission.js";

export default (client, db) => {
    client.on("interactionCreate", async interaction => {
        if (interaction.isCommand()) {
            const command = client.commands.get(interaction.commandName);
            if (!command) return;
            try {

                let cooldown = await CooldownChecker(command, interaction.user.id);
                if (cooldown) return interaction.reply({ content: `Bekleme süresindesiniz! Lütfen bu komutu tekrar kullanmadan önce ${cooldown} saniye bekleyin!`, ephemeral: true });

                let permissionCheck = await permissionChecker({
                    userPermissions: {
                        user: interaction.member,
                        perms: command.command_data.permissions?.user || []
                    },
                    botPermissions: {
                        user: interaction.guild.members.me,
                        perms: command.command_data.permissions?.bot || []
                    }
                })

                if (!permissionCheck.bot) return interaction.reply({ content: `Bu komutu çalıştırmak için gerekli izinlere sahip değilim!`, ephemeral: true });
                else if (!permissionCheck.user) return interaction.reply({ content: `Bu komutu çalıştırmak için gerekli izinlere sahip değilsiniz!`, ephemeral: true });

                await command.command_data.execute(interaction, db);
            } catch (error) {
                console.error(error);
                await interaction.reply({ content: "Bu komut yürütülürken bir hata oluştu!", ephemeral: true });
            }
        } else if (interaction.isButton()) ButtonHandler(interaction, db);
        else if (interaction.isModalSubmit()) ModalHandler(interaction, db);
        else if (interaction.isAutocomplete()) AutocompleteHandler(interaction, db);
        else if (interaction.isStringSelectMenu()) StringSelectMenuHandler(interaction, db);
        else if (interaction.isChannelSelectMenu()) ChannelSelectMenuHandler(interaction, db);
    });
};