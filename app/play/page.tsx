"use client";

import { title } from "@/components/primitives";
import SelectPlayer from "@/components/select-player";
import SelectWords from "@/components/select-words";
import { Button } from "@nextui-org/button";
import { useBoundStore } from "../store/store";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PlayForm, playFormSchema } from "../utils/schemas";
import { SafeParseError } from "zod";

export default function PlayPage() {
    const playerCount = useBoundStore((state) => state.playerCount);
    const selectedWordList = useBoundStore((state) => state.selectedWordList);
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);
    const [errors, setErrors] = useState<SafeParseError<PlayForm>>();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        setLoading(true);
        event.preventDefault();

        try {
            const validatedData = playFormSchema.safeParse({
                playerCount: playerCount,
                wordList: selectedWordList,
            });

            if (!validatedData.success) {
                setLoading(false);
                setErrors(validatedData);
                return;
            }

            router.push("player-input");
        } catch (error: any) {
            console.error(error.message);
        }
    };
    return (
        <form
            className="flex w-full max-w-xs flex-col gap-4"
            onSubmit={handleSubmit}
        >
            <h1 className={title()}>Game Settings</h1>
            <SelectPlayer
                errorMessage={errors?.error?.format().playerCount?._errors}
            />
            <SelectWords
                errorMessage={errors?.error?.format().wordList?._errors}
            />
            <Button type="submit" color="success" isLoading={loading}>
                Play
            </Button>
        </form>
    );
}
