import { useLocalSearchParams, useRouter } from "expo-router";
import {
  useCreateClass,
  useDeleteClass,
  useInfiniteClasses,
  useUpdateClass,
} from "../../../hooks/useClass.ts";
import { IClass } from "../../../types/IClass/index.js";
import { useForm } from "react-hook-form";
import { useState } from "react";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Toast from "react-native-toast-message";

const classSchema = z.object({
  name: z.string().nonempty("Endereço obrigatório"),
  turno: z.string().nonempty("Endereço obrigatório"),
  anoLetivo: z.string().nonempty("Ano Letivo obrigatório"),
});

type ClassFormData = z.infer<typeof classSchema>;

export default function useClassesController() {
  const router = useRouter();
  const { schoolId, schoolName } = useLocalSearchParams<{
    schoolId: string;
    schoolName: string;
  }>();
  const [modalOpen, setModalOpen] = useState(false);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching } =
    useInfiniteClasses(schoolId);
  const [showDeleteAlertDialog, setShowDeleteAlertDialog] = useState(false);
  const [editingClass, setEditingClass] = useState<IClass | null>(null);
  const createClassMutation = useCreateClass(schoolId);
  const updateClassMutation = useUpdateClass(schoolId);
  const deleteClassMutation = useDeleteClass(schoolId);
  const [classToDelete, setClassToDelete] = useState<string | null>(null);

  const { control, handleSubmit, reset, setValue } = useForm({
    resolver: zodResolver(classSchema),
  });

  const handleEdit = (classe: IClass) => {
    setEditingClass(classe);
    setValue("name", classe.name);
    setValue("turno", classe.turno);
    setValue("anoLetivo", classe.anoLetivo);
    setModalOpen(true);
  };

  const handleAdd = () => {
    setEditingClass(null);
    reset({ name: "", turno: "", anoLetivo: "" });
    setModalOpen(true);
  };

  const handleDelete = async () => {
    if (classToDelete) {
      await deleteClassMutation.mutateAsync(classToDelete);

      Toast.show({
        type: "success",
        text1: "Excluído com sucesso",
      });
      setShowDeleteAlertDialog(false);
      setClassToDelete(null);
    }
  };

  const confirmDelete = (id: string) => {
    setClassToDelete(id);
    setShowDeleteAlertDialog(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingClass(null);
    reset();
  };
  const onSubmit = async (formData: ClassFormData) => {
    if (editingClass) {
      await updateClassMutation.mutateAsync({
        id: editingClass.id,
        data: formData,
      });

      Toast.show({
        type: "success",
        text1: "Editado com sucesso",
      });
    } else {
      await createClassMutation.mutateAsync({
        ...formData,
        schoolId,
      });
      Toast.show({
        type: "success",
        text1: "Cadastrado com sucesso",
      });
    }
    closeModal();
  };

  const classes = data?.pages.flatMap((page) => page.classes) || [];

  return {
    classes,
    schoolName,
    isLoading:
      isFetchingNextPage ||
      isFetching ||
      createClassMutation.isPending ||
      updateClassMutation.isPending,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    confirmDelete,
    handleEdit,
    handleAdd,
    modalOpen,
    setModalOpen,
    closeModal,
    isEditing: !!editingClass,
    control,
    handleSubmit,
    onSubmit,
    showDeleteAlertDialog,
    setShowDeleteAlertDialog,
    handleDelete,
    router,
  };
}
