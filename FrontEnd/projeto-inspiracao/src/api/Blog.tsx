import { apiLocal} from "./config";

interface BlogPayload {
  title: string;
  content: string;
  autor: string;
  url: string;
  status: boolean;
}
export async function getBlog() {
  return apiLocal.get("/blog");
}

