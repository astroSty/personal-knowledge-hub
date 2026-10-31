"use client";

import { useState } from "react";

type DeleteNoteButtonProps = {
  noteId: string;
  onDeleted: (noteId: string) => void;
};

export default function DeleteNoteButton({
  noteId,
  onDeleted,
}: DeleteNoteButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this note?",
    );

    if (!confirmed) {
      return;
    }

    setError("");

    const token = localStorage.getItem("accessToken");

    if (!token) {
      setError("You are not authenticated.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/notes/${noteId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error("Failed to delete note");
      }

      onDeleted(noteId);
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
    <div className="mt-4">
      <button
        type="button"
        onClick={handleDelete}
        disabled={loading}
        className="rounded-md border px-3 py-1 text-sm font-medium hover:bg-muted disabled:opacity-50"
      >
        {loading ? "Deleting..." : "Delete"}
      </button>

      {error && (
        <p className="mt-2 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}