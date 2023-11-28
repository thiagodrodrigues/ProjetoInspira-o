import { AppointmentEntity } from "../../../../domain/entities/appointment/type.appointment.entity"

export default function (appointment: AppointmentEntity ){
   
    const appointmentGeneral = {
      idAppointment: appointment.idAppointment,
      status: appointment.status,
      date: appointment.date,
      time: appointment.time,
      activies: appointment.activies,
      comments: appointment.comments,
    }

    return {
      appointmentGeneral: appointmentGeneral
    };
}