"use client";

import { ReactElement } from "react";
import { Button } from "@nextui-org/button";
import {
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
} from "@nextui-org/modal";

interface ModalShowWordProps {
    word: string;
    isOpen: boolean;
    onOpenChange?: (isOpen: boolean) => void;
}

export default function ModalShowWord({
    word,
    isOpen,
    onOpenChange,
}: ModalShowWordProps): ReactElement {
    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">
                            Your word
                        </ModalHeader>
                        <ModalBody>
                            {word !== "" ? (
                                <p>The word is: {word}</p>
                            ) : (
                                <>You are the imposter</>
                            )}
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                color="danger"
                                variant="light"
                                onPress={onClose}
                            >
                                Close
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}
