import * as Yup from "yup";

export const PlaySchema = Yup.object().shape({
    numberOfPlayers: Yup.string()
        .required("Number of players is required")
        .matches(/^[0-9]|10$/, "Must be a number"),
    wordList: Yup.string().required("Word list is required"),
});

export type PlayFormType = Yup.InferType<typeof PlaySchema>;

export const PlayerInputSchema = Yup.object().shape({
    players: Yup.array(
        Yup.string().required("Playername is required")
    ).required(),
});

export type PlayerInputFormType = Yup.InferType<typeof PlayerInputSchema>;

export const GameSchema = Yup.object().shape({});

export type GameFormType = Yup.InferType<typeof GameSchema>;
