"use client";

import { Select, SelectItem } from "@nextui-org/select";
import { FieldHookConfig, useField } from "formik";
import { ReactElement } from "react";

export type PlayerCountType = {
    label: string;
    value: number;
};

const playerCountOptions: PlayerCountType[] = [
    { label: "Three", value: 3 },
    { label: "Four", value: 4 },
    { label: "Five", value: 5 },
    { label: "Six", value: 6 },
    { label: "Seven", value: 7 },
    { label: "Eight", value: 8 },
    { label: "Nine", value: 9 },
    { label: "Ten", value: 10 },
];

export default function SelectPlayer(
    props: FieldHookConfig<string>
): ReactElement {
    const [field, meta] = useField(props);

    return (
        <Select
            {...field}
            size="lg"
            label="Number of players"
            selectionMode="single"
            className="max-w-lg"
            selectedKeys={[meta.value]}
            errorMessage={meta.touched && meta.error ? meta.error : undefined}
        >
            {playerCountOptions.map((item: PlayerCountType) => {
                return (
                    <SelectItem key={item.value} value={item.value}>
                        {item.label}
                    </SelectItem>
                );
            })}
        </Select>
    );
}
