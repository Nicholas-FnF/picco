import { Client, CommandInteraction, ApplicationCommandType } from 'discord.js';
import { Command } from '../../types/command';

export const Ping: Command = {
    name: 'ping',
    description: 'Replies with pong.',
    type: ApplicationCommandType.ChatInput,
    run: async (
        client: Client,
        interaction: CommandInteraction
    ): Promise<any> => {
        await interaction.followUp({
            ephemeral: true,
            content: 'Pong! ' + '`' + new Date().getMilliseconds() + '` ms 🏓',
        });
    },
};
