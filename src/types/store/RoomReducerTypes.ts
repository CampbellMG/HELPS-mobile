import { Room } from '../model/Room';

export interface RoomState {
    rooms: Room[];
    searchTerm?: string;
    selectedRoom: Room;
    newRoomTitle: string;
    error?: string;
    filter: string;
}