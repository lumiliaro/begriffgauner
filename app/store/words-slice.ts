import { StateCreator } from "zustand";
import { WordList } from "../utils/wordlists";

type SelectedWordListType = WordList;

export interface WordsSlice {
    selectedWordList: SelectedWordListType;
    words: string[];
    usedWords: string[];
    setWords: (words: string[]) => void;
    addWord: (word: string) => void;
    removeWord: (wordName: string) => void;
    useWord: (wordName: string) => void;
    setSelectedWordList: (selectedWordList: WordList) => void;
}

export const createWordsSlice: StateCreator<WordsSlice> = (set) => ({
    selectedWordList: { label: "", value: "", words: [] },
    words: [],
    usedWords: [],
    setWords: (words: string[]) => set(() => ({ words })),
    addWord: (word: string) =>
        set((state) => ({ words: [...state.words, word] })),
    removeWord: (wordName: string) =>
        set((state) => ({
            words: state.words.filter((word) => word !== wordName),
        })),
    useWord: (wordName: string) =>
        set((state) => ({
            usedWords: [...state.usedWords, wordName],
            words: state.words.filter((word) => word !== wordName),
        })),
    setSelectedWordList: (selectedWordList: SelectedWordListType) =>
        set(() => ({ selectedWordList })),
});
