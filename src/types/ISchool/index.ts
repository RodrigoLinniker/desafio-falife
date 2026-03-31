import { IClass } from "../IClass";

export interface ISchool {
  id: string;
  name: string;
  address: string;
  classes?: IClass[];
}
