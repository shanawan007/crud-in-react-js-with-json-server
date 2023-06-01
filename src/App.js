import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Login from "./components/Login";
import Registeration from "./components/Registeration";
import EmployeeTable from "./components/EmployeeTable";
import AboutUs from "./components/Aboutus/AboutUs";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Home from "./components/Home";
import Layout from "./components/Layout";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route
              path="/EmployeeTable"
              element={<ProtectedRoutes Component={EmployeeTable} />}
            />
            <Route path="/" element={<ProtectedRoutes Component={Home} />} />
            <Route
              path="/Aboutus"
              element={<ProtectedRoutes Component={AboutUs} />}
            />
          </Route>
          <Route path="/login" element={<Login />} />

          <Route path="/Registeration" element={<Registeration />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
