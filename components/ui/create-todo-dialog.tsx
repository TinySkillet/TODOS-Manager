"use client";

import { JSX, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogClose,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "./button";
import Calendar24 from "../calendar-24";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "./alert";
import { todoSchema } from "@/lib/zod";

type FormState = {
  title: string;
  description: string;
  date?: Date;
  time: string;
};

export default function CreateTodoDialog({
  onTodoCreated,
}: {
  onTodoCreated(): Promise<void>;
}): JSX.Element {
  const [form, setForm] = useState<FormState>({
    title: "",
    description: "",
    date: new Date(),
    time: "23:59:00",
  });
  const [error, setError] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  // updates a single field of FormState
  const updateField = <K extends keyof FormState>(
    key: K,
    value: FormState[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    // extract date and combine with time to create timestamp
    const datePart = form.date?.toISOString().split("T")[0];
    const deadline = `${datePart}T${form.time}`;

    // validate with zod
    const result = todoSchema.safeParse({
      title: form.title,
      description: form.description,
    });

    if (!result.success) {
      setError(result.error.issues[0]?.message);
      return;
    } else {
      setError(null);
    }

    const res = await fetch("/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: form.title,
        description: form.description,
        deadline: deadline,
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      const err = data?.error || "Unknown error";
      setError("Failed to delete todo:" + err);
      setForm({
        title: "",
        description: "",
        date: new Date(),
        time: "23:59:00",
      });
    } else {
      setError(null);
      await onTodoCreated();
      setDialogOpen(false);
      setForm({
        description: "",
        time: "23:59:00",
        title: "",
        date: new Date(),
      });
    }
  };

  return (
    <>
      {/* ' + ' triggers the create todo dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger>
          <div
            className="flex items-center justify-center w-16 h-16 rounded-full bg-red-300 text-white text-3xl shadow-lg hover:bg-amber-100 hover:text-gray-400 transition-colors"
            onClick={() => setDialogOpen(true)}
          >
            <p>+</p>
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <DialogTitle>Create a TODO</DialogTitle>
            <DialogDescription>
              Fill the required fields to create a TODO.
            </DialogDescription>
          </DialogHeader>
          <Input
            type="text"
            placeholder="Enter Title"
            value={form.title}
            onChange={(e) => updateField("title", e.target.value)}
          />
          <Textarea
            placeholder="Enter Description"
            value={form.description}
            onChange={(e) => updateField("description", e.target.value)}
          />
          <Calendar24
            date={form.date}
            // component's setDate returns a 'Date | undef' type
            // the date prop is kept Date?. for this reason
            setDate={(d) => updateField("date", d)}
            time={form.time}
            setTime={(t) => updateField("time", t)}
          />
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button
                type="button"
                onClick={() => setError(null)}
                variant="secondary"
              >
                Close
              </Button>
            </DialogClose>
            <Button type="submit" onClick={handleSubmit}>
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
