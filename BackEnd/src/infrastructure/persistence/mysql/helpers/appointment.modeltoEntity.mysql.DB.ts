import { AppointmentEntity } from "../../../../domain/entities/appointment/type.appointment.entity";

export default function (appointment:any): AppointmentEntity | undefined {
  if(!appointment)
  return

  let appointmentGeneral = undefined;
  if(appointment.status){
    appointmentGeneral = {
      idAppointment: appointment.idAppointment,
      status: appointment.status,
      idCalendar: appointment.idCalendar,
      activies: appointment.activies,
      notes: appointment.notes,
      comments: appointment.comments,
    }
  }

  if(appointment.available){
    appointmentGeneral = {
      idCalendar: appointment.idCalendar,
      idFisioterapist: appointment.idFisioterapist,
      available: appointment.available,
      date: appointment.date,
      time: appointment.time
    }
  }


  return (appointmentGeneral as AppointmentEntity);
}