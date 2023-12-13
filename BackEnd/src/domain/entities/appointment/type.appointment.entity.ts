import { IAppointmentEntity } from "./appointment.entity";
import { ICalendarEntity } from "./calendar.entity.ts";

export type AppointmentEntity = IAppointmentEntity | ICalendarEntity;