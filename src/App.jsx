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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<HomeLayout />}>
      <Route index element={<Home />} errorElement={<Error />} />
      <Route
        path="randevular"
        element={<Rendezvous />}
        errorElement={<Error />}
      />
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
