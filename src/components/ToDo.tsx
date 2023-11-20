import { useState, useRef, useEffect } from "react";
import { useDrag } from "react-dnd";
import toast from "react-hot-toast";
import { Task } from "../types";
import { GrInProgress } from "react-icons/gr";
import { MdOutlineAddBox, MdDelete } from "react-icons/md";
import { createPopper, Placement } from "@popperjs/core";

type ToDoProps = {
  task: Task;
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
};

type CategoryOption = {
  value: string;
  label: string;
};

const ToDo = ({ task, tasks, setTasks }: ToDoProps) => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const referenceElement = useRef<HTMLButtonElement>(null);
  const popperElement = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const handleCategoryClick = (category: CategoryOption, id: number) => {
    setTasks((pre) => {
      return pre.map((task) =>
        task.id === id ? { ...task, category: category.value } : task
      );
    });
    setShowDropdown(false);
  };

  useEffect(() => {
    if (referenceElement.current && popperElement.current) {
      const popperInstance = createPopper(
        referenceElement.current,
        popperElement.current,
        {
          placement: "bottom-start" as Placement,
        }
      );

      return () => {
        popperInstance.destroy();
      };
    }
  }, [showDropdown]);

  const categoryOptions: CategoryOption[] = [
    { value: "work", label: "Work" },
    { value: "home", label: "Home" },
    { value: "personal", label: "Personal" },
    // Add more categories as needed
  ];

  function handleComplete(id: number, isComplete: boolean) {
    setTasks((pre) => {
      return pre.map((task) =>
        task.id === id
          ? isComplete
            ? { ...task, status: "completed" }
            : { ...task, status: "todo" }
          : task
      );
    });
  }

  function handleProgress(id: number) {
    setTasks((pre) => {
      return pre.map((task) =>
        task.id === id
          ? { ...task, status: task.status === "todo" ? "inprogress" : "todo" }
          : task
      );
    });
  }

  function handleDelete(id: number) {
    setTasks(tasks.filter((task) => task.id !== id));
    toast("Task removed", { icon: "💀" });
  }

  return (
    <div
      ref={drag}
      className={`relative mt-8 p-4 shadow-md ${
        isDragging ? "opacity-25" : ""
      } cursor-grab `}
    >
      <label
        className="grid grid-cols-2 gap-2"
        title="click to toggle between todo and complete"
      >
        <div className="flex items-center gap-2">
          <input
            className="scale-150 "
            type="checkbox"
            onChange={(e) => handleComplete(task.id, e.target.checked)}
            checked={task.status === "completed" ? true : false}
          />
          <p>{task.name}</p>
        </div>
        {task.category && (
          <span className="text-gray-500 col-span-2"> ({task.category})</span>
        )}
      </label>

      <div className="">
        <button
          title="click to add to a category"
          onClick={() => setShowDropdown(!showDropdown)}
          className="absolute bottom-3.5 right-16 text-2xl text-slate-600"
          ref={referenceElement}
        >
          <MdOutlineAddBox />
        </button>
        {showDropdown && (
          <div
            className="absolute z-50 top-full left-0 mt-2 bg-white border border-gray-300 shadow-md rounded-md p-2"
            ref={popperElement}
          >
            {categoryOptions.map((category) => (
              <div
                key={category.value}
                className="cursor-pointer hover:bg-gray-100 p-2"
                onClick={() => handleCategoryClick(category, task.id)}
              >
                {category.label}
              </div>
            ))}
          </div>
        )}
      </div>

      <button
        title="click to toggle between todo and in progress"
        onClick={() => handleProgress(task.id)}
        className="absolute bottom-3.5 right-9 text-xl text-slate-600"
      >
        <GrInProgress />
      </button>
      <button
        onClick={() => handleDelete(task.id)}
        className="absolute bottom-3 right-1 text-2xl text-slate-600"
      >
        <MdDelete />
      </button>
    </div>
  );
};

export default ToDo;
