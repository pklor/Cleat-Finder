import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

// Import routes
import playersRoutes from "./routes/players.js";
import teamsRoutes from "./routes/teams.js";
import postsRoutes from "./routes/posts.js";
import profilesRoutes from "./routes/profiles.js";
import quizzesRoutes from "./routes/quizzes.js";
import favoritesRoutes from "./routes/favorites.js";

dotenv.config();

const app = express();
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://127.0.0.1:5173', 'http://127.0.0.1:5174'],
  credentials: true
}));
app.use(express.json());

//  Connect to Supabase
export const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SECRET_KEY);

//  Root route
app.get("/", (req, res) => {
  res.send("Cleat Finder API is running.");
});

//  Use routes
app.use("/players", playersRoutes);
app.use("/teams", teamsRoutes);
app.use("/posts", postsRoutes);
app.use("/profiles", profilesRoutes);
app.use("/quizzes", quizzesRoutes);
app.use("/favorites", favoritesRoutes);

//  Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
