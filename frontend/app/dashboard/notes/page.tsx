"use client";

import { FormEvent, useEffect, useState } from "react";
import EditNoteForm from "@/components/dashboard/edit-note-form";
import DeleteNoteButton from "@/components/dashboard/delete-note-button";
import { apiRequest } from "@/lib/api";

type Note = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [order, setOrder] = useState("desc");

  useEffect(() => {
   const timeoutId = setTimeout(() => {
    setDebouncedSearch(search);
   }, 400);

    return () => clearTimeout(timeoutId);
  }, [search]);
  
  useEffect(() => {
    async function fetchNotes() {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        setError("You are not authenticated.");
        setLoading(false);
        return;
      }

      try {
        const data = await apiRequest<Note[]>(
         `/notes?search=${encodeURIComponent(debouncedSearch)}&sortBy=${sortBy}&order=${order}`,
         {
          headers: {
          Authorization: `Bearer ${token}`,
          },
         },
        );

        setNotes(data);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Something went wrong",
        );
      } finally {
        setLoading(false);
      }
    }

    fetchNotes();
  }, [debouncedSearch, sortBy, order]);

  async function handleCreateNote(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();
    setError("");

    const token = localStorage.getItem("accessToken");

    if (!token) {
      setError("You are not authenticated.");
      return;
    }

    setCreating(true);

    try {
      const newNote = await apiRequest<Note>("/notes", {
       method: "POST",
       headers: {
        Authorization: `Bearer ${token}`,
       },
       body: JSON.stringify({
       title,
       content,
       }),
      });

      setNotes((currentNotes) => [
        newNote,
        ...currentNotes,
      ]);

      setTitle("");
      setContent("");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong",
      );
    } finally {
      setCreating(false);
    }
  }

  function handleNoteUpdated(updatedNote: Note) {
    setNotes((currentNotes) =>
      currentNotes.map((note) =>
        note.id === updatedNote.id ? updatedNote : note,
      ),
    );

    setEditingNote(null);
  }

  function handleNoteDeleted(noteId: string) {
  setNotes((currentNotes) =>
    currentNotes.filter((note) => note.id !== noteId),
  );

  setEditingNote((currentNote) =>
    currentNote?.id === noteId ? null : currentNote,
  );
}

  if (loading) {
    return <p>Loading notes...</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold">My Notes</h2>

      <p className="text-muted-foreground mt-2">
        Create and manage your personal notes.
      </p>

      <div className="mt-6">
        <input
          type="text"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search your notes..."
          className="w-full rounded-md border px-3 py-2"
        />
      </div>

      <div className="mt-4 flex flex-wrap gap-4">
       <div>
        <label
         htmlFor="sortBy"
         className="mb-1 block text-sm font-medium"
        >
        Sort by
        </label>

        <select
         id="sortBy"
         value={sortBy}
         onChange={(event) => setSortBy(event.target.value)}
         className="rounded-md border px-3 py-2"
        >
        <option value="createdAt">Date Created</option>
        <option value="updatedAt">Last Updated</option>
        <option value="title">Title</option>
        </select>
       </div>

      <div>
       <label
        htmlFor="order"
        className="mb-1 block text-sm font-medium"
       >
       Order
       </label>

       <select
        id="order"
        value={order}
        onChange={(event) => setOrder(event.target.value)}
        className="rounded-md border px-3 py-2"
       >
       <option value="desc">Descending</option>
       <option value="asc">Ascending</option>
       </select>
      </div>
      </div>

      <form
        onSubmit={handleCreateNote}
        className="mt-6 space-y-4 rounded-lg border p-4"
      >
        <h3 className="font-semibold">Create a new note</h3>

        <div className="space-y-2">
          <label htmlFor="title" className="text-sm font-medium">
            Title
          </label>

          <input
            id="title"
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Enter a title"
            className="w-full rounded-md border px-3 py-2"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="content" className="text-sm font-medium">
            Content
          </label>

          <textarea
            id="content"
            value={content}
            onChange={(event) => setContent(event.target.value)}
            placeholder="Write your note..."
            className="min-h-32 w-full rounded-md border px-3 py-2"
            required
          />
        </div>

        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}

        <button
          type="submit"
          disabled={creating}
          className="rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground hover:opacity-90 disabled:opacity-50"
        >
          {creating ? "Creating..." : "Create Note"}
        </button>
      </form>

      <div className="mt-8 space-y-4">
        <h3 className="text-lg font-semibold">Your Notes</h3>

        {notes.length === 0 ? (
          <p className="text-muted-foreground">
            You don't have any notes yet.
          </p>
        ) : (
          notes.map((note) => (
            <div
              key={note.id}
              className="rounded-lg border p-4"
            >
              {editingNote?.id === note.id ? (
                <EditNoteForm
                  note={note}
                  onCancel={() => setEditingNote(null)}
                  onUpdated={handleNoteUpdated}
                />
              ) : (
                <>
                  <h4 className="font-semibold">{note.title}</h4>

                  <p className="mt-2 text-sm text-muted-foreground">
                    {note.content}
                  </p>

                  <div className="mt-4 flex gap-3">
                  <button
                  onClick={() => setEditingNote(note)}
                  className="mt-4 rounded-md border px-3 py-1 text-sm font-medium hover:bg-muted"
                  >
                  Edit
                  </button>

                  <DeleteNoteButton
                  noteId={note.id}
                  onDeleted={handleNoteDeleted}
                  />
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}