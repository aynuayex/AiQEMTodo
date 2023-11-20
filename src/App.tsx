import { useEffect, useState } from "react";
import CreateTask from "./components/CreateTask";
import { Toaster } from "react-hot-toast";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { Task } from "./types";
import ListTasks from "./components/ListTasks";

function App() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const localValue: string | null = localStorage.getItem("tasks");
    return localValue ? JSON.parse(localValue) : [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <DndProvider backend={HTML5Backend}>
      <Toaster />
      <div className="bg-slate-100 min-h-screen w-screen flex flex-col items-center pt-28 gap-16 ">
        <CreateTask setTasks={setTasks} />
        <ListTasks tasks={tasks} setTasks={setTasks} />
      </div>
    </DndProvider>
  );
}

export default App;
