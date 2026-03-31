import { createServer, Model, hasMany, belongsTo } from "miragejs";

import { IClass } from "../../types/IClass";
import { ISchool } from "../../types/ISchool";

export function makeServer() {
  createServer({
    models: {
      school: Model.extend({
        classes: hasMany(),
      }),

      class: Model.extend({
        school: belongsTo(),
      }),
    },

    routes() {
      this.namespace = "api";

      this.get("/schools", (schema: any, request: any) => {
        const page = Number(request.queryParams.page) || 1;
        const limit = Number(request.queryParams.limit) || 10;
        const search = request.queryParams.search?.toLowerCase() || "";

        let all = schema.all("school").models;

        if (search) {
          all = all.filter(
            (school: any) =>
              school.name.toLowerCase().includes(search) ||
              school.address.toLowerCase().includes(search),
          );
        }

        const start = (page - 1) * limit;
        const end = start + limit;

        const paginated = all.slice(start, end);

        return {
          schools: paginated,
          meta: {
            page,
            limit,
            total: all.length,
            hasNextPage: end < all.length,
          },
        };
      });

      this.get("/schools/:id", (schema: any, request: any) => {
        const id = request.params.id;
        return schema.find("school", id);
      });

      this.post("/schools", (schema: any, request: any) => {
        const data: ISchool = JSON.parse(request.requestBody);
        return schema.create("school", data);
      });

      this.put("/schools/:id", (schema: any, request: any) => {
        const id = request.params.id;
        const attrs = JSON.parse(request.requestBody);

        const record = schema.schools.find(id);

        if (!record) return {};

        record.update(attrs);

        return {
          school: record.attrs,
        };
      });

      this.delete("/schools/:id", (schema: any, request: any) => {
        const id = request.params.id;
        schema.find("school", id)?.destroy();
        return {};
      });

      // CLASSES

      this.get("/classes", (schema: any, request: any) => {
        const page = Number(request.queryParams.page) || 1;
        const limit = Number(request.queryParams.limit) || 10;

        const schoolId = request.queryParams.schoolId;

        let all = schema.all("class").models;

        if (schoolId) {
          all = all.filter((classe: any) => {
            return (
              classe.schoolId === schoolId || classe.school?.id === schoolId
            );
          });
        }

        const start = (page - 1) * limit;
        const end = start + limit;
        const paginated = all.slice(start, end);

        return {
          classes: paginated,
          meta: {
            page,
            limit,
            total: all.length,
            hasNextPage: end < all.length,
          },
        };
      });

      this.get("/classes/:id", (schema: any, request: any) => {
        const id = request.params.id;
        return schema.find("class", id);
      });

      this.post("/classes", (schema: any, request: any) => {
        const data: IClass = JSON.parse(request.requestBody);

        return schema.create("class", {
          ...data,
          school: schema.find("school", data.schoolId),
        });
      });

      this.put("/classes/:id", (schema: any, request: any) => {
        const id = request.params.id;
        const data: Partial<IClass> = JSON.parse(request.requestBody);

        const record = schema.find("class", id);
        if (!record) return {};

        record.update({
          ...data,
          ...(data.schoolId && {
            school: schema.find("school", data.schoolId),
          }),
        });

        return record;
      });

      this.delete("/classes/:id", (schema: any, request: any) => {
        const id = request.params.id;
        schema.find("class", id)?.destroy();
        return {};
      });
    },
  });
}
