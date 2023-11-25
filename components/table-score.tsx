"use client";

import { useBoundStore } from "@/app/store/store";
import {
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
    getKeyValue,
} from "@nextui-org/table";
import { ReactElement } from "react";

const columns = [
    {
        key: "name",
        label: "PLAYER",
    },
    {
        key: "score",
        label: "SCORE",
    },
    {
        key: "imposterWins",
        label: "IMPOSTER WINS",
    },
    {
        key: "teamWins",
        label: "TEAM WINS",
    },
];

export default function TableScore(): ReactElement {
    const players = useBoundStore((state) => state.players);

    return (
        <Table aria-label="Example table with dynamic content">
            <TableHeader columns={columns}>
                {(column) => (
                    <TableColumn key={column.key}>{column.label}</TableColumn>
                )}
            </TableHeader>
            <TableBody items={players}>
                {(player) => (
                    <TableRow key={player.name}>
                        {(columnKey) => (
                            <TableCell>
                                {getKeyValue(player, columnKey)}
                            </TableCell>
                        )}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}
