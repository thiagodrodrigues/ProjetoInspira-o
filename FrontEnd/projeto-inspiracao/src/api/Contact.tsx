import { apiLocal} from "./config";

interface ContactPayload {
  name: string;
  email: string;
  message: string;
}
export async function createContact(contactPayload: ContactPayload) {
  return apiLocal.post("/contact", contactPayload);
}

