import "./App.css";
import { Router } from "@reach/router";
import AddUser from "./pages/AddUser";
import Home from "./pages/Home";
import EditUser from "./components/EditUser";

function App() {
  return (
    <Router>
      <Home path="/" />
      <AddUser path="/new" />
      <EditUser path="/articles/:id/edit" />
    </Router>
  );
}

export default App;
