"use client";

import { title } from "@/components/primitives";
import { Button } from "@nextui-org/button";
import { useBoundStore } from "../store/store";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useDisclosure } from "@nextui-org/modal";
import ModalConfirmImposterSelection from "@/components/modal-confirm-imposter-selection";

function randomInRange(min: number, max: number) {
    return Math.random() * (max - min) + min;
}

export default function RoundEndPage() {
    const players = useBoundStore((state) => state.players);
    const endRound = useBoundStore((state) => state.endRound);
    const selectedImposter = useBoundStore((state) => state.selectedImposter);
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedPlayer, setSelectedPlayer] = useState<number>(-1);
    const [isImposterFound, setIsImposterFound] = useState<boolean>();

    const { isOpen, onOpen, onOpenChange } = useDisclosure({
        defaultOpen: false,
    });

    const handleNewRoundClick = useCallback(() => {
        if (selectedImposter !== "") {
            setLoading(true);
            endRound();
            router.push("game");
        } else {
            alert("Please select an imposter");
        }
    }, [selectedImposter, router, endRound]);

    const selectefPlayerName = players[selectedPlayer]
        ? players[selectedPlayer].name
        : "";

    useEffect(() => {
        if (selectedImposter !== "") {
            const isImposterFound = players.filter(
                (player) => player.name === selectedImposter && player.imposter
            );

            setIsImposterFound(isImposterFound.length > 0);
        }
    }, [selectedImposter, players]);

    return (
        <div className="flex w-full max-w-md flex-col gap-4">
            <h1 className={title()}>Select the imposter</h1>
            {players.map((player, index) => (
                <Button
                    key={index}
                    onPress={() => {
                        onOpen();
                        setSelectedPlayer(index);
                    }}
                    isDisabled={selectedImposter !== ""}
                >
                    Select {player.name} as imposter
                </Button>
            ))}
            <ModalConfirmImposterSelection
                isOpen={isOpen}
                playerName={selectefPlayerName}
                onOpenChange={onOpenChange}
            />
            <Button
                color="success"
                onPress={handleNewRoundClick}
                isLoading={loading}
                isDisabled={selectedImposter === ""}
            >
                New round
            </Button>

            <p className="text-2xl">
                {selectedImposter !== ""
                    ? `The player ${selectedImposter} was ${
                          isImposterFound ? "" : "not"
                      } the imposter`
                    : null}
            </p>
        </div>
    );
}
