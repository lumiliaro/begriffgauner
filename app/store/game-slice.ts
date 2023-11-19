import { StateCreator } from "zustand";

export interface Player {
    name: string;
    onTurn: boolean;
    imposter: boolean;
    imposterWins: number;
    teamWins: number;
}

export interface GameSlice {
    numberOfPlayers: number;
    wordList: string;
    players: Player[];
    setNumberOfPlayers: (numberOfPlayers: string) => void;
    setWordList: (value: string) => void;
    setPlayers: (players: string[]) => void;
    // code: string;
    // currentWord: string;
    // currentPlayerIndex: number;
    // setCode: (value: string) => void;
    // setCurrentWord: (word: string) => void;
    // setNextPlayersTurn: () => void;
    // newRound: () => void;
}

export const createGameSlice: StateCreator<GameSlice> = (set) => ({
    numberOfPlayers: 3,
    wordList: "german20",
    players: [],
    setNumberOfPlayers: (numberOfPlayers: string) =>
        set(() => ({ numberOfPlayers: Number(numberOfPlayers) })),
    setWordList: (wordList: string) => set(() => ({ wordList })),
    setPlayers: (players: string[]) =>
        set(() => ({
            players: players.map((player) => ({
                name: player,
                onTurn: false,
                imposter: false,
                imposterWins: 0,
                teamWins: 0,
            })),
        })),
    // code: "",
    // currentWord: "",
    // currentPlayerIndex: 0,
    // setCode: (code: string) => set(() => ({ code })),
    // setCurrentWord: (word: string) => set(() => ({ currentWord: word })),
    // setNextPlayersTurn: () =>
    //     set((state) => ({
    //         currentPlayerIndex:
    //             state.currentPlayerIndex === state.numberOfPlayers - 1
    //                 ? 0
    //                 : state.currentPlayerIndex + 1,
    //     })),
    // newRound: () => set(() => ({ currentWord: "", currentPlayerIndex: 0 })),
});
