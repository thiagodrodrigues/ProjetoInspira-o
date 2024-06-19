import { apiLocal } from "./config";
/* import * as jwt_decode from "jwt-decode" */

interface UserPayload {
  name: string;
  email: string;
  password: string;
}

interface LoginPayload {
  email: string;
  password: string;
}
export function createUser(payload: UserPayload) {
  return apiLocal.post("/users/new", payload);
}

export function updateUser(id: string, payload: UserPayload) {
  const USUARIO = localStorage.getItem('token');

/*   const token = USUARIO;
  const decoded : any = jwt_decode.jwtDecode(token!); */
  return apiLocal.put(`/users/${id}`, payload, {
    headers: {
      Authorization: `Bearer ${USUARIO}`
    }
  });
}

export function login(payload: LoginPayload) {
  return apiLocal.post(`/users/signIn`, payload);
}
