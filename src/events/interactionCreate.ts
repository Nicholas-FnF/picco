import { Client, CommandInteraction, Interaction } from 'discord.js';
import { Commands } from './../helpers/commands';
import chalk from 'chalk';

export const interactionCreate = (client: Client): void => {
    client.on('interactionCreate', async (interaction: Interaction) => {
        if (interaction.isCommand() || interaction.isContextMenuCommand()) {
            await handleSlashCommand(client, interaction);
        }
    });
};

const handleSlashCommand = async (
    client: Client,
    interaction: CommandInteraction
): Promise<void> => {
    const slashCommand = Commands.find(
        command => command.name === interaction.commandName
    );

    if (!slashCommand) {
        interaction.followUp({ content: 'Something went wrong.' });
        console.log(chalk.red("A command probably doesn't exist."));
        return;
    }

    await interaction.deferReply();

    slashCommand.run(client, interaction);
};
