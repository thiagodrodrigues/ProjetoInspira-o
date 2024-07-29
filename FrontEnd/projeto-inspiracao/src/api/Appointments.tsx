import { apiLocal } from "./config";

export function getSchedules(status: string) {
  const USUARIO = localStorage.getItem('token');
  return apiLocal.get(`/appointment/patient?status=${status}`, {
    headers: {
      Authorization: `Bearer ${USUARIO}`
    }
  });
}

export function cancelSchedule(appointmentId: string) {
  const USUARIO = localStorage.getItem('token');
  return apiLocal.delete(`/appointment/cancel/${appointmentId}`, {
    headers: {
      Authorization: `Bearer ${USUARIO}`
    }
  });
}
