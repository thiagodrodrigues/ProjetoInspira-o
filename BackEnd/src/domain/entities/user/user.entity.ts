import { IFisioterapistEntity } from "./fisioterapist.entity"
import { IPatientEntity } from "./patient.entity"

export interface IUsersEntity {
    idUser?: number,
    name: string,
    email: string,
    password?: string,
    professional: string,
    patients?: IPatientEntity,
    fisioterapists?: IFisioterapistEntity
}