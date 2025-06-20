"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Todo, TodoProps } from "@/components/ui/todo";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import CreateTodoDialog from "@/components/ui/create-todo-dialog";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Home() {
  const [todos, setTodos] = useState<TodoProps[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<TodoProps[]>([]);
  const [searchText, setSearchText] = useState<string>("");

  // filter todos based on search text
  useEffect(() => {
    const lowerText = searchText.toLowerCase();
    if (!lowerText) {
      setFilteredTodos(todos);
    } else {
      setFilteredTodos((todos) =>
        todos.filter((todo) => {
          return (
            todo.title.toLowerCase().includes(lowerText) ||
            todo.description.toLowerCase().includes(lowerText)
          );
        })
      );
    }
  }, [searchText, todos]);

  // fetch todos from backend
  const fetchTodos = async () => {
    const response = await fetch("/api/todos");
    const data = await response.json();
    // if no todos
    if (!data) {
      setTodos([]);
      return;
    }
    // string dates to Date objects
    const parsed: TodoProps[] = data?.map((todo: any) => ({
      ...todo,
      deadline: new Date(todo.deadline),
      createdAt: new Date(todo.createdAt),
      updatedAt: new Date(todo.updatedAt),
    }));
    setTodos(parsed);
    // initially no filter
    setFilteredTodos(parsed);
  };

  // run once on initial mount
  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <>
      <div className="flex flex-col gap-6 mt-6 items-center justify-between">
        <div className="flex gap-6 items-center justify-center">
          <Image
            src={"/todo.png"}
            alt="app-image"
            width={100}
            height={100}
            className="text-center"
          />
          <CreateTodoDialog onTodoCreated={fetchTodos} />
        </div>
        <Card className="w-full mt-6 max-w-2xl flex bg-white">
          <CardHeader className="px-6">
            <Input
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              type="text"
              placeholder="Search TODOS..."
              className="border-secondary border-2 text-primary placeholder-white py-3 rounded-xs"
            />
          </CardHeader>
          <CardContent>
            <ScrollArea className="w-full h-[400px] whitespace-nowrap">
              {/* if no todos */}
              {todos.length == 0 && (
                <p className="text-center text-2xl font-extrabold py-20">
                  No saved todos
                </p>
              )}

              {/* if search text cannot match any todos */}
              {filteredTodos.length == 0 && todos.length != 0 && (
                <p className="text-center text-2xl font-extrabold py-20">
                  No results
                </p>
              )}

              {filteredTodos.map((todo) => {
                return (
                  <Todo
                    key={todo.id}
                    id={todo.id}
                    title={todo.title}
                    description={todo.description}
                    deadline={todo.deadline}
                    createdAt={todo.createdAt}
                    updatedAt={todo.updatedAt}
                    onTodoChange={fetchTodos}
                  />
                );
              })}
              <ScrollBar orientation="vertical" />
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
