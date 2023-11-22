"use client";

import { title } from "@/components/primitives";
import { Button } from "@nextui-org/button";
import { Chip } from "@nextui-org/chip";
import ModalShowWord from "@/components/modal-show-word";
import { Form, Formik } from "formik";
import { GameSchema } from "../utils/schemas";
import { useBoundStore } from "../store/store";
import { useDisclosure } from "@nextui-org/modal";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function GamePage() {
    const currentRound = useBoundStore((state) => state.currentRound);
    const maxRoundNumber = useBoundStore((state) => state.numberOfPlayers);
    const currentWord = useBoundStore((state) => state.currentWord);
    const players = useBoundStore((state) => state.players);
    const setNextPlayersTurn = useBoundStore(
        (state) => state.setNextPlayersTurn
    );
    const setRandomImposter = useBoundStore((state) => state.setRandomImposter);
    const setRandomWord = useBoundStore((state) => state.setRandomWord);
    const endRound = useBoundStore((state) => state.endRound);

    const [wordViewed, setWordViewed] = useState<boolean>(false);
    const { isOpen, onOpen, onOpenChange } = useDisclosure({
        defaultOpen: false,
        onClose: () => setWordViewed(true),
    });
    const router = useRouter();

    const playerName = players[currentRound] ? players[currentRound].name : "";
    const isPlayerImposter = players[currentRound]
        ? players[currentRound].imposter
        : false;

    useEffect(() => {
        setRandomImposter();
        setRandomWord();
    }, [setRandomImposter, setRandomWord]);

    return (
        <Formik
            initialValues={{}}
            validationSchema={GameSchema}
            onSubmit={(values, helpers) => {
                if (currentRound !== maxRoundNumber - 1) {
                    setWordViewed(false);
                    setNextPlayersTurn();
                    helpers.setSubmitting(false);
                } else {
                    endRound();
                    router.push("round-end");
                }
            }}
        >
            {(formik) => (
                <Form className="flex w-full max-w-xs flex-col gap-4">
                    <h1 className={title()}>
                        It is player {playerName}
                        &apos;s turn
                    </h1>
                    <Button
                        color="primary"
                        onPress={onOpen}
                        disabled={formik.isSubmitting}
                        isLoading={formik.isSubmitting}
                    >
                        View word
                    </Button>
                    <ModalShowWord
                        isOpen={isOpen}
                        word={isPlayerImposter ? "" : currentWord}
                        onOpenChange={onOpenChange}
                    />
                    <Button
                        color="danger"
                        type="submit"
                        isLoading={formik.isSubmitting}
                        isDisabled={!wordViewed}
                    >
                        {currentRound + 1 !== maxRoundNumber
                            ? "Next player"
                            : "End game"}
                    </Button>
                    <div className="text-center">
                        <Chip>
                            Spieler {currentRound + 1} / {maxRoundNumber}
                        </Chip>
                    </div>
                </Form>
            )}
        </Formik>
    );
}
