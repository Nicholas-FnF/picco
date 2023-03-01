import {
    ChatInputApplicationCommandData,
    ApplicationCommandType,
    CommandInteraction,
    Client,
} from 'discord.js';

export interface Command extends ChatInputApplicationCommandData {
    name: string;
    description: string;
    type: ApplicationCommandType.ChatInput;
    run: (client: Client, interaction: CommandInteraction) => void;
}
