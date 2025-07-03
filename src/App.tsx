import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Oasis-components/home/home";
import { WidgetType } from "./Oasis-components/widget-card/widget.interface";

function PageNotFound() {
  return (
    <div>
      <h1>Page Not Found</h1>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/home">
        <Route index element={<Home />}></Route>
        <Route path={WidgetType.Clock}></Route>
        <Route path={WidgetType.Weather}></Route>
        <Route path={WidgetType.Journal}></Route>
        <Route path={WidgetType.Countries}></Route>
        <Route path={WidgetType.Gallery}></Route>
        <Route path={WidgetType.Research}></Route>
        <Route path={WidgetType.Project}></Route>
        <Route path={WidgetType.Todos}></Route>
        {/* for custom component */}
        {/* <Route path=":id"></Route> */}
      </Route>
      <Route path="*" element={<PageNotFound />}></Route>
    </Routes>
  );
}

export default App;
