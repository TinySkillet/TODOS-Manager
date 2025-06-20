import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const todos = await prisma.todo.findMany();
    return NextResponse.json(todos);
  } catch (error) {
    console.log("Error fetching todos: ", error);
    return NextResponse.json({ error: "Error creating todo" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const newTodo = await prisma.todo.create({
      data: {
        title: body.title,
        description: body.description,
        deadline: new Date(body.deadline),
        createdAt: new Date(body.createdAt),
        updatedAt: new Date(body.updatedAt),
      },
    });
    console.log(newTodo);
    return NextResponse.json(newTodo, { status: 201 });
  } catch (error) {
    console.error("Error creating todo:", error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return new Response(JSON.stringify({ error: "Missing ID" }), {
        status: 400,
      });
    }

    await prisma.todo.delete({
      where: { id },
    });

    return new Response(JSON.stringify({ message: "Todo deleted" }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to delete todo!" }), {
      status: 500,
    });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const updatedTodo = await prisma.todo.update({
      where: { id: body.id },
      data: {
        title: body.title,
        description: body.description,
        deadline: body.deadline,
        updatedAt: new Date(),
      },
    });
    console.log(updatedTodo);
    return NextResponse.json(updatedTodo, { status: 200 });
  } catch (error) {
    console.error("Error updating todo:", error);
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
