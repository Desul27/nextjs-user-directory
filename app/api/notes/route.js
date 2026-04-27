let notes = [
  { id: 1, title: "Belajar Next.js" },
  { id: 2, title: "Belajar API" },
];

// GET → ambil semua notes
export async function GET() {
  return Response.json(notes);
}

// POST → tambah note
export async function POST(req) {
  const body = await req.json();
  const newNote = {
    id: Date.now(),
    title: body.title,
  };
  notes.push(newNote);
  return Response.json(newNote);
}

export async function DELETE(req) {
  const { id } = await req.json();
  notes = notes.filter((note) => note.id !== id);
  return Response.json({ success: true });
}

