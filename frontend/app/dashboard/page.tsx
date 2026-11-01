"use client";

import { useEffect, useState } from "react";
import { apiRequest } from "@/lib/api";

type Note = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

export default function DashboardPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function fetchNotes() {
      setLoading(true);
      setError("");
      
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        setError("You are not logged in");
        setLoading(false);
        return;
      }

      try {
        const data = await apiRequest<Note[]>(`/notes?page=${page}&limit=5`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        setNotes(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch notes",
        );
      } finally {
        setLoading(false);
      }
    }

    fetchNotes();
  }, [page]);

  if (loading) {
    return <p>Loading notes...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <main className="space-y-6">
      <h1 className="text-3xl font-bold">My Notes</h1>

      {notes.length === 0 ? (
        <p className="text-muted-foreground">
          No notes yet. Create your first note!
        </p>
      ) : (
        <div className="space-y-4">
          {notes.map((note) => (
            <article key={note.id} className="rounded-lg border p-4">
              <h2 className="text-xl font-semibold">{note.title}</h2>
              <p className="mt-2 text-muted-foreground">{note.content}</p>
            </article>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between">
       <button
        onClick={() => setPage((currentPage) => currentPage - 1)}
        disabled={page === 1}
        className="rounded-md border px-4 py-2 disabled:opacity-50"
       >
       Previous
       </button>

       <span className="text-sm text-muted-foreground">
        Page {page}
       </span>

       <button
        onClick={() => setPage((currentPage) => currentPage + 1)}
        disabled={notes.length < 5}
        className="rounded-md border px-4 py-2 disabled:opacity-50"
       >
       Next
       </button>
      </div>
    </main>
  );
}