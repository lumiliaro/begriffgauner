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
import { useBoundStore } from "@/app/store/store";

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
    const setSelectedImposter = useBoundStore(
        (state) => state.setSelectedImposter
    );

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            isDismissable={false}
            placement="center"
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">
                            Your word
                        </ModalHeader>
                        <ModalBody>
                            <p>
                                Do you really want to select player{" "}
                                <span className="font-bold">{playerName}</span>{" "}
                                as the imposter?
                            </p>
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                color="danger"
                                onPress={() => {
                                    setSelectedImposter(playerName);
                                    onClose();
                                }}
                            >
                                Confirm
                            </Button>
                            <Button color="default" onPress={onClose}>
                                Close
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}
