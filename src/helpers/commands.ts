import { Ping, Pong } from '../commands/fun';
import { Command } from '../types/command';
import { Json } from '../commands/utils';
import { Dns } from '../commands/info';

export const Commands: Command[] = [Ping, Pong, Dns, Json];
