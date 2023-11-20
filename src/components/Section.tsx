import { useDrop } from "react-dnd";
import { Task } from "../types";
import toast from "react-hot-toast";
import Header from "./Header";
import ToDo from "./ToDo";

type SectionProps = {
  status: string;
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  todos: Task[];
  inprogress: Task[];
  completed: Task[];
};

const Section = ({
  status,
  tasks,
  setTasks,
  todos,
  inprogress,
  completed,
}: SectionProps) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item: { id: number }) => addItemToSection(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  let text = "Todo";
  let bg = "bg-red-500";
  let tasksToMap = todos;

  if (status === "inprogress") {
    text = "In progress";
    bg = "bg-yellow-500";
    tasksToMap = inprogress;
  } else if (status === "completed") {
    text = "Completed";
    bg = "bg-green-500";
    tasksToMap = completed;
  }

  function addItemToSection(id: number) {
    setTasks((pre) => {
      return pre.map((task) => {
        return task.id === id ? { ...task, status } : task;
      });
    });
    toast("task status changed", { icon: "😮" });
  }

  return (
    <div
      ref={drop}
      className={`w-72 rounded-md p-2 ${isOver ? "bg-slate-200" : ""}`}
    >
      <Header text={text} bg={bg} count={tasksToMap.length} />{" "}
      {tasksToMap.length > 0 &&
        tasksToMap.map((task) => (
          <ToDo key={task.id} task={task} tasks={tasks} setTasks={setTasks} />
        ))}
    </div>
  );
};

export default Section;
