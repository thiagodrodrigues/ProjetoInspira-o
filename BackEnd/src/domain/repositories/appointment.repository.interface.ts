import { AppointmentEntity } from "../entities/appointment/type.appointment.entity";
import { ICalendarEntity } from "../entities/appointment/calendar.entity.ts";

export interface IAppointmentRepository {
    create(resource: AppointmentEntity): Promise<AppointmentEntity>,
    createCalendar(resource: AppointmentEntity): Promise<AppointmentEntity>,
    checkCalendar(resource: ICalendarEntity): Promise<ICalendarEntity | undefined>,
    readByDate(resourceId: any): Promise<ICalendarEntity[] | undefined>,
    listAppointments(resourceId?: number, status?: string, idFisioterapist?: number): Promise<AppointmentEntity[] | undefined>,
/*     updateById(resource: AppointmentEntity): Promise<AppointmentEntity | undefined>,
    readById(resourceId: number): Promise<AppointmentEntity | undefined>,
    list(): Promise<AppointmentEntity[]>,
    listById(resourceId: number): Promise<AppointmentEntity[]>, */
}