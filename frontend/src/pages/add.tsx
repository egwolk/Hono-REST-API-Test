import { useState } from "react";
import { addNote } from "../API/api.ts";
import { useNavigate } from "react-router-dom";


export const AddNote = ({addNoteToState }: { addNoteToState: (note: { id: number; note: string }) => void }) => {
  const [note, setNote] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      const newNote = await addNote(note);
      addNoteToState(newNote);
      navigate("/");
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  return (
    <div>
      <h1>Add Note</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={note}
          onChange={(e) => setNote(e.currentTarget.value)} 
          placeholder="Enter note"
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}