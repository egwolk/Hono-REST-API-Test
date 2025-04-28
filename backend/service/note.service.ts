import connection from "../connection.ts";
import  { Note }  from "../domain/note.domain.ts";

export const setItem = async (note: Omit<Note, 'id'>): Promise<Note> => {
    const result = await connection.execute(
        'INSERT INTO sample_table (note) VALUES (?)',
        [note.note]
    )
    const insertedId = result.lastInsertId as number;
    return { id: insertedId, ...note };
}
export const getAllItems = async (): Promise<Note[]> => {
  const result = await connection.query("SELECT * FROM sample_table");
  return result as Note[];
}

export const getItem = async (id: number): Promise<Note| null> => {
    const result = await connection.query('SELECT * FROM sample_table WHERE id = ?', [id]);
    return result.length ? result[0] as Note : null;
}

export const updateItem = async (id: number, note: string): Promise<void> =>{
    await connection.execute('UPDATE sample_table SET note = ? WHERE id = ?', [note, id]);
}

export const deleteItem = async (id: number): Promise<void> => {
    await connection.execute('DELETE FROM sample_table WHERE id = ?', [id]);
}