import {
    ChatInputApplicationCommandData,
    ApplicationCommandType,
    ApplicationCommandOptionData,
    CommandInteraction,
    Client,
} from 'discord.js';

export interface Command extends ChatInputApplicationCommandData {
    name: string;
    description: string;
    type: ApplicationCommandType.ChatInput;
    options?: ApplicationCommandOptionData[];
    run: (client: Client, interaction: CommandInteraction) => void;
}
