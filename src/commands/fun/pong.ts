import { Client, CommandInteraction, ApplicationCommandType } from 'discord.js';
import { Command } from '../../types/command';

export const Pong: Command = {
    name: 'pong',
    description: 'Replies with ping.',
    type: ApplicationCommandType.ChatInput,
    run: async (
        client: Client,
        interaction: CommandInteraction
    ): Promise<any> => {
        await interaction.followUp({
            ephemeral: true,
            content: 'Ping! ' + '`' + new Date().getMilliseconds() + '` ms 🏓',
        });
    },
};
