import { Commands } from '../helpers/commands';
import { Client } from 'discord.js';
import chalk from 'chalk';

export const ready = (client: Client): void => {
    client.on('ready', async () => {
        if (!client.user || !client.application) {
            return;
        }

        try {
            await client.application.commands.set(Commands);
        } catch (e) {
            console.log(chalk.red(e));
        }

        console.log(chalk.green(`${client.user.username} is online!`));
    });
};
