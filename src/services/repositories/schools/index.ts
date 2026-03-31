import { ISchool } from "../../../types/ISchool";
import api from "../../api";

export const schoolRepository = {
  getAll: async ({
    page = 1,
    limit = 10,
    search = "",
  }: {
    page?: number;
    limit?: number;
    search?: string;
  }) => {
    const { data } = await api.get("/schools", {
      params: { page, limit, search },
    });

    return data;
  },

  getById: async (id: string): Promise<ISchool> => {
    const { data } = await api.get(`/schools/${id}`);
    return data.school;
  },

  create: async (payload: {
    name: string;
    address: string;
  }): Promise<ISchool> => {
    const { data } = await api.post("/schools", payload);
    return data.school;
  },

  update: async (id: string, payload: Partial<ISchool>): Promise<ISchool> => {
    const { data } = await api.put(`/schools/${id}`, payload);
    return data.school;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/schools/${id}`);
  },
};
