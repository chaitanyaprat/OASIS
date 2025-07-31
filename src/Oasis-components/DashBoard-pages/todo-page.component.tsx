import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useImmer } from "use-immer";
import { z } from "zod";
import { TodoPageBackground } from "../user-profile/GraphPaperBackground";

enum Priority {
  low = "low",
  medium = "medium",
  high = "high",
}
interface TodoItem {
  id: string;
  title: string;
  content: string;
  priority?: Priority;
  dueDate?: Date;
  taskImg: string; // Optional image for the task
  footer: string;
  status: "pending" | "deleted" | "completed"; // Optional status field
}

const TodoZodSchema = z.object({
  title: z
    .string()
    .min(1, "Title must be at least 1 character long")
    .max(100, "Title must be at most 100 characters long"),
  dueDate: z.date(),
  priority: z.enum(["low", "medium", "high"]),
  content: z.string(),
  taskImg: z.string().optional(),
});

type TodoForm = z.infer<typeof TodoZodSchema>;

const todoItems: TodoItem[] = [
  {
    id: "1",
    title: "Finish report",
    content: "Complete the Q2 financial report.",
    footer: "Due: Tomorrow",
    priority: Priority.high,
    dueDate: new Date(),
    taskImg: "report.png", // Example image
    status: "pending",
  },
  {
    id: "2",
    title: "Design mockups",
    content: "Create mockups for the new landing page.",
    footer: "In Progress",
    priority: Priority.medium,
    dueDate: new Date(),
    taskImg: "mockup.png", // Example image
    status: "completed",
  },
  {
    id: "3",
    title: "Team meeting",
    content: "Weekly sync-up with the development team.",
    footer: "10:00 AM",
    priority: Priority.low,
    dueDate: new Date(),
    taskImg: "meeting.png", // Example image
    status: "deleted",
  },
  {
    id: "4",
    title: "Fix login bug",
    content: "Investigate and resolve the issue with user login.",
    footer: "High Priority",
    priority: Priority.high,
    dueDate: new Date(),
    taskImg: "bug.png", // Example image
    status: "pending",
  },
  {
    id: "5",
    title: "Update website",
    content: "Refresh the homepage with new content and images.",
    footer: "Due: Next Week",
    priority: Priority.medium,
    dueDate: new Date(),
    taskImg: "website.png", // Example image
    status: "deleted",
  },
  {
    id: "6",
    title: "Client feedback",
    content: "Review and respond to client feedback on the latest project.",
    footer: "Pending Review",
    priority: Priority.low,
    dueDate: new Date(),
    taskImg: "feedback.png", // Example image
    status: "pending",
  },
  {
    id: "7",
    title: "Prepare presentation",
    content: "Create slides for the upcoming client presentation.",
    footer: "Due: Friday",
    priority: Priority.high,
    dueDate: new Date(),
    taskImg: "presentation.png", // Example image
    status: "pending",
  },
  {
    id: "8",
    title: "Code review",
    content: "Review pull requests from the team.",
    footer: "In Progress",
    priority: Priority.medium,
    dueDate: new Date(),
    taskImg: "code_review.png", // Example image
    status: "completed",
  },
];

