import React from "react";
import { ThemeProvider } from "styled-components";
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
  useLocation,
} from "react-router-dom";
import RootLayout from "./pages/RootLayout.js";
import AllMembers from "./pages/AllMembers.jsx";
import Rendezvous from "./pages/Rendezvous.jsx";
import Home from "./pages/Home.jsx";
import { theme, GlobalStyle } from "./styledUtils.js";
import Error from "./components/Error.jsx";
import ListView from "./components/rendesvouz_views/ListView.js";
import Calendar from "./components/Calendar.jsx";
import Month from "./components/rendesvouz_views/Month.jsx";
import Week from "./components/rendesvouz_views/Week.jsx";
import Day from "./components/rendesvouz_views/Day.jsx";
import SignIn from "./pages/auth/SignIn.js";
import SignUp from "./pages/auth/SignUp.js";
import ProtectedRoute from "./pages/protected_routes/ProtectedRoute.js";
import AdminProtectedRoute from "./pages/protected_routes/AdminProtectedRoute.js";
import UserDetail from "./pages/UserDetail.js";
import MyRendezvous from "./pages/MyRendezvous.js";
import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<RootLayout />}>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/" element={<ProtectedRoute />}>
        <Route index element={<Home />} errorElement={<Error />} />
        <Route
          path="my-rendezvous"
          element={<MyRendezvous />}
          loader={MyRendezvous.loader}
        />
        <Route path="admin" element={<AdminProtectedRoute />}>
          <Route
            path="rendezvous"
            element={<Rendezvous />}
            errorElement={<Error />}
          >
            <Route
              path="list"
              loader={ListView.loader}
              element={<ListView />}
            />
            <Route path="calendar" element={<Calendar />}>
              <Route
                path="month/:year/:month"
                loader={Month.loader as any}
                element={<Month />}
              />
              <Route
                path="week/:weekNo"
                loader={Week.loader as any}
                element={<Week />}
              />
              <Route
                path="day/:year/:month/:day"
                loader={Day.loader as any}
                element={<Day />}
              />
            </Route>
          </Route>
          <Route
            path="users"
            element={<AllMembers />}
            loader={AllMembers.loader}
            errorElement={<Error />}
          />
          <Route
            path="users/:uid"
            element={<UserDetail />}
            loader={UserDetail.loader}
          />
        </Route>
      </Route>
    </Route>
  )
);

function App() {
  return (
    <>
      <ReactNotifications />
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  );
}

export default App;
