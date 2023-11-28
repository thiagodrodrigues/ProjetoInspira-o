import { IUsersEntity } from "./user.entity";

export interface IPatientEntity extends IUsersEntity {
  idPatient?: number,
  phone: string,
  birth: string,
  sex: string,
  profession?: string,
  medical?: string,
  lifestyle?: string,
  condition?: string,
  comments?: string,
}