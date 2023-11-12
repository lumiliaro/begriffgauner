"use client";

import { title } from "@/components/primitives";
import { Button } from "@nextui-org/button";
import { useBoundStore } from "../store/store";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { PressEvent } from "@react-types/shared";

export default function RoundEndPage() {
    const players = useBoundStore((state) => state.players);
    const newRound = useBoundStore((state) => state.newRound);
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);
    const [imposterSelected, setImposterSelected] = useState<boolean>(false);

    const handleImposterSelected = (isImposter: boolean) => {
        setImposterSelected(true);
        console.log("Der Ausgewählte Spieler ist imposter: ", isImposter);
    };

    const handleNewRoundClick = useCallback(() => {
        if (imposterSelected) {
            setLoading(true);
            newRound();
            router.push("game");
        } else {
            alert("Please select an imposter");
        }
    }, [imposterSelected, router, newRound]);

    return (
        <div className="flex w-full max-w-xs flex-col gap-4">
            <h1 className={title()}>Game Settings</h1>
            {players.map((player, index) => (
                <Button
                    key={index}
                    onPress={(event: PressEvent) =>
                        handleImposterSelected(player.imposter)
                    }
                >
                    Select player {player.name} as Imposter
                </Button>
            ))}
            <Button
                color="success"
                onPress={handleNewRoundClick}
                isLoading={loading}
            >
                New round
            </Button>
        </div>
    );
}
