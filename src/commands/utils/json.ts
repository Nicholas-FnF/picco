import {
    Client,
    CommandInteraction,
    ApplicationCommandType,
    ApplicationCommandOptionType,
} from 'discord.js';
import { Command } from '../../types/command';

export const Json: Command = {
    name: 'json',
    description: 'Replies back with the json response from the api endpoint.',
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'endpoint',
            description:
                'Replies back with the json response from the api endpoint.',
            required: true,
            type: ApplicationCommandOptionType.String,
        },
    ],
    run: async (
        client: Client,
        interaction: CommandInteraction
    ): Promise<any> => {
        const { value } = interaction.options.get('endpoint');

        // TODO: Fix NaN issues
        if (typeof parseInt(value as string) === 'number') {
            return await interaction.followUp({
                ephemeral: false,
                content: 'Input must be a string.',
            });
        }

        const response = await fetch(value as string, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.status !== 200) {
            return await interaction.followUp({
                ephemeral: true,
                content: `Something went wrong, returned a ${response.status} status code.`,
            });
        }

        const data = await response.json();

        const content = '```json\n' + JSON.stringify(data) + '\n' + '```';

        if (content.length > 2000) {
            return await interaction.followUp({
                ephemeral: false,
                content:
                    '`' +
                    'DiscordAPIError[50035]' +
                    '`: ' +
                    'Must be 2000 or fewer in length.',
            });
        }

        await interaction.followUp({ ephemeral: true, content });
    },
};
