import { View, FlatList, TouchableOpacity } from "react-native";

import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  Button,
  ButtonGroup,
  ButtonText,
  Heading,
  Input,
  InputField,
  Modal,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import useHomeController from "./useHomeController";
import { Loading } from "../../components/Loading";
import { FormControlledInput } from "../../components/FormControlledInput";
import { ConfirmDeleteDialog } from "../../components/ConfirmDeleteDialog";

export default function Home() {
  const {
    schools,
    search,
    setSearch,
    modalOpen,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    control,
    handleSubmit,
    onSubmit,
    handleEdit,
    handleAdd,
    isLoading,
    closeModal,
    isEditing,
    confirmDelete,
    handleDelete,
    showDeleteAlertDialog,
    setShowDeleteAlertDialog,
    router,
  } = useHomeController();

  return (
    <View className="flex-1">
      <Input className="m-4">
        <InputField
          value={search}
          onChangeText={setSearch}
          placeholder="Buscar escola..."
        />
      </Input>

      {isLoading && !schools.length ? (
        <Loading />
      ) : (
        <View className="flex-1 py-4">
          <>
            <View className="flex-1 px-4">
              <FlatList
                data={schools}
                keyExtractor={(item) => item.id}
                ListEmptyComponent={
                  <View className="flex-1 items-center justify-center">
                    <Text>Não há escolas cadastradas</Text>
                  </View>
                }
                renderItem={({ item }) => (
                  <VStack className="p-4 mb-2 border border-gray-300 rounded-md">
                    <Text fontWeight={"$bold"}>Escola: {item.name}</Text>
                    <Text fontSize={"$sm"}>Endereço: {item.address}</Text>
                    <View className="flex-row  w-full gap-2 mt-2">
                      <Button
                        size="sm"
                        onPress={() =>
                          router.push({
                            pathname: "/classes",
                            params: {
                              schoolId: item.id,
                              schoolName: item.name,
                            },
                          })
                        }
                      >
                        <ButtonText className="text-white">
                          Ver Turmas
                        </ButtonText>
                      </Button>

                      <Button
                        size="sm"
                        mt={2}
                        onPress={() => handleEdit(item)}
                        disabled={isLoading}
                      >
                        <ButtonText className="text-white">Editar</ButtonText>
                      </Button>

                      <Button
                        size="sm"
                        bgColor="$red600"
                        onPress={() => confirmDelete(item.id)}
                        disabled={isLoading}
                      >
                        <ButtonText className="text-white">Excluir</ButtonText>
                      </Button>
                    </View>
                  </VStack>
                )}
                onEndReached={() => {
                  if (hasNextPage && !isFetchingNextPage) fetchNextPage();
                }}
                onEndReachedThreshold={0.5}
              />
            </View>

            <View className="p-4 bg-stroke">
              <Button mt={4} onPress={handleAdd} disabled={isLoading}>
                <ButtonText className="text-white">Cadastrar Escola</ButtonText>
              </Button>
            </View>
          </>

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
                  {isEditing ? "Editar Escola" : "Nova Escola"}
                </Text>

                <FormControlledInput
                  control={control}
                  name="name"
                  placeholder="Nome da escola"
                  label="Nome"
                />

                <FormControlledInput
                  control={control}
                  name="address"
                  placeholder="Endereço"
                  label="Endereço"
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
            description="Tem certeza que deseja excluir esta escola?"
          />
        </View>
      )}
    </View>
  );
}
