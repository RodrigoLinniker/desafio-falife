import { Stack } from "expo-router";
import { View, FlatList, TouchableOpacity } from "react-native";
import { VStack, Text, Button, ButtonText, Modal } from "@gluestack-ui/themed";
import { Loading } from "../../../components/Loading";
import useClassesController from "./useClassesController";
import { FormControlledInput } from "../../../components/FormControlledInput";
import { ConfirmDeleteDialog } from "../../../components/ConfirmDeleteDialog";

export default function Classes() {
  const {
    classes,
    schoolName,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    handleEdit,
    confirmDelete,
    modalOpen,
    closeModal,
    isEditing,
    control,
    handleSubmit,
    onSubmit,
    showDeleteAlertDialog,
    setShowDeleteAlertDialog,
    handleDelete,
    handleAdd,
    router,
  } = useClassesController();

  return (
    <View className="flex-1">
      <Stack.Screen options={{ title: `Turmas: ${schoolName}` }} />

      {isLoading && !classes.length ? (
        <Loading />
      ) : (
        <View className="flex-1 p-4">
          <FlatList
            data={classes}
            keyExtractor={(item) => item.id}
            ListEmptyComponent={
              <View className="flex-1 items-center justify-center">
                <Text> Nenhuma turma encontrada.</Text>
              </View>
            }
            renderItem={({ item }) => (
              <VStack className="p-4 mb-2 border border-gray-300 rounded-md bg-white">
                <Text fontWeight="$bold" size="lg">
                  {item.name}
                </Text>
                <Text size="sm">
                  Turno: {item.turno} | Ano: {item.anoLetivo}
                </Text>

                <View className="flex-row gap-2 mt-3">
                  <Button
                    size="xs"
                    action="primary"
                    onPress={() => handleEdit(item)}
                    disabled={isLoading}
                  >
                    <ButtonText>Editar</ButtonText>
                  </Button>
                  <Button
                    size="xs"
                    action="negative"
                    onPress={() => confirmDelete(item.id)}
                    disabled={isLoading}
                  >
                    <ButtonText>Excluir</ButtonText>
                  </Button>
                </View>
              </VStack>
            )}
            onEndReached={() => {
              if (hasNextPage && !isFetchingNextPage) fetchNextPage();
            }}
            onEndReachedThreshold={0.5}
          />

          <Button mt={4} onPress={handleAdd} disabled={isLoading}>
            <ButtonText>Nova Turma</ButtonText>
          </Button>
          <Button mt={4} onPress={() => router.back()} disabled={isLoading}>
            <ButtonText>Voltar</ButtonText>
          </Button>
        </View>
      )}

      <Modal isOpen={modalOpen} onClose={() => closeModal()}>
        <View className="absolute inset-0 justify-center items-center">
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => closeModal()}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            style={{ zIndex: 0 }}
          />

          <View className="bg-white rounded-lg p-6 w-11/12 max-w-md z-10 gap-2">
            <Text fontSize={"$lg"} fontWeight={"$bold"}>
              {isEditing ? "Editar Turma" : "Nova Turma"}
            </Text>

            <FormControlledInput
              control={control}
              name="name"
              placeholder="Nome da turma"
              label="Nome"
            />

            <FormControlledInput
              control={control}
              name="turno"
              placeholder="Turno"
              label="Turno"
            />
            <FormControlledInput
              control={control}
              name="anoLetivo"
              placeholder="Ano Letivo"
              label="Ano Letivo"
            />
            <Button onPress={handleSubmit(onSubmit)} disabled={isLoading}>
              <ButtonText className="text-white">
                {isEditing ? "Salvar Alterações" : "Cadastrar"}
              </ButtonText>
            </Button>
          </View>
        </View>
      </Modal>
      <ConfirmDeleteDialog
        isOpen={showDeleteAlertDialog}
        onClose={() => setShowDeleteAlertDialog(false)}
        onConfirm={handleDelete}
        isLoading={isLoading}
        description="Tem certeza que deseja excluir esta turma?"
      />
    </View>
  );
}
