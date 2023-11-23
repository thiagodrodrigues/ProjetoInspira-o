import { IUsersEntity } from "./user.entity";

export interface IFisioterapistEntity extends IUsersEntity {
  id?: number,
  crefito: string,
}