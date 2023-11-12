import { StateCreator } from "zustand";

export interface Player {
    name: string;
    onTurn: boolean;
    imposter: boolean;
    imposterWins: number;
    teamWins: number;
}

export interface PlayersSlice {
    players: Player[];
    addPlayerByName: (playerName: string) => void;
    setPlayer: (playerIndex: number, player: Player) => void;
    shufflePlayers: () => void;
}

export const createPlayersSlice: StateCreator<PlayersSlice> = (set) => ({
    players: [],
    addPlayerByName: (playerName: string) =>
        set((state) => ({
            players: [
                ...state.players,
                {
                    name: playerName,
                    onTurn: false,
                    imposter: false,
                    imposterWins: 0,
                    teamWins: 0,
                },
            ],
        })),
    setPlayer: (playerIndex: number, player: Player) =>
        set((state) => {
            const players = [...state.players];
            players[playerIndex] = player;
            return {
                players,
            };
        }),
    shufflePlayers: () =>
        set((state) => ({
            players: [...state.players]
                .map((player) => ({ player, sort: Math.random() }))
                .sort((a, b) => a.sort - b.sort)
                .map(({ player }) => player),
        })),
});
