import { IUsersEntity } from "./user.entity";
import { IPatientEntity } from "./patient.entity";
import { IFisioterapistEntity } from "./fisioterapist.entity";

export type UsersEntity = IUsersEntity | IPatientEntity | IFisioterapistEntity;