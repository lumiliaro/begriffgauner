"use client";

import { useBoundStore } from "@/app/store/store";
import { Select, SelectItem } from "@nextui-org/select";
import { ReactElement, useState } from "react";

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

export default function SelectPlayer(): ReactElement {
    const playerCount = useBoundStore((state) => state.playerCount);
    const setPlayerCount = useBoundStore((state) => state.setPlayerCount);

    const handleSelectionChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const value = Number(event.target.value);

        if (!isNaN(value)) {
            setPlayerCount(value);
        }
    };

    return (
        <Select
            size="lg"
            label="Number of players"
            selectionMode="single"
            className="max-w-lg"
            selectedKeys={[playerCount.toString()]}
            onChange={handleSelectionChange}
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
