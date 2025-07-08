import { Card } from "@components/ui/card";
import { WidgetData, WidgetType } from "./widget.interface";
import { useGetWidgetData } from "@/Oasis-services/hooks/useData";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import ClockWidget from "../widget-item-components/clock/clock.component";
import TodoWidget from "../widget-item-components/todo/todo.component";
import { Todos } from "../widget-item-components/todo/todos.modal";
import WeatherWidget from "../widget-item-components/weather/weather.component";
import GalleryWidget from "../widget-item-components/gallery/gallery.component";
import { PhotoData } from "../widget-item-components/gallery/gallery.modal";

//figure min max width and height of cards?
//use default to add a new widget, use standard sizes for better ui?
//how to make this configurables so that all widgets have uniform sizes but in proportion with standard
//apple has standard widget sizes, check it out
//search bar for each page, helps look up items like in todos, on home for widgets etc

//each widget makes api call and get respective data, should have spinner state before it loads
function WidgetCard(widgetData: WidgetData) {
  const { data, error, isLoading } = useGetWidgetData(
    [widgetData.type],
    widgetData
  );
  console.log(widgetData.name, data);
  const navigate = useNavigate();
  return (
    <Card
      // onClick={() => navigate(widgetData.type)}
      className={`h-full ${widgetData.type != "rect" && "aspect-square"} overflow-auto hover:bg-accent hover:text-accent-foreground rounded-2xl shadow-sm flex py-0 px-0 gap-1`}
    >
      {(() => {
        if (isLoading) {
          return (
            <div className="flex flex-col space-y-1 h-[100%] p">
              <Skeleton className="h-[50%] w-[90%] rounded-xl pt-3 ml-1"></Skeleton>
              <Skeleton className="h-[20%] w-[70%]  rounded-xl pt-3 ml-1"></Skeleton>
              <Skeleton className="h-[10%] w-[60%] rounded-xl pt-3 ml-1"></Skeleton>
            </div>
          );
        } else if (data) {
          return (
            <WidgetCardData
              data={data}
              widgetData={widgetData}
            ></WidgetCardData>
          );
        } else {
          // return <ErrorHandler></ErrorHandler>;
          return <p>error scenario</p>;
        }
      })()}
    </Card>
  );
}
function WidgetCardData({
  data,
  widgetData,
}: {
  data: unknown;
  widgetData: WidgetData;
}) {
  switch (widgetData.type) {
    case WidgetType.Clock:
      return <ClockWidget />;
    case WidgetType.Todos:
      return <TodoWidget data={data as Todos[]} widgetData={widgetData} />;
    case WidgetType.Weather:
      return <WeatherWidget />;
    case WidgetType.Gallery:
      return (
        <GalleryWidget gallery={data as PhotoData[]} widgetData={widgetData} />
      );
    default:
      return <p>hello world</p>;
  }
}

export default WidgetCard;
