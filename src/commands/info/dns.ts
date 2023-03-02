import {
    Client,
    CommandInteraction,
    ApplicationCommandType,
    ApplicationCommandOptionType,
} from 'discord.js';
import { Command } from '../../types/command';
import chalk from 'chalk';
import dns from 'dns';

export const Dns: Command = {
    name: 'dns',
    description: 'Performs a dns lookup on the hostname.',
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'hostname',
            description: 'Performs a dns lookup on the hostname.',
            required: true,
            type: ApplicationCommandOptionType.String,
        },
    ],
    run: async (
        client: Client,
        interaction: CommandInteraction
    ): Promise<any> => {
        const { value } = interaction.options.get('hostname');

        const options = {
            family: 6,
            hints: dns.ADDRCONFIG | dns.V4MAPPED,
        };

        dns.lookup(value as string, options, async (err, address, family) => {
            if (err) {
                await interaction.followUp({
                    ephemeral: true,
                    content: `Something went wrong. Here's what happened: ${err.message}.`,
                });
                return console.log(chalk.red(err.message));
            }
            await interaction.followUp({
                ephemeral: true,
                content:
                    'Address: ' +
                    '`' +
                    address +
                    '`' +
                    '\n' +
                    'Hostname: ' +
                    '`' +
                    value +
                    '`' +
                    '\n' +
                    'Family: ' +
                    '`' +
                    String(family) +
                    '`',
            });
        });
    },
};
