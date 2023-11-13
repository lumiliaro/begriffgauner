import { create } from "zustand";
import { GameSlice, createGameSlice } from "./game-slice";
import { WordsSlice, createWordsSlice } from "./words-slice";
import { PlayersSlice, createPlayersSlice } from "./players-slice";
import { mountStoreDevtool } from "simple-zustand-devtools";
import {
    SharedGameWordsSlice,
    createSharedGameWordsSlice,
} from "./shared-game-words-slice";
import {
    SharedGamePlayersSlice,
    createSharedGamePlayersSlice,
} from "./shared-game-player-slice";

export const useBoundStore = create<
    GameSlice &
        WordsSlice &
        PlayersSlice &
        SharedGameWordsSlice &
        SharedGamePlayersSlice
>()((...a) => ({
    ...createGameSlice(...a),
    ...createWordsSlice(...a),
    ...createPlayersSlice(...a),
    ...createSharedGameWordsSlice(...a),
    ...createSharedGamePlayersSlice(...a),
}));

if (process.env.NODE_ENV === "development") {
    mountStoreDevtool("Store", useBoundStore);
}
