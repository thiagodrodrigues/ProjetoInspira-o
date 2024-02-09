import { UsersEntity } from "../entities/user/type.users.entity";
import { PatientFisioterapistEntity } from "../entities/user/patient_fisioterapist.entity";

export interface IUsersRepository {
    create(resource: UsersEntity): Promise<UsersEntity>,
    createPatientFisioterapist(resource: PatientFisioterapistEntity): Promise<PatientFisioterapistEntity>,
    deleteById(resourceId: number): Promise<void>,
    updateById(resource: UsersEntity): Promise<UsersEntity | undefined>,
    readByWhere(resourceId: string): Promise<UsersEntity | undefined>,
    readById(resourceId: number): Promise<UsersEntity | undefined>,
    readByPatientFisioterapist(resource: any): Promise<PatientFisioterapistEntity | undefined>,
    listById(resourceId: number): Promise<UsersEntity[]>,
    list(): Promise<UsersEntity[]>,
}