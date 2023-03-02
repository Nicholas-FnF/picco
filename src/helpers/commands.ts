import { Ping, Pong } from '../commands/fun';
import { Dns } from '../commands/info';
import { Command } from '../types/command';

export const Commands: Command[] = [Ping, Pong, Dns];
