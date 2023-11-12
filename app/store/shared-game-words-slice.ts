import { StateCreator } from "zustand";
import { GameSlice } from "./game-slice";
import { WordsSlice } from "./words-slice";

export interface SharedGameWordsSlice {
    setRandomWord: () => void;
}

export const createSharedGameWordsSlice: StateCreator<
    GameSlice & WordsSlice,
    [],
    [],
    SharedGameWordsSlice
> = (set, get) => ({
    setRandomWord: () => {
        const randomWord =
            get().words[Math.floor(Math.random() * get().words.length)];
        get().useWord(randomWord);
        get().setCurrentWord(randomWord);
    },
});
