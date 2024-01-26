import { AppointmentEntity } from "../../../../domain/entities/appointment/type.appointment.entity"
import app from "../../../apis/app/app";

export default function (appointment: AppointmentEntity ){
   
  let appointmentGeneral = undefined;
  if('notes' in appointment){
    appointmentGeneral = {
      idAppointment: appointment.idAppointment,
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
      time: appointment.time,
      duration: appointment.duration
    }
  }


    return {
      appointmentGeneral: appointmentGeneral,
      calendarGeneral: calendarGeneral
    };
}