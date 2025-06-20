"use client";

import { JSX, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Alert, AlertDescription, AlertTitle } from "./alert";

type DeleteDialogProps = {
  id: string;
  onTodoDelete: () => Promise<void>;
};

export default function DeleteTodoDialog({
  id,
  onTodoDelete,
}: DeleteDialogProps): JSX.Element {
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    const res = await fetch(`/api/todos?id=${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (!res.ok) {
      const err = data?.error || "Unknown error";
      setError("Failed to delete todo:" + err);
    } else {
      setError(null);
      await onTodoDelete();
    }
  };

  return (
    <>
      {error && (
        <Alert variant={"destructive"}>
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>error</AlertDescription>
        </Alert>
      )}
      <AlertDialog>
        <AlertDialogTrigger className="bg-red-100 hover:bg-blue-200 rounded-md px-3.5 py-1.5">
          🗑️
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. It will delete your TODO
              permanently.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
