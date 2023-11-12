export interface WordList {
    label: string;
    value: string;
    words: string[];
}

const initialSelectedWordList: WordList = {
    label: "Please select a word list",
    value: "",
    words: [],
};

export const german10: WordList = {
    label: "German 10",
    value: "german10",
    words: [
        "Affe",
        "Banane",
        "Clown",
        "Dusche",
        "Eichhoernchen",
        "Fisch",
        "Geschenk",
        "Haus",
        "Igel",
        "Junge",
    ],
};

export const german20: WordList = {
    label: "German 20",
    value: "german20",
    words: [
        "Affe",
        "Banane",
        "Clown",
        "Dusche",
        "Eichhoernchen",
        "Fisch",
        "Geschenk",
        "Haus",
        "Igel",
        "Junge",
        "Katz",
        "Lama",
        "Mann",
        "Nase",
        "Ochse",
        "Pferd",
    ],
};

export const wordLists: WordList[] = [
    initialSelectedWordList,
    german10,
    german20,
];
