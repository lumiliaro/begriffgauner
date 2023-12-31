import { StateCreator } from "zustand";

export interface Player {
    name: string;
    onTurn: boolean;
    imposter: boolean;
    imposterWins: number;
    teamWins: number;
    score: number;
}

export interface GameSlice {
    numberOfPlayers: number;
    wordList: string;
    wordCollection: string[];
    players: Player[];
    currentRound: number;
    currentWord: string;
    selectedImposter: string;
    setNumberOfPlayers: (numberOfPlayers: string) => void;
    setWordList: (value: string) => void;
    setWordCollection: (value: string[]) => void;
    setPlayers: (players: string[]) => void;
    setNextPlayersTurn: () => void;
    setRandomImposter: () => void;
    setSelectedImposter: (name: string) => void;
    setRandomWord: () => void;
    endRound: () => void;
    setScores: (isImposterFound: boolean) => void;
}

export const createGameSlice: StateCreator<GameSlice> = (set) => ({
    numberOfPlayers: 3,
    wordList: "german20",
    wordCollection: [],
    players: [],
    currentRound: 0,
    currentWord: "",
    selectedImposter: "",
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
                score: 0,
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
    setSelectedImposter: (name: string) =>
        set(() => ({ selectedImposter: name })),
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
            selectedImposter: "",
        })),
    setScores: (isImposterFound: boolean) =>
        set((state) => ({
            players: state.players.map((player) => {
                if (player.imposter) {
                    return {
                        ...player,
                        imposterWins:
                            player.name !== state.selectedImposter
                                ? player.imposterWins + 1
                                : player.imposterWins,
                        score:
                            player.name !== state.selectedImposter
                                ? player.score + 20
                                : player.score,
                    };
                }
                return {
                    ...player,
                    teamWins: isImposterFound
                        ? player.teamWins + 1
                        : player.teamWins,
                    score: isImposterFound ? player.score + 10 : player.score,
                };
            }),
        })),
});
