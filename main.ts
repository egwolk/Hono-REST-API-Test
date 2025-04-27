import { Hono } from '@hono/hono';
import connection from "./connection.ts";
const app = new Hono();

app.get('/', (c) => {
  return c.text('Hello Hono!');
});


interface Note {
  id:number;
  note:string;
}


const setItem = async (note: Omit<Note, 'id'>) => {
  await connection.execute(
      'INSERT INTO sample_table (note) VALUES (?)',
      [note.note]
  )
}

const getItem = async (id: number): Promise<Note| null> => {
  const result = await connection.query('SELECT * FROM sample_table WHERE id = ?', [id]);
  return result.length ? result[0] as Note : null;
}

const updateItem = async (id: number, note: string) => {
  await connection.execute('UPDATE sample_table SET note = ? WHERE id = ?', [note, id]);
}

const deleteItem = async (id: number) => {
  await connection.execute('DELETE FROM sample_table WHERE id = ?', [id]);
}

app.post('/notes', async (c) => {
  const noteDetails = await c.req.json();
  const note: Omit<Note, 'id'> = noteDetails;
  await setItem(note);
  return c.json({ message: `New note added successfully!` });
})

app.get('/notes/:id', async(c) => {
  const id = parseInt(c.req.param('id') || '', 10);
  if (isNaN(id)) {
    return c.json({message: 'Invalid ID'}, 400);
  }
  const note = await getItem(id);
  if (!note) {
    return c.json({message: 'Note not found'}, 404);
  }
  return c.json(note);
})

app.put('/notes/:id', async(c) => {
  const id = parseInt(c.req.param('id') || '', 10);
  if (isNaN(id)) {
    return c.json({message: 'Invalid ID'}, 400);
  }
  const noteDetails = await c.req.json();
  console.log('Request Body:', noteDetails);
  const { note } = noteDetails;
  console.log('Note:', note);
  if (!note) {
    return c.json({message: 'Note content required'}, 400);
  }

  const existingNote = await getItem(id);
  if (!existingNote) {
    return c.json({message: 'Note not found'}, 404);
  }
  await updateItem(id, note);
  console.log('Updated Note:', note);
  return c.json({ message: `Note with ID ${id} updated successfully! note: ${note}` });
})

app.delete('/notes/:id', async(c) => {
  const id = parseInt(c.req.param('id') || '', 10);
  if (isNaN(id)) {
    return c.json({message: 'Invalid ID'}, 400);
  }
  await deleteItem(id);
  return c.json({ message: `Note with ID ${id} deleted successfully!` });
})
Deno.serve(app.fetch);