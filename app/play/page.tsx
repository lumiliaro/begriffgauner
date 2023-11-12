"use client";

import { title } from "@/components/primitives";
import SelectPlayer from "@/components/select-player";
import SelectWords from "@/components/select-words";
import { Button } from "@nextui-org/button";
import { useBoundStore } from "../store/store";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PlayPage() {
    const words = useBoundStore((state) => state.words);
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);

    return (
        <div className="flex w-full max-w-xs flex-col gap-4">
            <h1 className={title()}>Game Settings</h1>
            <SelectPlayer />
            <SelectWords />
            <Button
                color="success"
                onClick={() => {
                    if (words.length > 0) {
                        setLoading(true);
                        router.push("player-input");
                    }
                }}
                isLoading={loading}
            >
                Play
            </Button>
        </div>
    );
}
