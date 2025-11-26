import type { CustomerForm } from "./types";

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
        
    response.json();
  })
}

export function saveCustomer(newCustomer: CustomerForm) {
  return fetch(import.meta.env.VITE_API_URL + "/customer", {
      method: "POST",
      headers: { "content-type":"application/json" },
      body: JSON.stringify(newCustomer)
    })
    .then(response => {
      if (!response.ok)
        throw new Error("Error when adding a new customer");

      return response.json();
    })
}
