import { useState } from "react";
import {
  useCreateSchool,
  useDeleteSchool,
  useInfiniteSchools,
  useUpdateSchool,
} from "../../hooks/useSchools";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ISchool } from "../../types/ISchool";
import Toast from "react-native-toast-message";
import { useRouter } from "expo-router";

const schoolSchema = z.object({
  name: z.string().min(2, "Nome obrigatório"),
  address: z.string().min(5, "Endereço obrigatório"),
});

export default function useHomeController() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [showDeleteAlertDialog, setShowDeleteAlertDialog] = useState(false);
  const [schoolToDelete, setSchoolToDelete] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingSchool, setEditingSchool] = useState<ISchool | null>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching } =
    useInfiniteSchools(search);

  const createSchoolMutation = useCreateSchool();
  const updateSchoolMutation = useUpdateSchool();
  const deleteSchoolMutation = useDeleteSchool();

  const { control, handleSubmit, reset, setValue } = useForm({
    resolver: zodResolver(schoolSchema),
  });

  const handleEdit = (school: ISchool) => {
    setEditingSchool(school);
    setValue("name", school.name);
    setValue("address", school.address);
    setModalOpen(true);
  };

  const handleAdd = () => {
    setEditingSchool(null);
    reset({ name: "", address: "" });
    setModalOpen(true);
  };

  const handleDelete = async () => {
    if (schoolToDelete) {
      await deleteSchoolMutation.mutateAsync(schoolToDelete);

      Toast.show({
        type: "success",
        text1: "Excluído com sucesso",
      });
      setShowDeleteAlertDialog(false);
      setSchoolToDelete(null);
    }
  };

  const confirmDelete = (id: string) => {
    setSchoolToDelete(id);
    setShowDeleteAlertDialog(true);
  };

  const onSubmit = async (formData: any) => {
    if (editingSchool) {
      await updateSchoolMutation.mutateAsync({
        id: editingSchool.id,
        data: formData,
      });

      Toast.show({
        type: "success",
        text1: "Editado com sucesso",
      });
    } else {
      await createSchoolMutation.mutateAsync(formData);
      Toast.show({
        type: "success",
        text1: "Cadastrado com sucesso",
      });
    }
    closeModal();
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingSchool(null);
    reset();
  };

  const schools = data?.pages.flatMap((page) => page.schools) || [];

  return {
    search,
    setSearch,
    schools,
    modalOpen,
    setModalOpen,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    control,
    handleSubmit,
    onSubmit,
    isLoading:
      isFetchingNextPage ||
      isFetching ||
      createSchoolMutation.isPending ||
      deleteSchoolMutation.isPending ||
      updateSchoolMutation.isPending,
    handleEdit,
    handleAdd,
    closeModal,
    confirmDelete,
    handleDelete,
    showDeleteAlertDialog,
    setShowDeleteAlertDialog,
    isDeleting: deleteSchoolMutation.isPending,
    isEditing: !!editingSchool,
    router,
  };
}
