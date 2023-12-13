import { AppointmentEntity } from "../../../../domain/entities/appointment/type.appointment.entity"

export default function (appointment: AppointmentEntity ){
   
  let appointmentGeneral = undefined;
  if('status' in appointment){
    appointmentGeneral = {
      idAppointment: appointment.idAppointment,
      status: appointment.status,
      idCalendar: appointment.idCalendar,
      activies: appointment.activies,
      notes: appointment.notes,
      comments: appointment.comments,
    }
  }

  let calendarGeneral = undefined;
  if('available' in appointment){
    calendarGeneral = {
      idCalendar: appointment.idCalendar,
      idFisioterapist: appointment.idFisioterapist,
      available: appointment.available,
      date: appointment.date,
      time: appointment.time
    }
  }


    return {
      appointmentGeneral: appointmentGeneral,
      calendarGeneral: calendarGeneral
    };
}