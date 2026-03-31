import {
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import {
  classRepository,
  CreateClassDTO,
  UpdateClassDTO,
} from "../../services/repositories/classSection";

const QUERY_KEY = "classes";

export const useInfiniteClasses = (schoolId: string) => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEY, schoolId],

    initialPageParam: 1,

    queryFn: ({ pageParam }) =>
      classRepository.getAll({
        page: pageParam as number,
        schoolId,
      }),

    getNextPageParam: (lastPage) => {
      return lastPage.meta.hasNextPage ? lastPage.meta.page + 1 : undefined;
    },
  });
};

export const useCreateClass = (schoolId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateClassDTO) => classRepository.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, schoolId] });
    },
  });
};

export const useUpdateClass = (schoolId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateClassDTO }) =>
      classRepository.update(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, schoolId] });
    },
  });
};

export const useDeleteClass = (schoolId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => classRepository.delete(id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, schoolId] });
    },
  });
};
