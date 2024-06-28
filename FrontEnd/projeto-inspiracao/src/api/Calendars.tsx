import { apiLocal } from "./config";
/* import * as jwt_decode from "jwt-decode" */

interface CalendarsPayload {
  idPhysiotherapist: string;
  startDate: string;
  endDate: string;
}

interface SchedulePayload {
  patientId: string;
  physiotherapistId: string;
  calendarId: string;
}

export function getDates(payload: CalendarsPayload) {
  const USUARIO = localStorage.getItem('token');
  return apiLocal.get(`/calendars/${payload.idPhysiotherapist}?startDate=${payload.startDate}&endDate=${payload.endDate}`, {
    headers: {
      Authorization: `Bearer ${USUARIO}`
    }
  });
}

export function newSchedule(payload: SchedulePayload) {
  const USUARIO = localStorage.getItem('token');
  return apiLocal.post(`/appointment`, payload, {
    headers: {
      Authorization: `Bearer ${USUARIO}`
    }
  });
}
