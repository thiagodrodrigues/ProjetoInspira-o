import { IUsersEntity } from "./user.entity";

export interface IFisioterapistEntity extends IUsersEntity {
  idFisioterapist?: number,
  crefito: string,
}