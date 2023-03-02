import { getNumber } from './../../helpers/get-number';
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
            name: 'hostname',
            description: 'The endpoint hostname.',
            required: true,
            type: ApplicationCommandOptionType.String,
        },
        {
            name: 'secure',
            description: 'Determines if the endpoint is secure or not.',
            required: true,
            type: ApplicationCommandOptionType.Boolean,
        },
    ],
    run: async (
        client: Client,
        interaction: CommandInteraction
    ): Promise<any> => {
        const { value } = interaction.options.get('hostname');
        const { value: secure } = interaction.options.get('secure');

        if (getNumber(value as string)) {
            return await interaction.followUp({
                ephemeral: false,
                content: 'Input must be a string.',
            });
        }

        if (!(value as string).includes('.')) {
            return await interaction.followUp({
                ephemeral: false,
                content:
                    'Input must be a valid url.\nExample: https://notnick.io/api/hello',
            });
        }

        // TODO: The full url (including the http protocol) might get passed in so
        // we might need to check if the value includes the http protocol and if it
        // does then we shouldn't need to do any string manipulation.

        try {
            const response = await fetch(
                `${secure ? 'https' : 'http'}://${value}` as string,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

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
        } catch (e) {
            console.log(e);
            await interaction.followUp({
                ephemeral: false,
                content:
                    'Something went wrong. ' +
                    'Please make sure that the endpoint has a header of ' +
                    '`Content-Type: application/json' +
                    "`. You can verify this by heading to the network tab in the developer tools and checking the headers of the request you're firing off.",
            });
        }
    },
};
