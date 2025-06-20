import { JSX } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./card";
import DeleteTodoDialog from "./delete-todo-dialog";
import ViewTodoDialog from "./view-todo-dialog";

type TodoProps = {
  id: string;
  title: string;
  description: string;
  deadline: Date;
  createdAt: Date;
  updatedAt: Date;
  onTodoChange: () => Promise<void>;
};

function Todo({
  id,
  title,
  description,
  deadline,
  createdAt,
  updatedAt,
  onTodoChange,
}: TodoProps): JSX.Element {
  return (
    <Card className="gap-1 rounded-xs border-none" key={id}>
      <CardHeader className="m-0">
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="todo-content flex flex-row justify-between">
          <div className="todo-info flex flex-col max-w-3/4">
            <div className="todo-description line-clamp-1">
              <CardDescription>{description}</CardDescription>
            </div>
            <div className="todo-deadline">
              <CardDescription>
                Deadline: {deadline.toLocaleString()}
              </CardDescription>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 md:flex-row">
            <ViewTodoDialog
              id={id}
              title={title}
              description={description}
              deadline={deadline}
              createdAt={createdAt}
              updatedAt={updatedAt}
              onTodoChange={onTodoChange}
            />
            <DeleteTodoDialog id={id} onTodoDelete={onTodoChange} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export { Todo };
export type { TodoProps };
