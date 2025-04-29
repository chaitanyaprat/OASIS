import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@components/ui/card";
import { WidgetData } from "./widget.interface";
import { useGetWidgetData } from "@/Oasis-services/hooks/useData";
import { useNavigate } from "react-router-dom";

//figure min max width and height of cards
//use default to add a new widget, use standard sizes for better ui
const sizeClasses: Record<string, string> = {
  square: "min-w-35 min-h-35",
  two_squares: "col-span-3",
  large_square: "col-span-2 row-span-2 ",
  tall: "w-40 min-h-60",
};
//each widget makes api call and get respective data, should have spinner state before it loads
function WidgetCard(widgetData: WidgetData) {
  const widgetClass = sizeClasses[widgetData.widgetSize] || sizeClasses.default;
  const { data, error, isLoading } = useGetWidgetData(
    [widgetData.type],
    widgetData
  );
  const navigate = useNavigate();

  return (
    <Card
      onClick={() => navigate(widgetData.type)}
      className={`min-w-25 min-h-25 ${widgetClass} bg-slate-400 rounded-2xl shadow-xl/30 flex `}
    >
      <CardHeader>
        <CardTitle>{}</CardTitle>
        <CardTitle>{error?.name}</CardTitle>
        <CardTitle>{String(isLoading)}</CardTitle>
      </CardHeader>
      <CardContent></CardContent>
      <CardFooter>
        <CardTitle>{widgetData.name}</CardTitle>
      </CardFooter>
    </Card>
  );
}

export default WidgetCard;
