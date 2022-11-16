import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import CreateHabit from "./pages/CreateHabit";
import HabitDetails from "./pages/HabitDetails";

function App() {
  document.addEventListener("touchstart", function () {}, true);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/create-habit" element={<CreateHabit />} />
        <Route path="/habit-details" element={<HabitDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
