import { create } from "zustand";
import { GameSlice, createGameSlice } from "./game-slice";
import { mountStoreDevtool } from "simple-zustand-devtools";

export const useBoundStore = create<GameSlice>()((...a) => ({
// &
// WordsSlice &
// PlayersSlice &
// SharedGameWordsSlice &
// SharedGamePlayersSlice
    ...createGameSlice(...a),
    // ...createWordsSlice(...a),
    // ...createPlayersSlice(...a),
    // ...createSharedGameWordsSlice(...a),
    // ...createSharedGamePlayersSlice(...a),
}));

if (process.env.NODE_ENV === "development") {
    mountStoreDevtool("Store", useBoundStore);
}