export function TodoPage() {
  const [todos, setTodos] = useImmer<TodoItem[]>(todoItems);
  const [selectedModal, setSelectedModal] = useState<{
    selectedModal: boolean;
    item?: TodoItem;
  }>({
    selectedModal: false,
    item: undefined,
  });

  const [layoutId, setLayoutId] = useState<string | null>(null);
  const [showNav, setShowNav] = useState(false);
  const [displayedTodoView, setDisplayedTodoView] = useState<{
    complete: number;
    pending: number;
    deleted: number;
  }>({
    complete: 1 / 2,
    pending: 1 / 2,
    deleted: 1 / 2,
  });

  const handleUpdateStatus = (id: string, status: TodoItem["status"]) => {
    setTodos((currentTodos) =>
      currentTodos.map((todo) => (todo.id === id ? { ...todo, status } : todo))
    );
  };
  const addOrEditTodo = (todo: TodoItem) => {
    const isEditing = todos.some((t) => t.id === todo.id);
    if (isEditing) {
      setTodos(todos.map((t) => (t.id === todo.id ? todo : t)));
    } else {
      setTodos([todo, ...todos]);
    }
  };

  return (
    <>
      <div className="h-full w-full flex flex-col">
        <div className="h-10 w-full  backdrop-blur-md bg-gradient-to-tr from-destructive/50 to-primary shadow-2xl border flex justify-between items-center">
          <div
            className="h-full w-xs  m-0 p-0"
            onMouseLeave={() => {
              setShowNav(false);
            }}
          >
            <Button
              className="h-8 w-8 ms-2 mt-0.5  rounded-full border-2 shadow-2xl"
              onMouseEnter={() => {
                setShowNav(true);
              }}
            >
              |||
            </Button>
          </div>
          <div className="h-full  m-0 p-0 flex items-center">
            <Button className="h-8 w-8 mr-2  rounded-full border-2 shadow-2xl">
              @
            </Button>
          </div>
        </div>
        <div className="flex-1 w-full overflow-auto relative flex ">
          <TodoPageBackground />
          <AnimatePresence>
            {showNav && (
              // Animate the left navigation panel
              <motion.div
                key="left-nav"
                initial={{ x: "-100%" }}
                animate={{
                  x: 0,
                  transition: { duration: 0.2, ease: "easeInOut" },
                }}
                exit={{
                  x: "-100%",
                  transition: { duration: 0.2, ease: "easeInOut" },
                }}
                id="left-nav"
                className="absolute inset-0 h-full w-full bg-transparent z-10"
              >
                <div
                  className="h-full mb-10 w-xs bg-transparent z-10"
                  onMouseLeave={() => {
                    setShowNav(false);
                  }}
                  onMouseEnter={() => {
                    setShowNav(true);
                  }}
                >
                  <Card className="h-[90%] z-10  mb-10 w-xs rounded-l-none shadow-2xl bg-accent/10 backdrop-blur-md">
                    <CardHeader>
                      <CardTitle>Project Name</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-2">
                      <motion.div
                        className="flex justify-between items-center w-full "
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.99 }}
                      >
                        <Button
                          variant={"ghost"}
                          className=" w-full hover:shadow-xl hover:font-bold focus:shadow-outline "
                          onClick={() => {
                            setDisplayedTodoView({
                              complete: 1 / 2,
                              pending: 1 / 2,
                              deleted: 1 / 2,
                            });
                          }}
                        >
                          {" "}
                          DashBoard{" "}
                        </Button>
                      </motion.div>
                      <motion.div
                        className="flex justify-between items-center w-full"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.99 }}
                      >
                        <Button
                          variant={"outline"}
                          className=" w-full hover:shadow-xl hover:font-bold focus:shadow-outline"
                          onClick={() => {
                            setDisplayedTodoView({
                              complete: 0,
                              pending: 1,
                              deleted: 0,
                            });
                          }}
                        >
                          {" "}
                          Pending Tasks{" "}
                        </Button>
                      </motion.div>
                      <motion.div
                        className="flex justify-between items-center w-full"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.99 }}
                      >
                        <Button
                          variant={"secondary"}
                          className=" w-full hover:shadow-xl hover:font-bold focus:shadow-outline"
                          onClick={() => {
                            setDisplayedTodoView({
                              complete: 1,
                              pending: 0,
                              deleted: 0,
                            });
                          }}
                        >
                          {" "}
                          Complete Tasks{" "}
                        </Button>
                      </motion.div>
                      <motion.div
                        className="flex justify-between items-center w-full"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.99 }}
                      >
                        <Button
                          variant={"secondary"}
                          className=" w-full hover:shadow-xl hover:font-bold focus:shadow-outline"
                          onClick={() => {
                            setDisplayedTodoView({
                              complete: 0,
                              pending: 0,
                              deleted: 1,
                            });
                          }}
                        >
                          deleted Tasks{" "}
                        </Button>
                      </motion.div>

                      <motion.div
                        className="flex justify-between items-center w-full"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.99 }}
                      >
                        <Button
                          variant={"link"}
                          className=" w-full hover:shadow-xl hover:font-bold focus:shadow-outline"
                        >
                          {" "}
                          FeedBack{" "}
                        </Button>
                      </motion.div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <Card
            id="main-content"
            className="flex-1  flex flex-row  justify-between gap-3 z-1 border-4 shadow-2xl mt-10 mb-10 mr-10 ml-30 p-10"
          >
            <motion.div
              layout
              style={{
                flex: displayedTodoView.pending, // Adjust flex based on view
              }}
              className="w-full  rounded-2xl shadow-2xl overflow-auto  [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              <div className="sticky top-0 mb-2 mt-0  bg-card shadow-2xl">
                <div className=" rounded-t-2xl bg-accent/50 p-2 bg-secondary shadow-2xl">
                  <div className="flex justify-between items-center ">
                    <h1 className="text-l font-bold">Todo Page</h1>
                    {/* add new to do */}
                    <motion.div layoutId="new">
                      <Button
                        className="mr-1 rounded-full shadow-2xl cursor-pointer"
                        onClick={() => {
                          setSelectedModal({
                            selectedModal: true,
                            item: undefined,
                          });
                          setLayoutId("new");
                        }}
                      >
                        +
                      </Button>
                    </motion.div>
                  </div>
                  <div>
                    <span>20 Jan</span>
                    <span className="ml-2">badge</span>
                  </div>
                </div>
              </div>
              <div className="w-full flex flex-col gap-2 overflow-auto pb-2">
                {/* open the active todos */}
                {todos
                  .filter((item) => item.status === "pending")
                  .map((item) => (
                    <motion.div
                      key={item.id}
                      layoutId={item.id}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => {
                        setSelectedModal({
                          selectedModal: true,
                          item: item,
                        });
                        setLayoutId(item.id);
                      }}
                      className="cursor-pointer mr-2 ml-2"
                    >
                      <Card className="hover:bg-accent/50 transition-colors">
                        <CardHeader className="flex justify-between items-center">
                          <CardTitle>{item.title}</CardTitle>
                          <div className="flex items-center gap-2">
                            <Button
                              className="rounded-full shadow-2xl"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleUpdateStatus(item.id, "deleted");
                              }}
                            >
                              D
                            </Button>
                            <Button
                              className="rounded-full shadow-2xl"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleUpdateStatus(item.id, "completed");
                              }}
                            >
                              C
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent>{item.content}</CardContent>
                        <CardFooter>{item.footer}</CardFooter>
                      </Card>
                    </motion.div>
                  ))}
              </div>
            </motion.div>
            <motion.div
              layout
              style={{
                flex: 1 - displayedTodoView.pending, // Adjust flex based on view
              }}
              className="w-full  flex flex-col justify-between gap-2"
            >
              <motion.div
                layout
                style={{ flex: displayedTodoView.deleted }}
                className=" overflow-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              >
                <Card className=" h-full w-full overflow-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  <CardHeader>
                    <CardTitle>Deleted</CardTitle>
                  </CardHeader>

                  {/* to open deleted todos */}
                  {todos
                    .filter((item) => item.status === "deleted")
                    .map((item) => (
                      <motion.div
                        className="cursor-pointer mr-2 ml-2 "
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        layoutId={item.id}
                        key={item.id}
                        onClick={() => {
                          setSelectedModal({
                            selectedModal: true,
                            item: item,
                          });
                          setLayoutId(item.id);
                        }}
                      >
                        <Card className="hover:bg-accent/50 transition-colors">
                          <CardHeader className="flex justify-between items-center">
                            <CardTitle>{item.title}</CardTitle>
                            <div className="flex items-center gap-2">
                              <Button
                                className="rounded-full shadow-2xl"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleUpdateStatus(item.id, "pending");
                                }}
                              >
                                restore
                              </Button>
                            </div>
                          </CardHeader>
                          <CardFooter>{item.footer}</CardFooter>
                        </Card>
                      </motion.div>
                    ))}
                </Card>
              </motion.div>
              <motion.div
                layout
                style={{ flex: displayedTodoView.complete }}
                className="overflow-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              >
                <Card className="h-full w-full overflow-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  {/* to open completed todos */}
                  <CardHeader>
                    <CardTitle>Completed</CardTitle>
                  </CardHeader>

                  {todos
                    .filter((item) => item.status === "completed")
                    .map((item) => (
                      <motion.div
                        className="cursor-pointer mr-2 ml-2"
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        key={item.id}
                        layoutId={item.id}
                        onClick={() => {
                          setSelectedModal({
                            selectedModal: true,
                            item: item,
                          });
                          setLayoutId(item.id);
                        }}
                      >
                        <Card className="hover:bg-accent/50  transition-colors ">
                          <CardHeader className="flex justify-between items-center">
                            <CardTitle>{item.title}</CardTitle>
                            <div className="flex items-center gap-2">
                              <Button
                                className="rounded-full shadow-2xl"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleUpdateStatus(item.id, "pending");
                                }}
                              >
                                restore
                              </Button>
                            </div>
                          </CardHeader>
                          <CardFooter>{item.footer}</CardFooter>
                        </Card>
                      </motion.div>
                    ))}
                </Card>
              </motion.div>
            </motion.div>
          </Card>
          <TodoItemModal
            selectedModal={selectedModal}
            setSelectedModal={setSelectedModal}
            layoutId={layoutId}
            setLayoutId={setLayoutId}
            addOrEditTodo={addOrEditTodo}
          />
        </div>
      </div>
    </>
  );
}

