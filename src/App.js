import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Main from "./pages/Main";
import TeamInfo from "./pages/TeamInfo";
import "./App.css"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path={process.env.PUBLIC_URL + "/"} element={<Main />} />
        <Route path={process.env.PUBLIC_URL + "/teamInfo/:teamName"} element={<TeamInfo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
