"use client";

import { title } from "@/components/primitives";
import { Button } from "@nextui-org/button";
import { useBoundStore } from "../store/store";
import { useCallback, useEffect, useState } from "react";
import { Chip } from "@nextui-org/chip";
import { useRouter } from "next/navigation";
import { useDisclosure } from "@nextui-org/modal";
import ModalShowWord from "@/components/modal-show-word";

export default function GamePage() {
    const playerCount = useBoundStore((state) => state.playerCount);
    const currentWord = useBoundStore((state) => state.currentWord);
    const currentPlayerIndex = useBoundStore(
        (state) => state.currentPlayerIndex
    );
    const players = useBoundStore((state) => state.players);
    const setNextPlayersTurn = useBoundStore(
        (state) => state.setNextPlayersTurn
    );
    const shufflePlayers = useBoundStore((state) => state.shufflePlayers);
    const setRandomWord = useBoundStore((state) => state.setRandomWord);
    const setRandomImposter = useBoundStore((state) => state.setRandomImposter);
    const resetImposter = useBoundStore((state) => state.resetImposter);
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    useEffect(() => {
        // Initial Loading
        shufflePlayers();
        resetImposter();
        setRandomImposter();
    }, [shufflePlayers, setRandomImposter, resetImposter]);

    useEffect(() => {
        if (currentWord === "") {
            setRandomWord();
        }
    }, [currentWord, setRandomWord]);

    const handleNextPlayerTurnClick = useCallback(() => {
        if (currentPlayerIndex !== playerCount - 1) {
            setNextPlayersTurn();
        } else router.push("round-end");
    }, [currentPlayerIndex, playerCount, setNextPlayersTurn, router]);

    return (
        <div className="flex w-full max-w-lg flex-col gap-4">
            <h1 className={title()}>
                It is player {players[currentPlayerIndex].name}&apos;s turn
            </h1>
            <Button color="primary" onPress={onOpen} isLoading={loading}>
                View word
            </Button>
            <ModalShowWord
                isOpen={isOpen}
                word={!players[currentPlayerIndex].imposter ? currentWord : ""}
                onOpenChange={onOpenChange}
            />
            <Button
                color="danger"
                onPress={handleNextPlayerTurnClick}
                isLoading={loading}
            >
                Next player
            </Button>
            <div className="text-center">
                <Chip>
                    Spieler {currentPlayerIndex + 1} / {playerCount}
                </Chip>
            </div>
        </div>
    );
}
