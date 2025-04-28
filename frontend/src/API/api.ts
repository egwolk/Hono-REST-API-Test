const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getNote = async (id:number) => {
  const response = await fetch(`${API_BASE_URL}/notes/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch note");
  }
  return response.json();
};

export const getAllNotes = async () => {
  const response = await fetch(`${API_BASE_URL}/notes`);
  if (!response.ok) {
    throw new Error("Failed to fetch notes");
  }
  return response.json();
};

export const addNote = async (note: string) => {
  const response = await fetch(`${API_BASE_URL}/notes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ note }),
  });
  if (!response.ok) {
    throw new Error("Failed to add note");
  }
  const newNote = await response.json();
  return {
    id: newNote.id,
    note: typeof newNote.note === "string" ? newNote.note : newNote.note.note, // Extract the string if it's nested
  };
};

export const updateNote = async (id:number, note:string) => {
  const response = await fetch(`${API_BASE_URL}/notes/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note),
  });
  if (!response.ok) {
    throw new Error("Failed to update note");
  }
  return response.json();
};

export const deleteNote = async (id:number) => {
  const response = await fetch(`${API_BASE_URL}/notes/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete note");
  }
  return response.json();
};