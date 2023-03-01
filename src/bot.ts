// Helpers
import { DEVELOPMENT_ENVIRONMENT } from './helpers/constants';
import { EVENTS } from './helpers/events';

// Dependencies
import { Client, Collection, GatewayIntentBits } from 'discord.js';
import * as dotenv from 'dotenv';
import chalk from 'chalk';

dotenv.config();

console.log(chalk.green(`Bot is starting up in ${DEVELOPMENT_ENVIRONMENT}...`));

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildBans,
    ],
});

// Calls all the events.
EVENTS.forEach(event => {
    event.handler(client);
});

client.login(process.env.DISCORD_TOKEN as string);
