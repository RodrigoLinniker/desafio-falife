import { IClass } from "../../../types/IClass";
import api from "../../api";

export type CreateClassDTO = Omit<IClass, "id">;
export type UpdateClassDTO = Partial<IClass>;

export const classRepository = {
  getAll: async ({
    page = 1,
    limit = 10,
    search = "",
    schoolId = "",
  }: {
    page?: number;
    limit?: number;
    search?: string;
    schoolId?: string;
  }) => {
    const { data } = await api.get("/classes", {
      params: { page, limit, search, schoolId },
    });

    return data;
  },

  getById: async (id: string): Promise<IClass> => {
    const { data } = await api.get(`/classes/${id}`);
    return data.class;
  },

  create: async (payload: Omit<IClass, "id">): Promise<IClass> => {
    const { data } = await api.post("/classes", payload);
    return data.class;
  },

  update: async (id: string, payload: UpdateClassDTO): Promise<IClass> => {
    const { data } = await api.put(`/classes/${id}`, payload);
    return data.class;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/classes/${id}`);
  },
};
