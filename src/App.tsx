import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Home from "./Oasis-components/home/home";
import { SignInorUp } from "./Oasis-components/Login/sign-in";
import { useAuth } from "./Oasis-components/Auth/auth";
import ManageSubscriptions from "./Oasis-components/subscriptions/subscriptions";
import { CreateWidget } from "./Oasis-components/create-widget/create-widget";
import { AddProject } from "./Oasis-components/add-project/add-project";
import { Feedback } from "./Oasis-components/feedback/feedback";
import { AnimatePresence } from "framer-motion";
import { NavBar } from "./Oasis-components/nav-bar/nav.component";

function PageNotFound() {
  return (
    <div>
      <h1>Page Not Found</h1>
    </div>
  );
}

function App() {
  const location = useLocation();
  return (
    <>
      <NavBar />

      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path="/auth" element={<SignInorUp />}></Route>
          <Route
            index
            element={
              <PrivateRoutes>
                <Home />
              </PrivateRoutes>
            }
          ></Route>
          <Route
            path="home"
            element={
              <PrivateRoutes>
                <Home />
              </PrivateRoutes>
            }
          ></Route>
          <Route
            path={"subscriptions"}
            element={<ManageSubscriptions />}
          ></Route>
          <Route path={"create-widget"} element={<CreateWidget />}></Route>
          <Route path={"add-project"} element={<AddProject />}></Route>
          <Route path={"feedback"} element={<Feedback />}></Route>

          <Route path="*" element={<PageNotFound />}></Route>
        </Routes>
      </AnimatePresence>
    </>
  );
}

function PrivateRoutes({ children }: { children: React.ReactNode }) {
  const { session } = useAuth();
  if (session === undefined) {
    return;
  }
  return <>{session ? <>{children}</> : <Navigate to={"/auth"} />}</>;
}

export default App;

{
  /* <Route path={WidgetType.Clock}></Route>
        <Route path={WidgetType.Weather}></Route>

        <Route path={WidgetType.Journal}></Route>
        <Route path={WidgetType.Countries}></Route>
        <Route path={WidgetType.Gallery}></Route>
        <Route path={WidgetType.Research}></Route>
        <Route path={WidgetType.Project}></Route>
        <Route path={WidgetType.Todos}></Route> */
}
{
  /* for custom component */
}
{
  /* <Route path=":id"></Route> */
}
