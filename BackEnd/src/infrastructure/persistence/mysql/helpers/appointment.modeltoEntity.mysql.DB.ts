import { AppointmentEntity } from "../../../../domain/entities/appointment/type.appointment.entity";

export default function (appointment:any): AppointmentEntity | undefined {
  if(!appointment)
  return

  let appointmentGeneral = undefined;
  if(appointment.idPatientFisioterapist){
    appointmentGeneral = {
      idAppointment: appointment.idAppointment,
      idCalendar: appointment.idCalendar,
      idPatientFisioterapist: appointment.idPatientFisioterapist,
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
      time: appointment.time,
      duration: appointment.duration
    }
  }


  return (appointmentGeneral as AppointmentEntity);
}