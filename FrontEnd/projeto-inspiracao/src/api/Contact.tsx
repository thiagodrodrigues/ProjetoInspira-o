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

