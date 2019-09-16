import { Message } from '../model/Message';

export interface MessageState {
    error?: string
    messages: Message[]
}