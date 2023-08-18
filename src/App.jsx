import { ThemeProvider } from "styled-components";
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
} from "react-router-dom";
import HomeLayout from "./pages/HomeLayout.jsx";
import AllMembers, { loader as userLoader } from "./pages/AllMembers.jsx";
import Rendezvous from "./pages/Rendezvous.jsx";
import Home from "./pages/Home.jsx";
import { theme, GlobalStyle } from "./styledUtils.js";
import Error from "./components/Error.jsx";
import AllRendezvous from "./components/AllRendezvous.jsx";
import Calendar from "./components/Calendar.jsx";
import Month, {
  loader as monthLoader,
} from "./components/randezvouz_views/Month";
import Week from "./components/randezvouz_views/Week.jsx";
import Day from "./components/randezvouz_views/Day.jsx";

console.log(monthLoader);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<HomeLayout />}>
      <Route index element={<Home />} errorElement={<Error />} />
      <Route
        path="randevular"
        element={<Rendezvous />}
        errorElement={<Error />}
      >
        <Route path="tum-randevular" element={<AllRendezvous />} />
        <Route path="takvim" element={<Calendar />}>
          <Route index loader={monthLoader} element={<Month />} />
          <Route path="hafta" element={<Week />} />
          <Route path="gun" element={<Day />} />
        </Route>
      </Route>
      <Route
        path="uyeler"
        element={<AllMembers />}
        loader={userLoader}
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
