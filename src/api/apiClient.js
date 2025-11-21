const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080/api";

async function handleResponse(response) {
  const contentType = response.headers.get("content-type");
  const isJson = contentType && contentType.includes("application/json");
  const data = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    const message = typeof data === "string" ? data : data?.message || "Error inesperado";
    const error = new Error(message);
    error.status = response.status;
    error.details = data;
    throw error;
  }

  return data;
}

export async function apiPost(path, body) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });

  return handleResponse(response);
}

export async function apiGet(path) {
  const response = await fetch(`${API_BASE_URL}${path}`);
  return handleResponse(response);
}

export const apiClient = {
  get: apiGet,
  post: apiPost
};

export default apiClient;
