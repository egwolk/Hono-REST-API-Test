import { Context } from "@hono/hono";
import * as NoteService from "../service/note.service.ts";

export const addNote = async (c: Context) => {
    const noteDetails = await c.req.json();
    const note = await NoteService.setItem(noteDetails);
    return c.json({ message: `New note added successfully!`, note });
}
export const getAllNotes = async (c: Context) => {
  const notes = await NoteService.getAllItems();
  return c.json(notes);
}
export const getNote = async (c: Context) => {
    const id = parseInt(c.req.param('id') || '', 10);
  if (isNaN(id)) {
    return c.json({message: 'Invalid ID'}, 400);
  }
  const note = await NoteService.getItem(id);
  if (!note) {
    return c.json({message: 'Note not found'}, 404);
  }
  return c.json(note);
}

export const updateNote = async (c: Context) => {
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

    const existingNote = await NoteService.getItem(id);
    if (!existingNote) {
        return c.json({message: 'Note not found'}, 404);
    }
    await NoteService.updateItem(id, note);
    console.log('Updated Note:', note);
    return c.json({ message: `Note with ID ${id} updated successfully! note: ${note}` });
}

export const deleteNote = async (c: Context) => {
    const id = parseInt(c.req.param('id') || '', 10);
  if (isNaN(id)) {
    return c.json({message: 'Invalid ID'}, 400);
  }
  await NoteService.deleteItem(id);
  return c.json({ message: `Note with ID ${id} deleted successfully!` });
}