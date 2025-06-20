"use client";
import { JSX, useState } from "react";
import { TodoProps } from "./todo";
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
import EditTodoDialog from "./edit-todo-dialog";

export default function ViewTodoDialog({
  id,
  title,
  description,
  deadline,
  createdAt,
  updatedAt,
  onTodoChange,
}: TodoProps): JSX.Element {
  return (
    <Dialog key={id}>
      <DialogTrigger className="bg-amber-100 hover:bg-blue-200 rounded-md px-3.5 py-1.5">
        👁️
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-primary">
            {title}
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground mt-2">
            {description}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-2 text-sm text-muted-foreground">
          <div>
            <span className="font-medium text-primary">Deadline:</span>{" "}
            {deadline.toLocaleString()}
          </div>
          <div>
            <span className="font-medium text-primary">Created At:</span>{" "}
            {createdAt.toLocaleString()}
          </div>
          <div>
            <span className="font-medium text-primary">Updated At:</span>{" "}
            {updatedAt.toLocaleString()}
          </div>
        </div>

        <DialogFooter className="sm:justify-start mt-6">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Close
            </Button>
          </DialogClose>
          <EditTodoDialog
            id={id}
            title={title}
            description={description}
            deadline={deadline}
            onTodoUpdated={onTodoChange}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
