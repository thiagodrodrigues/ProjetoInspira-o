import { apiLocal } from "./config";

interface FinancesPayload {
  id?: string;
  financeType: string;
  financeCategory: string;
  financeCategoryValue?: string;
  financeDescription: string;
  value: string;
  transaction: string;
  transactionValue?: string;
  financeDate: string;
  status: string;
  statusValue?: string;
  cash: CashPayload;
}

interface CashPayload {
  id?: string;
  wallet: string;
  balance: string;
}

interface GetFinances {
  idCash?: string;
  startDate: string;
  endDate: string;
  filter: string;
  financeTransaction: string;
  financeType: string;
  status: string;
}

export async function createFinance(financePayload: FinancesPayload) {
  const USUARIO = localStorage.getItem('token');
  return apiLocal.post("/finances", financePayload, {
    headers: {
      Authorization: `Bearer ${USUARIO}`
    }
  });
}

export async function createCash(cashPayload: CashPayload) {
  const USUARIO = localStorage.getItem('token');
  return apiLocal.post("/finances/cash", cashPayload, {
    headers: {
      Authorization: `Bearer ${USUARIO}`
    }
  });
}

export async function getFinances(getFinances: GetFinances) {
  const USUARIO = localStorage.getItem('token');
  return apiLocal.get(`/finances/owner?idCash=${getFinances.idCash}&startDate=${getFinances.startDate}&endDate=${getFinances.endDate}&filter=${getFinances.filter}&financeTransaction=${getFinances.financeTransaction}&financeType=${getFinances.financeType}&status=${getFinances.status}`, {
    headers: {
      Authorization: `Bearer ${USUARIO}`
    }
  });
}

export async function getCash() {
  const USUARIO = localStorage.getItem('token');
  return apiLocal.get(`/finances/cash`, {
    headers: {
      Authorization: `Bearer ${USUARIO}`
    }
  });
}

export function getFinancesId(financeId: string) {
  const USUARIO = localStorage.getItem('token');
  return apiLocal.get(`/finances/owner/${financeId}`, {
    headers: {
      Authorization: `Bearer ${USUARIO}`
    }
  });
}

export async function updateFinance(financePayload: FinancesPayload) {
  const USUARIO = localStorage.getItem('token');
  return apiLocal.put(`/finances/owner/${financePayload.id}`, financePayload, {
    headers: {
      Authorization: `Bearer ${USUARIO}`
    }
  });
}

export function deleteFinance(financeId: string) {
  const USUARIO = localStorage.getItem('token');
  return apiLocal.delete(`/finances/${financeId}`, {
    headers: {
      Authorization: `Bearer ${USUARIO}`
    }
  });
}

export function getFields(field: string) {
  const USUARIO = localStorage.getItem('token');
  return apiLocal.get(`/finances/fields?field=${field}`, {
    headers: {
      Authorization: `Bearer ${USUARIO}`
    }
  });
}
