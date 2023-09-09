import { ThemeProvider } from "styled-components";
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
} from "react-router-dom";
import HomeLayout from "./pages/HomeLayout.jsx";
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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<HomeLayout />}>
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
            loader={Month.loader}
            element={<Month />}
          />
          <Route path="week/:weekNo" loader={Week.loader} element={<Week />} />
          <Route
            path="day/:year/:month/:day"
            loader={Day.loader}
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