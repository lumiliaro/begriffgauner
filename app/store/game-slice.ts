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
    wordCollection: string[];
    players: Player[];
    currentRound: number;
    currentWord: string;
    setNumberOfPlayers: (numberOfPlayers: string) => void;
    setWordList: (value: string) => void;
    setWordCollection: (value: string[]) => void;
    setPlayers: (players: string[]) => void;
    setNextPlayersTurn: () => void;
    setRandomImposter: () => void;
    setRandomWord: () => void;
    endRound: () => void;
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
    wordCollection: [],
    players: [],
    currentRound: 0,
    currentWord: "",
    setNumberOfPlayers: (numberOfPlayers: string) =>
        set(() => ({ numberOfPlayers: Number(numberOfPlayers) })),
    setWordList: (wordList: string) => set(() => ({ wordList })),
    setWordCollection: (wordCollection: string[]) =>
        set(() => ({ wordCollection })),
    setPlayers: (players: string[]) =>
        set(() => ({
            players: players.map((player, index) => ({
                name: player,
                onTurn: index === 0,
                imposter: false,
                imposterWins: 0,
                teamWins: 0,
            })),
        })),
    setNextPlayersTurn: () =>
        set((state) => ({
            currentRound:
                state.currentRound === state.numberOfPlayers - 1
                    ? 0
                    : state.currentRound + 1,
        })),
    setRandomImposter: () =>
        set((state) => {
            const imposterIndex = Math.floor(
                Math.random() * state.numberOfPlayers
            );
            state.players.map((player, index) => {
                player["imposter"] = index === imposterIndex;
            });

            return { ...state };
        }),
    setRandomWord: () =>
        set((state) => {
            const wordIndex = Math.floor(
                Math.random() * state.wordCollection.length
            );
            state.currentWord = state.wordCollection[wordIndex];
            return { ...state };
        }),
    endRound: () =>
        set((state) => ({
            currentRound: 0,
            wordCollection: state.wordCollection.filter(
                (word) => word !== state.currentWord
            ),
            currentWord: "",
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
