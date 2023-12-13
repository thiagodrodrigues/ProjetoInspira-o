import { ICalendarEntity } from "./calendar.entity.ts";

export interface IAppointmentEntity {
  idAppointment?: number,
  status: string,
  idCalendar: number,
  activies?: string,
  notes?: string,
  comments?: string,
}