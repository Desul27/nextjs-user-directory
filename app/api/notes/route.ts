import { prisma } from "@/lib/prisma";

export async function GET() {
  const notes = await prisma.note.findMany({
    orderBy: { id: "desc" },
  });

  return Response.json(notes);
}

export async function POST(req: Request) {
  const body = await req.json();

  const note = await prisma.note.create({
    data: {
      title: body.title,
    },
  });

  return Response.json(note);
}

export async function DELETE(req: Request) {
  const { id } = await req.json();

  await prisma.note.delete({
    where: { id },
  });

  return Response.json({ success: true });
}

export async function PUT(req: Request) {
  const { id, title } = await req.json();

  const note = await prisma.note.update({
    where: { id },
    data: { title },
  });

  return Response.json(note);
}