"use client";

import { wordLists } from "@/config/wordlists";
import { Select, SelectItem } from "@nextui-org/select";
import { FieldHookConfig, useField } from "formik";
import { ReactElement } from "react";

export default function SelectWords(
    props: FieldHookConfig<string>
): ReactElement {
    const [field, meta] = useField(props);
    // const setWords = useBoundStore((state) => state.setWords);
    // const setSelectedWordList = useBoundStore(
    //     (state) => state.setSelectedWordList
    // );
    // const selectedWordList = useBoundStore((state) => state.selectedWordList);

    // const handleSelectionChange = (
    //     event: React.ChangeEvent<HTMLSelectElement>
    // ) => {
    //     const wordList = wordLists.filter(
    //         (wordList) => wordList.value === event.target.value
    //     )[0];

    //     if (wordList) {
    //         setSelectedWordList(wordList);
    //         setWords(wordList.words);
    //     }
    // };

    return (
        <Select
            {...field}
            size="lg"
            label="Words"
            name="wordList"
            selectionMode="single"
            className="max-w-lg"
            disabledKeys={[""]}
            selectedKeys={[meta.value]}
            // onChange={handleSelectionChange}
            isInvalid={meta.touched && meta.error ? true : false}
            errorMessage={meta.touched && meta.error ? meta.error : undefined}
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
