import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Main from "./pages/Main";
import TeamInfo from "./pages/TeamInfo";
import "./App.css"
import { useSelector } from "react-redux";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./styles/theme";

function App() {
  const darkMode = useSelector(state => state.darkMode);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <BrowserRouter>
        <Routes>
          <Route exact path={process.env.PUBLIC_URL + "/"} element={<Main />} />
          <Route path="/teamInfo/:teamName" element={<TeamInfo />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
