import { CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { WidgetData } from "@/Oasis-components/widget-card/widget.interface";
import plusSvg from "@assets/plus.svg";
import { Label } from "@radix-ui/react-label";
import { useImmer } from "use-immer";
import { Todos } from "./todos.modal";

//logic:
/**
 * shows, todos, pending and finished
 * Widget logic
 * can click on select and scroll but clicking on anywhere should open the page.
 * display title, and due date.
 * top have a date with number of due items closer date to today
 * each one seperated by line item
 *
 */
function TodoWidget(todoData: { data: Todos[]; widgetData: WidgetData }) {
  const [currTodos, setUpdateTodos] = useImmer(todoData.data);
  const activeTodos = currTodos.filter((eachTodo) => !eachTodo.finished);
  const finishedTodos = currTodos.filter((eachTodo) => eachTodo.finished);

  function handleCheckBox(e: Todos) {
    const index = currTodos.findIndex((todo) => todo.TaskID === e.TaskID);
    const newTodo = { ...e, finished: !e.finished };
    const newList = [...currTodos];
    newList[index] = newTodo;
    setUpdateTodos(newList);
  }
  return (
    <>
      <div className="flex flex-col h-[100%]  overflow-y-auto ">
        <CardHeader className="flex flex-col justify-between items-center w-full px-2 mt-1">
          <div className="flex justify-between items-center w-full">
            <div className="font-semibold text-secondary-foreground">Today</div>
            <img src={plusSvg} alt="" />
          </div>
          <div className="flex justify-between items-center w-full">
            <div className="text-sm  text-secondary-foreground">Overdue</div>
            <div className="text-sm text-secondary-foreground">Reschedule</div>
          </div>
        </CardHeader>
        <Separator />
        <CardContent className="px-2" onClick={(e) => e.stopPropagation()}>
          {activeTodos.map((eachTodo, index) => {
            return (
              <TodoItem
                key={eachTodo.TaskID}
                toDoItem={eachTodo}
                onCheckBoxChanged={handleCheckBox}
              >
                {activeTodos.length - 1 > index && <Separator></Separator>}
              </TodoItem>
            );
          })}

          {finishedTodos.length > 0 ? (
            <>
              <Separator></Separator>
              <div className="font-semibold text-secondary-foreground">
                Past Todos
              </div>
              {finishedTodos.map((eachTodo, index) => {
                return (
                  <TodoItem
                    key={eachTodo.TaskID}
                    toDoItem={eachTodo}
                    onCheckBoxChanged={handleCheckBox}
                  >
                    {finishedTodos.length - 1 > index && (
                      <Separator></Separator>
                    )}
                  </TodoItem>
                );
              })}
            </>
          ) : (
            <></>
          )}
        </CardContent>
      </div>
    </>
  );
}

function TodoItem({
  toDoItem,
  onCheckBoxChanged,
  children,
}: {
  toDoItem: Todos;
  onCheckBoxChanged: (toDoItem: Todos) => void;
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="py-1">
        <div className="flex flex-row justify-between py-1">
          <div className="flex items-center space-x-2">
            <Input
              checked={toDoItem.finished}
              type="checkbox"
              id={toDoItem.TaskID}
              value={toDoItem.TaskID}
              className="h-4 w-4  border-gray-300 text-primary focus:ring-primary"
              onChange={() => onCheckBoxChanged(toDoItem)}
            />
            <Label
              htmlFor={toDoItem.TaskID}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {toDoItem.TaskMsg}
            </Label>
          </div>
          <span className="text-secondary-foreground text-sm">
            {new Date(Number(toDoItem.TaskTime) * 1000).toLocaleDateString() ??
              ""}
          </span>
        </div>
        {children}
      </div>
    </>
  );
}

export default TodoWidget;
