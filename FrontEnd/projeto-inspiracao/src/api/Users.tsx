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

interface Admin {
  id?: string;
  permission: string;
}

interface Physhiotherapist {
  id?: string;
  crefito: string;
}

interface Patient {
  id?: string;
  phone: string;
  birth: string;
  sex: string;
  profession: string;
  medical: string;
  lifestyle: string;
  condition: string;
  comments: string;
}

interface User {
  id?: string;
  name: string;
  email: string;
  password?: string;
  owner: boolean;
  admin?: Admin;
  patient?: Patient;
  physiotherapist?: Physhiotherapist;
}
export function createUser(payload: UserPayload) {
  return apiLocal.post("/users/new", payload);
}

export function updateUser(payload: User) {
  console.log("123")
  const USUARIO = localStorage.getItem('token');
  console.log("456")

  return apiLocal.put(`/users/`, payload, {
    headers: {
      Authorization: `Bearer ${USUARIO}`
    }
  });
}

export function login(payload: LoginPayload) {
  return apiLocal.post(`/users/signIn`, payload);
}

export function profile() {
  const USUARIO = localStorage.getItem('token');
  return apiLocal.get("/users", {
    headers: {
      Authorization: `Bearer ${USUARIO}`
    }
  });
}

export function deleteUser() {
  const USUARIO = localStorage.getItem('token');
  return apiLocal.delete("/users", {
    headers: {
      Authorization: `Bearer ${USUARIO}`
    }
  });
}

export function getPhysiotherapists() {
  const USUARIO = localStorage.getItem('token');
  return apiLocal.get("/users/physiotherapists", {
    headers: {
      Authorization: `Bearer ${USUARIO}`
    }
  });
}
