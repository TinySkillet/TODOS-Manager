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

type EditTodoDialogProps = {
  id: string;
  title: string;
  description: string;
  deadline: Date;
  onTodoUpdated(): Promise<void>;
};

export default function EditTodoDialog({
  id,
  title,
  description,
  deadline,
  onTodoUpdated,
}: EditTodoDialogProps): JSX.Element {
  const [form, setForm] = useState<FormState>({
    title: title,
    description: description,
    date: new Date(deadline),
    time: new Date(deadline).toTimeString().slice(0, 5), // "HH:MM"
  });

  const [error, setError] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  // updates a single field in the FormState
  const updateField = <K extends keyof FormState>(
    key: K,
    value: FormState[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    //  extracting the date portion (YYYY-MM-DD) from the Date object
    const datePart = form.date?.toISOString().split("T")[0];

    // combining into a timestamp
    const deadline = new Date(`${datePart}T${form.time}`);

    // field validation (title and description)
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

    const res = await fetch(`/api/todos`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        title: form.title,
        description: form.description,
        deadline: deadline,
        updatedAt: new Date(),
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      const err = data?.error || "Unknown error";
      setError("Failed to update todo: " + err);
    } else {
      setError(null);
      await onTodoUpdated(); // refresh todo list
      setDialogOpen(false);
    }
  };

  return (
    <>
      {/* Edit button triggers the edit dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <Button
            variant="secondary"
            onClick={() => setDialogOpen(true)}
            className="text-sm"
          >
            Edit
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            {/* errors on top */}
            {error && (
              <Alert variant={"destructive"}>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <DialogTitle>Edit TODO</DialogTitle>
            <DialogDescription>
              Modify the fields and click update to save changes.
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
            // setDate return 'Date | undefined'
            // date prop is set to Date?. for this reason
            date={form.date}
            setDate={(d) => updateField("date", d)}
            time={form.time}
            setTime={(t) => updateField("time", t)}
          />
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button
                type="button"
                onClick={() => setError(null)}
                variant="outline"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" onClick={handleSubmit}>
              Update
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
