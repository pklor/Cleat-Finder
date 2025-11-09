import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Explore from "./pages/Explore";
import Learn from "./pages/Learn";
import Connect from "./pages/Connect";
import Track from "./pages/Track";
import Login from "./pages/Login";
import PlayerProfile from "./pages/PlayerProfile";
import Forum from "./pages/Forum";
import Quizzes from "./pages/Quizzes";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Explore />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/quizzes" element={<Quizzes />} />
        <Route path="/connect" element={<Connect />} />
        <Route path="/forum" element={<Forum />} />
        <Route path="/track" element={<Track />} />
        <Route path="/login" element={<Login />} />
        <Route path="/player/:id" element={<PlayerProfile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
