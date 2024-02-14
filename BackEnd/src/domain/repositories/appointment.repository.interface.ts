import { AppointmentEntity } from "../entities/appointment/type.appointment.entity";
import { ICalendarEntity } from "../entities/appointment/calendar.entity.ts";
import { IAppointmentEntity } from "../entities/appointment/appointment.entity";

export interface IAppointmentRepository {
    create(resource: AppointmentEntity): Promise<AppointmentEntity>,
    createCalendar(resource: AppointmentEntity): Promise<AppointmentEntity>,
    checkCalendar(resource: ICalendarEntity): Promise<ICalendarEntity | undefined>,
    readByDate(resourceId: any): Promise<ICalendarEntity[] | undefined>,
    listAppointments(resourceId?: number, status?: string, idFisioterapist?: number): Promise<AppointmentEntity[] | undefined>,
    readById(resourceId: number): Promise<IAppointmentEntity | undefined>,
    updateById(resource: IAppointmentEntity, model: IAppointmentEntity): Promise<IAppointmentEntity | undefined>,
/*     
    list(): Promise<AppointmentEntity[]>,
    listById(resourceId: number): Promise<AppointmentEntity[]>, */
}