import { useEffect, useState } from "react";

export const Home = ({
  noteItems = [],
}: {
  noteItems: { id: number; note: string }[];
}) => {
  const [notes, setNotes] = useState<{ id: number; note: string }[]>(noteItems);

  useEffect(() => {
    if (noteItems.length > 0) {
      setNotes(noteItems);
    }
  }, [noteItems]);

  return (
    <div>
      <h1>All Notes</h1>
      {notes.length > 0 ? (
        <ul>
          {notes.map(({ id, note }, index) => (
            <li key={id || index}>
              {note} 
            </li>
          ))}
        </ul>
      ) : (
        <p>No notes available.</p>
      )}
    </div>
  );
};