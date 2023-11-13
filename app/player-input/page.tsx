"use client";

import { title } from "@/components/primitives";
import { Button } from "@nextui-org/button";
import { useBoundStore } from "../store/store";
import { useRouter } from "next/navigation";
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import { Input } from "@nextui-org/input";

export default function PlayerInputPage() {
    const playerCount = useBoundStore((state) => state.playerCount);
    const setPlayer = useBoundStore((state) => state.setPlayer);
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);
    const players = useBoundStore((state) => state.players);

    useEffect(() => {
        if (playerCount < 3) {
            router.push("/play");
        }
    }, [playerCount, router]);

    const handlePlayerChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            const inputIndex = event.target.id.replace("input-player-", "");

            if (inputIndex) {
                const playerIndex = Number(inputIndex);
                if (playerIndex >= 0 && !isNaN(playerIndex)) {
                    setPlayer(playerIndex, {
                        name: event.target.value,
                        onTurn: false,
                        imposter: false,
                        imposterWins: 0,
                        teamWins: 0,
                    });
                }
            }
        },
        [setPlayer]
    );

    const playerInputs = useMemo(() => {
        let inputs: React.ReactElement[] = [];

        for (let index = 0; index < playerCount; index++) {
            inputs.push(
                <Input
                    id={`input-player-${index}`}
                    key={`player${index}`}
                    type="text"
                    label={`Player ${index + 1}`}
                    onChange={handlePlayerChange}
                    minLength={1}
                    value={
                        players[index]?.name !== undefined
                            ? players[index].name
                            : ""
                    }
                />
            );
        }

        return inputs;
    }, [playerCount, handlePlayerChange, players]);

    if (playerCount < 3) {
        return <></>;
    }

    return (
        <div className="flex w-full max-w-xl flex-col gap-4">
            <h1 className={title()}>Enter player names</h1>
            {playerInputs}

            <Button
                color="success"
                onClick={() => {
                    setLoading(true);
                    router.push("game");
                }}
                isLoading={loading}
            >
                Start game
            </Button>
        </div>
    );
}
