import { ready, interactionCreate } from '../events';

export enum Event {
    READY,
    INTERACTION_CREATE,
}

export const EVENTS = [
    { name: Event.READY, handler: ready },
    { name: Event.INTERACTION_CREATE, handler: interactionCreate },
];
