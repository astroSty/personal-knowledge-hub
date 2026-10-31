"use client";

import { FormEvent, useState } from "react";

type Note = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

type EditNoteFormProps = {
  note: Note;
  onCancel: () => void;
  onUpdated: (updatedNote: Note) => void;
};

export default function EditNoteForm({
  note,
  onCancel,
  onUpdated,
}: EditNoteFormProps) {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();
    setError("");

    const token = localStorage.getItem("accessToken");

    if (!token) {
      setError("You are not authenticated.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/notes/${note.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title,
            content,
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to update note");
      }

      const updatedNote: Note = await response.json();

      onUpdated(updatedNote);
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

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-lg border p-4"
    >
      <h3 className="font-semibold">Edit Note</h3>

      <div className="space-y-2">
        <label htmlFor="edit-title" className="text-sm font-medium">
          Title
        </label>

        <input
          id="edit-title"
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          className="w-full rounded-md border px-3 py-2"
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="edit-content" className="text-sm font-medium">
          Content
        </label>

        <textarea
          id="edit-content"
          value={content}
          onChange={(event) => setContent(event.target.value)}
          className="min-h-32 w-full rounded-md border px-3 py-2"
          required
        />
      </div>

      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>

        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="rounded-md border px-4 py-2 font-medium hover:bg-muted"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}