const API_URL = "http://localhost:3001/api/pastes";

export async function createPaste(data) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Server error: ${response.status} - ${text}`);
  }

  return response.json();
}
