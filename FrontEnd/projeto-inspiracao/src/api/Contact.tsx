import { apiLocal } from "./config";

interface ContactPayload {
  name: string;
  email: string;
  message: string;
}
export async function createContact(contactPayload: ContactPayload) {
  return apiLocal.post("/contact", contactPayload);
}

export async function getContactDontRead() {
  const USUARIO = localStorage.getItem('token');
  return apiLocal.get("/contact?read=false", {
    headers: {
      Authorization: `Bearer ${USUARIO}`
    }
  });
}

export async function getContactRead() {
  const USUARIO = localStorage.getItem('token');
  return apiLocal.get("/contact?read=true", {
    headers: {
      Authorization: `Bearer ${USUARIO}`
    }
  });
}

export function deleteContact(contactId: string) {
  const USUARIO = localStorage.getItem('token');
  return apiLocal.delete(`/contact/${contactId}`, {
    headers: {
      Authorization: `Bearer ${USUARIO}`
    }
  });
}

export function getContactId(contactId: string) {
  const USUARIO = localStorage.getItem('token');
  return apiLocal.get(`/contact/${contactId}`, {
    headers: {
      Authorization: `Bearer ${USUARIO}`
    }
  });
}

