import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";

import { schoolRepository } from "../../services/repositories/schools";
import { ISchool } from "../../types/ISchool";

const QUERY_KEY = "schools";

interface InfiniteSchoolsResponse {
  schools: ISchool[];
  meta: {
    page: number;
    limit: number;
    total: number;
    hasNextPage: boolean;
  };
}

export const useInfiniteSchools = (search: string = "") => {
  return useInfiniteQuery<InfiniteSchoolsResponse>({
    queryKey: [QUERY_KEY, search],
    queryFn: async ({ pageParam = 1 }) => {
      const page = typeof pageParam === "number" ? pageParam : 1;
      const data = await schoolRepository.getAll({
        page,
        search: search,
      });
      return data;
    },

    getNextPageParam: (lastPage) =>
      lastPage.meta.hasNextPage ? lastPage.meta.page + 1 : undefined,
    initialPageParam: 1,
    staleTime: 0,
  });
};

export const useCreateSchool = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: schoolRepository.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    },
  });
};

export const useUpdateSchool = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<ISchool> }) =>
      schoolRepository.update(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    },
  });
};

export const useDeleteSchool = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: schoolRepository.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    },
  });
};
