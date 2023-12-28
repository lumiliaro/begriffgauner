"use client";

import { Button } from "@nextui-org/button";
import { useBoundStore } from "../store/store";
import { useRouter } from "next/navigation";
import { FieldArray, Form, Formik } from "formik";
import { PlayerInputSchema } from "../utils/schemas";
import InputPlayer from "@/components/input-player";

export default function PlayerInputPage() {
    const numberOfPlayers = useBoundStore((state) => state.numberOfPlayers);
    const playersState = useBoundStore((state) => state.players);
    const setPlayers = useBoundStore((state) => state.setPlayers);
    const router = useRouter();

    let players: string[] = playersState.map((player) => player.name);

    if (players.length !== numberOfPlayers) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        players = Array(numberOfPlayers).fill("");
    }

    return (
        <Formik
            initialValues={{
                players,
            }}
            validationSchema={PlayerInputSchema}
            onSubmit={(values, helpers) => {
                setPlayers(values.players);
                helpers.setSubmitting(false);
                router.push("game");
            }}
        >
            {(formik) => (
                <Form className="flex w-full max-w-xs flex-col gap-4">
                    <FieldArray
                        name="players"
                        render={() => (
                            <>
                                {formik.values.players.map(
                                    (_: string, index: number) => (
                                        <div key={`player${index}`}>
                                            <InputPlayer
                                                name={`players.${index}`}
                                                label={`Player ${++index}`}
                                            />
                                        </div>
                                    )
                                )}
                            </>
                        )}
                    />

                    <Button
                        color="success"
                        type="submit"
                        isLoading={formik.isSubmitting}
                    >
                        Start game
                    </Button>
                </Form>
            )}
        </Formik>
    );
}
