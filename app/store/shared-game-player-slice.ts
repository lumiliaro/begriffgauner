import { StateCreator } from "zustand";
import { GameSlice } from "./game-slice";
import { PlayersSlice } from "./players-slice";

export interface SharedGamePlayersSlice {
    resetImposter: () => void;
    setRandomImposter: () => void;
}

export const createSharedGamePlayersSlice: StateCreator<
    GameSlice & PlayersSlice,
    [],
    [],
    SharedGamePlayersSlice
> = (set, get) => ({
    resetImposter: () => {
        const imposterIndex = get().players.findIndex(
            (player) => player.imposter === true
        );

        if (imposterIndex !== -1) {
            get().setPlayer(imposterIndex, {
                ...get().players[imposterIndex],
                imposter: false,
            });
        }
    },
    setRandomImposter: () => {
        const randomIndex = Math.floor(Math.random() * get().playerCount);
        const imposter = get().players[randomIndex];
        imposter["imposter"] = true;
        get().setPlayer(randomIndex, imposter);
    },
});
