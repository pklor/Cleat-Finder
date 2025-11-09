import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className="navbar">
      <h1>⚽ Cleat Finder</h1>
      <ul>
        <li><Link to="/">Explore</Link></li>
        <li><Link to="/learn">Learn</Link></li>
        <li><Link to="/quizzes">Quizzes</Link></li>
        <li><Link to="/connect">Connect</Link></li>
        <li><Link to="/forum">Forum</Link></li>
        <li><Link to="/track">Track</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
    </nav>
  );
}
