import { ThemeProvider } from "styled-components";
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./pages/RootLayout.js";
import AllMembers from "./pages/AllMembers.jsx";
import Rendezvous from "./pages/Rendezvous.jsx";
import Home from "./pages/Home.jsx";
import { theme, GlobalStyle } from "./styledUtils.js";
import Error from "./components/Error.jsx";
import ListView from "./components/ListView.jsx";
import Calendar from "./components/Calendar.jsx";
import Month from "./components/rendesvouz_views/Month.jsx";
import Week from "./components/rendesvouz_views/Week.jsx";
import Day from "./components/rendesvouz_views/Day.jsx";
import LogIn from "./pages/auth/LogIn.jsx";
import SignUp from "./pages/auth/SignUp.js";
import ProtectedRoute from "./pages/ProtectedRoute.js";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<RootLayout />}>
      <Route path="/login" element={<LogIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/" element={<ProtectedRoute />}>
        <Route index element={<Home />} errorElement={<Error />} />
        <Route
          path="rendezvous"
          element={<Rendezvous />}
          errorElement={<Error />}
        >
          <Route path="list" loader={ListView.loader} element={<ListView />} />
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
      </Route>
    </Route>
  )
);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
