"use client";

import { title } from "@/components/primitives";
import SelectPlayer from "@/components/select-player";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import { Form, Formik } from "formik";
import SelectWords from "@/components/select-words";
import { button as buttonStyles } from "@nextui-org/theme";
import { useBoundStore } from "./store/store";
import { PlaySchema } from "./utils/schemas";
import { wordLists } from "./utils/wordlists";

export default function PlayPage() {
    const numberOfPlayers = useBoundStore((state) => state.numberOfPlayers);
    const setNumberOfPlayers = useBoundStore(
        (state) => state.setNumberOfPlayers
    );
    const setWordList = useBoundStore((state) => state.setWordList);
    const setWordCollection = useBoundStore((state) => state.setWordCollection);
    const wordList = useBoundStore((state) => state.wordList);
    const router = useRouter();

    return (
        <Formik
            initialValues={{
                numberOfPlayers: numberOfPlayers.toString(),
                wordList,
            }}
            validationSchema={PlaySchema}
            onSubmit={(values, helpers) => {
                // same shape as initial values
                setNumberOfPlayers(values.numberOfPlayers);
                setWordList(values.wordList);
                setWordCollection(
                    wordLists.filter(
                        (wordList) => wordList.value === values.wordList
                    )[0].words
                );
                helpers.setSubmitting(false);
                router.push("player-input");
            }}
        >
            {(formik) => (
                <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
                    <Form className="flex w-full max-w-xs flex-col gap-4">
                        <h1 className={title()}>Game Settings</h1>
                        <SelectPlayer name="numberOfPlayers" />
                        <SelectWords name="wordList" />
                        <Button
                            className={buttonStyles({
                                color: "success",
                                radius: "full",
                                variant: "shadow",
                            })}
                            type="submit"
                            isLoading={formik.isSubmitting}
                        >
                            Play
                        </Button>
                    </Form>
                </section>
            )}
        </Formik>
    );
}
