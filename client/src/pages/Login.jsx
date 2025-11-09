import { useState } from "react";
import { supabase } from "../utils/supabaseClient";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setMessage(error ? error.message : "Logged in successfully!");
  }

  async function handleSignup(e) {
    e.preventDefault();
    const { error } = await supabase.auth.signUp({ email, password });
    setMessage(error ? error.message : "Check your email for verification!");
  }

  return (
    <div className="page">
      <div style={{ maxWidth: "400px", margin: "0 auto" }}>
        <h2 style={{ textAlign: "center" }}>Login / Sign Up</h2>
        
        <form style={{ display: "grid", gap: "1rem" }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{
              padding: "0.75rem",
              borderRadius: "4px",
              border: "1px solid #ccc",
              fontSize: "1rem"
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{
              padding: "0.75rem",
              borderRadius: "4px",
              border: "1px solid #ccc",
              fontSize: "1rem"
            }}
          />
          
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <button
              onClick={handleLogin}
              style={{
                padding: "0.75rem",
                backgroundColor: "#646cff",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "1rem"
              }}
            >
              Login
            </button>
            <button
              onClick={handleSignup}
              style={{
                padding: "0.75rem",
                backgroundColor: "#4ecdc4",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "1rem"
              }}
            >
              Sign Up
            </button>
          </div>
        </form>
        
        {message && (
          <div style={{
            marginTop: "1rem",
            padding: "1rem",
            borderRadius: "4px",
            backgroundColor: message.includes("Error") || message.includes("error") ? "#ffe0e0" : "#e0f7f4",
            color: message.includes("Error") || message.includes("error") ? "#c00" : "#00a",
            textAlign: "center"
          }}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
