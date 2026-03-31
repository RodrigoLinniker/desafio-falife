import React from "react";
import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
  ButtonGroup,
  ButtonText,
  Heading,
  Text,
} from "@gluestack-ui/themed";

interface ConfirmDeleteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
  title?: string;
  description?: string;
}

export const ConfirmDeleteDialog = ({
  isOpen,
  onClose,
  onConfirm,
  isLoading = false,
  title = "Confirmar exclusão",
  description = "Tem certeza que deseja excluir este item? Esta ação não pode ser desfeita.",
}: ConfirmDeleteDialogProps) => {
  return (
    <AlertDialog isOpen={isOpen} onClose={onClose}>
      <AlertDialogBackdrop />
      <AlertDialogContent>
        <AlertDialogHeader>
          <Heading size="lg">{title}</Heading>
        </AlertDialogHeader>
        <AlertDialogBody>
          <Text size="sm">{description}</Text>
        </AlertDialogBody>
        <AlertDialogFooter>
          <ButtonGroup space="lg">
            <Button
              variant="outline"
              action="secondary"
              onPress={onClose}
              disabled={isLoading}
            >
              <ButtonText>Cancelar</ButtonText>
            </Button>
            <Button
              bg="$red600"
              action="negative"
              onPress={onConfirm}
              disabled={isLoading}
            >
              <ButtonText className="text-white">
                {isLoading ? "Excluindo..." : "Excluir"}
              </ButtonText>
            </Button>
          </ButtonGroup>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
