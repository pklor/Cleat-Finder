import { useEffect, useState } from "react";

const API_BASE_URL = "http://localhost:5000";

export default function Track() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadFavorites() {
      try {
        setLoading(true);
        // For now, fetch from players endpoint as a demo
        // In production, this would use user_id from authentication
        const res = await fetch(`${API_BASE_URL}/players`);
        if (!res.ok) throw new Error("Failed to fetch favorites");
        const data = await res.json();
        setFavorites(data || []);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching favorites:", err);
      } finally {
        setLoading(false);
      }
    }
    loadFavorites();
  }, []);

  if (loading) return <div className="page"><p>Loading...</p></div>;
  if (error) return <div className="page"><p style={{ color: "red" }}>Error: {error}</p></div>;

  return (
    <div className="page">
      <h2>Tracked Players</h2>
      <p>Keep up with your favorite players and get updates on their transfers and achievements.</p>
      
      {favorites.length === 0 ? (
        <div style={{ textAlign: "center", padding: "2rem", backgroundColor: "#f5f5f5", borderRadius: "8px" }}>
          <p style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>No tracked players yet. Add some favorites!</p>
          <button
            onClick={() => alert("Go to Explore to add favorites")}
            style={{
              padding: "0.75rem 1.5rem",
              backgroundColor: "#646cff",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            Explore Players
          </button>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" }}>
          {favorites.map(f => (
            <div
              key={f.player_id}
              style={{
                padding: "1.5rem",
                border: "1px solid #ddd",
                borderRadius: "8px",
                backgroundColor: "#f9f9f9",
                transition: "all 0.3s ease"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
                e.currentTarget.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <h3 style={{ margin: "0 0 0.5rem 0" }}>
                {f.player_first_name} {f.player_last_name}
              </h3>
              <p style={{ margin: "0.5rem 0", color: "#666" }}>⭐ Tracked</p>
              
              <div style={{ marginTop: "1rem", display: "grid", gap: "0.5rem" }}>
                <button
                  onClick={() => alert("Viewing player profile...")}
                  style={{
                    padding: "0.5rem 1rem",
                    backgroundColor: "#646cff",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer"
                  }}
                >
                  👤 View Profile
                </button>
                <button
                  onClick={() => alert("Notifications enabled!")}
                  style={{
                    padding: "0.5rem 1rem",
                    backgroundColor: "#4ecdc4",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer"
                  }}
                >
                  🔔 Enable Notifications
                </button>
                <button
                  onClick={() => alert("Removed from tracked")}
                  style={{
                    padding: "0.5rem 1rem",
                    backgroundColor: "#ff6b6b",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer"
                  }}
                >
                  ✕ Untrack
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
