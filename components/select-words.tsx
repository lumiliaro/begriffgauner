"use client";

import { useBoundStore } from "@/app/store/store";
import { wordLists } from "@/app/utils/wordlists";
import { Select, SelectItem } from "@nextui-org/select";
import { ReactElement } from "react";

export default function SelectWords(): ReactElement {
    const setWords = useBoundStore((state) => state.setWords);
    const setSelectedWordList = useBoundStore(
        (state) => state.setSelectedWordList
    );
    const selectedWordList = useBoundStore((state) => state.selectedWordList);

    const handleSelectionChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const wordList = wordLists.filter(
            (wordList) => wordList.value === event.target.value
        )[0];

        if (wordList) {
            setSelectedWordList(wordList);
            setWords(wordList.words);
        }
    };

    return (
        <Select
            size="lg"
            label="Words"
            selectionMode="single"
            className="max-w-lg"
            disabledKeys={[""]}
            selectedKeys={[selectedWordList.value]}
            onChange={handleSelectionChange}
        >
            {wordLists.map((wordList) => {
                return (
                    <SelectItem key={wordList.value} value={wordList.value}>
                        {wordList.label}
                    </SelectItem>
                );
            })}
        </Select>
    );
}
