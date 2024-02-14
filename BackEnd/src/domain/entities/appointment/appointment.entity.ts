import { PatientFisioterapistEntity } from "../user/patient_fisioterapist.entity";

export interface IAppointmentEntity {
  idPatientFisioterapist?: number,
  idAppointment?: number,
  idCalendar?: number,
  activies?: string,
  notes?: string,
  comments?: string,
  patients_fisioterapists?: PatientFisioterapistEntity
}