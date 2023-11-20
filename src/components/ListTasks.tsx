import { useState, useEffect } from "react";
import type { Task } from "../types";
import Section from "./Section";

type ListTasksProps = {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
};

function ListTasks({ tasks, setTasks }: ListTasksProps) {
  const [todos, setTodos] = useState<Task[]>([]);
  const [inprogress, setInprogress] = useState<Task[]>([]);
  const [completed, setCompleted] = useState<Task[]>([]);

  useEffect(() => {
    const fTodos = tasks.filter((task) => task.status === "todo");
    const fInProgress = tasks.filter((task) => task.status === "inprogress");
    const fCompleted = tasks.filter((task) => task.status === "completed");

    setTodos(fTodos);
    setInprogress(fInProgress);
    setCompleted(fCompleted);
  }, [tasks]);

  const statuses = ["todo", "inprogress", "completed"];

  return (
    <div className="flex gap-16 flex-wrap justify-center last:mb-20">
      {statuses.map((status) => (
        <Section
          key={status}
          {...{ status, tasks, setTasks, todos, inprogress, completed }}
        />
      ))}
    </div>
  );
}

export default ListTasks;
