import { AnimatePresence } from "framer-motion";
import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import { AddProject } from "./Oasis-components/add-project/add-project";
import { useAuth } from "./Oasis-components/Auth/auth";
import { CreateWidget } from "./Oasis-components/create-widget/create-widget";
import { Feedback } from "./Oasis-components/feedback/feedback";
import Home from "./Oasis-components/home/home";
import { SignInorUp } from "./Oasis-components/Login/sign-in";
import { NavBar } from "./Oasis-components/nav-bar/nav.component";
import ManageSubscriptions from "./Oasis-components/subscriptions/subscriptions";

function PageNotFound() {
  return (
    <div>
      <h1>Page Not Found</h1>
    </div>
  );
}

function AppLayout() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}

function App() {
  const location = useLocation();
  return (
    <>
      <AnimatePresence mode="wait" initial={true}>
        <Routes location={location} key={location.pathname}>
          {/* Public routes */}
          <Route path="/auth" element={<SignInorUp />} />

          {/* Protected routes */}
          <Route
            element={
              <PrivateRoutes>
                <AppLayout />
              </PrivateRoutes>
            }
          >
            <Route index element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="subscriptions" element={<ManageSubscriptions />} />
            <Route path="create-widget" element={<CreateWidget />} />
            <Route path="add-project" element={<AddProject />} />
            <Route path="feedback" element={<Feedback />} />
          </Route>

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

function PrivateRoutes({ children }: { children: React.ReactNode }) {
  const { session } = useAuth();
  if (session === undefined) {
    return null; // or a loading spinner
  }
  return <>{session ? <>{children}</> : <Navigate to={"/auth"} />}</>;
}

export default App;
