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
    playerName: string;
    isOpen: boolean;
    onOpenChange?: (isOpen: boolean) => void;
}

export default function ModalConfirmImposterSelection({
    playerName,
    isOpen,
    onOpenChange,
}: ModalShowWordProps): ReactElement {
    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            isDismissable={false}
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">
                            Your word
                        </ModalHeader>
                        <ModalBody>
                            <p>
                                Do you really want to select player {playerName}{" "}
                                as the imposter?
                            </p>
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                color="danger"
                                variant="light"
                                onPress={onClose}
                            >
                                Confirm
                            </Button>
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