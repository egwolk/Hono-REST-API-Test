import { Hono} from "@hono/hono";
import * as NoteController from "../controllers/note.controller.ts";

export const noteRoutes = (app: Hono) => {
    app.post('/notes', NoteController.addNote);
    app.get('/notes', NoteController.getAllNotes);
    app.get('/notes/:id', NoteController.getNote);
    app.put('/notes/:id', NoteController.updateNote);
    app.delete('/notes/:id', NoteController.deleteNote);
}



