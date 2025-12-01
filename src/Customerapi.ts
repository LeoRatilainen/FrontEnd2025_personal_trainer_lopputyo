import type { CustomerForm } from "./types";
import type { TrainingForm } from "./types";
import dayjs from "dayjs";

export function getCustomers() {
  return fetch(import.meta.env.VITE_API_URL + '/customers')
  .then(response => {
    if (!response.ok)
      throw new Error("Error when fetching customers: " + response.statusText);

    return response.json();
  })
}

export function deleteCustomer(url: string) {
  return fetch(url, { method: "DELETE" })
    .then(response => {
      if (!response.ok)
        throw new Error("Error when deleting customers: " + response.statusText);
        
    return response.json();
  })
}

export function saveCustomer(newCustomer: CustomerForm) {
  return fetch(import.meta.env.VITE_API_URL + "/customers", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(newCustomer)
    })
    .then(response => {
      if (!response.ok)
        throw new Error("Error when adding a new customer");

      return response.json();
    })
}

export function getTrainings() {
  return fetch(import.meta.env.VITE_API_URL + '/trainings')
  .then(response => {
    if (!response.ok)
      throw new Error("Error when fetching trainings: " + response.statusText);

    return response.json();
  })
}

export function deleteTraining(url: string) {
  return fetch(url, { method: "DELETE" })
    .then(response => {
      if (!response.ok)
        throw new Error("Error when deleting trainings: " + response.statusText);
        
    return response.json();
  })
}

export function saveTraining(newTraining: TrainingForm) {
  return fetch(import.meta.env.VITE_API_URL + "/trainings", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        ...newTraining,
        date: dayjs(newTraining.date).toISOString(),
      })
    })
    .then(response => {
      if (!response.ok)
        throw new Error("Error when adding a new Training");

      return response.json();
    })
}

