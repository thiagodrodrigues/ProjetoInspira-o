import { AppointmentEntity } from "../entities/appointment/type.appointment.entity";

export interface IAppointmentRepository {
    create(resource: AppointmentEntity): Promise<AppointmentEntity>,
    updateById(resource: AppointmentEntity): Promise<AppointmentEntity | undefined>,
    readById(resourceId: number): Promise<AppointmentEntity | undefined>,
    list(): Promise<AppointmentEntity[]>,
    listById(resourceId: number): Promise<AppointmentEntity[]>,
}