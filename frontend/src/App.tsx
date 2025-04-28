import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import { AddNote } from './pages/add.tsx';
import { Home } from './pages/home.tsx';
import { useEffect, useState } from 'react';
import { getAllNotes } from './API/api.ts';

function App() {
  const [notes, setNotes] = useState<{ id: number; note: string }[]>([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const data = await getAllNotes();
        setNotes(data);
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    };

    fetchNotes();
  }, []);

  const addNoteToState = (newNote: { id: number; note: string | { note: string } }) => {
    setNotes((prevNotes) => [
      ...prevNotes,
      {
        id: newNote.id,
        note: typeof newNote.note === "string" ? newNote.note : newNote.note.note, 
      },
    ]);
  };
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/add">Add</Link>
          </li>
          <li>
            <Link to="/view">View</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home noteItems={notes} />} />
        <Route path="/add" element={<AddNote addNoteToState={addNoteToState}/>} />
        <Route path="/view" element={<div>Contact</div>} />
      </Routes>
    </>
  );
}

export default App;