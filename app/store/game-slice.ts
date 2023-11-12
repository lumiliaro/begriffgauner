import { StateCreator } from "zustand";

export interface GameSlice {
    code: string;
    playerCount: number;
    currentWord: string;
    // currentPlayer: string;
    currentPlayerIndex: number;
    setCode: (value: string) => void;
    setPlayerCount: (value: number) => void;
    setCurrentWord: (word: string) => void;
    // setCurrentPlayer: (player: string) => void;
    setNextPlayersTurn: () => void;
    newRound: () => void;
}

export const createGameSlice: StateCreator<GameSlice> = (set) => ({
    code: "",
    playerCount: 0,
    currentWord: "",
    // currentPlayer: "",
    currentPlayerIndex: 0,
    setCode: (code: string) => set(() => ({ code })),
    setPlayerCount: (playerCount: number) => set(() => ({ playerCount })),
    setCurrentWord: (word: string) => set(() => ({ currentWord: word })),
    // setCurrentPlayer: (player: string) =>
    //     set(() => ({ currentPlayer: player })),
    setNextPlayersTurn: () =>
        set((state) => ({
            currentPlayerIndex:
                state.currentPlayerIndex === state.playerCount - 1
                    ? 0
                    : state.currentPlayerIndex + 1,
        })),
    newRound: () => set(() => ({ currentWord: "", currentPlayerIndex: 0 })),
});
