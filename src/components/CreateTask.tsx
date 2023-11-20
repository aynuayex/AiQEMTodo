import React, { useState } from "react";
import { Task } from "../types";
import toast from "react-hot-toast";

type CreateTaskProps = {
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
};

function CreateTask({ setTasks }: CreateTaskProps) {
  const [task, setTask] = useState({
    id: 0,
    name: "",
    status: "todo",
    category: "home",
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (task.name.length < 3)
      return toast.error("A task must have more than 3 characters!");
    else if (task.name.length > 25)
      return toast.error("A task must have less than 25 characters!");

    setTasks((pre) => [...pre, task]);

    toast.success("Task created!");

    setTask({ id: 0, name: "", status: "todo", category: "home" });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center gap-3 sm:flex-row md:flex-row lg:flex-row xl:flex-row 2xl-flex-row"
    >
      <input
        type="text"
        value={task.name}
        onChange={(e) =>
          setTask((pre) => ({ ...pre, id: Date.now(), name: e.target.value }))
        }
        className="border-2 border-slate-400 bg-slate-100 rounded-md h-12 w-64 px-1"
      />
      <button className="bg-cyan-500 h-12 px-4 text-white rounded-md ">
        Create
      </button>
    </form>
  );
}

export default CreateTask;