export function TodoItemModal({
  selectedModal,
  setSelectedModal,
  layoutId,
  setLayoutId,
  addOrEditTodo,
}: {
  selectedModal: { selectedModal: boolean; item?: TodoItem };
  setSelectedModal: (selectedModal: {
    selectedModal: boolean;
    item?: TodoItem;
  }) => void;
  layoutId: string | null;
  setLayoutId: (id: string | null) => void;
  addOrEditTodo: (todo: TodoItem) => void;
}) {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<TodoForm>({
    resolver: zodResolver(TodoZodSchema),
    defaultValues: {
      title: "", // Default title for new todo
      dueDate: new Date(),
      priority: Priority.low, // Default priority
      content: "", // Default content for new todo
    },
  });
  const handleModalClose = () => {
    reset(); // Reset form when closing modal
    // Reset layoutId
    setSelectedModal({
      selectedModal: false,
      item: undefined, // Clear selected item
    });
    setLayoutId(null);
  };

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleModalClose();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [setSelectedModal, setLayoutId]);

  if (selectedModal.selectedModal) {
    setValue("title", selectedModal.item?.title || "New Task");
    setValue("dueDate", selectedModal.item?.dueDate || new Date());
    setValue("priority", selectedModal.item?.priority || Priority.low);
    setValue("content", selectedModal.item?.content || "");
  }

  return (
    <>
      <AnimatePresence>
        {selectedModal.selectedModal && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => {
              handleModalClose();
            }} // Close modal on overlay click
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              layoutId={layoutId ?? "new"}
              className="w-full max-w-2xl bg-card rounded-2xl shadow-2xl h-[80%] aspect-square"
              onClick={(e) => e.stopPropagation()}
            >
              <Card className="border-0 shadow-none h-full w-full">
                <CardHeader className="flex flex-row items-start justify-between">
                  <CardTitle className="text-2xl">Add Task</CardTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full"
                    onClick={() => {
                      handleModalClose();
                    }} // Close modal on X click
                  >
                    Close
                  </Button>
                </CardHeader>
                <CardContent className="border-0 shadow-none h-full w-full">
                  <form
                    id="todo-form"
                    onSubmit={handleSubmit((data) => {
                      console.log(data);
                      addOrEditTodo({
                        ...data,
                        id: selectedModal.item?.id || Math.random().toString(),
                        status: selectedModal.item?.status || "pending",
                        footer: `${data.priority} priority`,
                        priority: data.priority as Priority,
                        taskImg: data.taskImg || "", // Handle image upload
                      });
                      handleModalClose();
                      // Handle form submission logic here
                    })}
                    className="space-y-4"
                  >
                    <div className="grid gap-2">
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        type="text"
                        placeholder="e.g., Finish Q2 report"
                        {...register("title")}
                      />
                      {errors.title && (
                        <p className="text-red-500 text-sm">
                          {errors.title.message}
                        </p>
                      )}
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="dueDate">Due Date</Label>
                      <Input
                        type="date"
                        id="dueDate"
                        {...register("dueDate")}
                      />
                      {errors.dueDate && (
                        <p className="text-red-500 text-sm">
                          {errors.dueDate.message}
                        </p>
                      )}
                    </div>
                    <div className="grid gap-2">
                      <Label>Priority</Label>
                      <div className="flex items-center gap-4">
                        <Label className="flex items-center gap-2 font-normal cursor-pointer">
                          <input
                            type="radio"
                            value={Priority.low}
                            {...register("priority")}
                          />
                          Low
                        </Label>
                        <Label className="flex items-center gap-2 font-normal cursor-pointer">
                          <input
                            type="radio"
                            value={Priority.medium}
                            {...register("priority")}
                          />
                          Medium
                        </Label>
                        <Label className="flex items-center gap-2 font-normal cursor-pointer">
                          <input
                            type="radio"
                            value={Priority.high}
                            {...register("priority")}
                          />
                          High
                        </Label>
                      </div>
                      {errors.priority && (
                        <p className="text-red-500 text-sm">
                          {errors.priority.message}
                        </p>
                      )}
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="content">Description</Label>
                      <Input
                        type="text"
                        id="content"
                        placeholder="Add more details..."
                        {...register("content")}
                      />
                      {errors.content && (
                        <p className="text-red-500 text-sm">
                          {errors.content.message}
                        </p>
                      )}
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="taskImage">Image</Label>
                      <Input
                        type="file"
                        id="taskImage"
                        // {...register("taskImg")}
                      />
                      {errors.taskImg && (
                        <p className="text-red-500 text-sm">
                          {errors.taskImg.message}
                        </p>
                      )}
                    </div>
                  </form>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                  <Button type="submit" form="todo-form">
                    Save
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
