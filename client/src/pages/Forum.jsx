import { useEffect, useState } from "react";

const API_BASE_URL = "http://localhost:5000";

export default function Forum() {
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchThreads() {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE_URL}/posts`);
        if (!res.ok) throw new Error("Failed to fetch forum threads");
        const data = await res.json();
        setThreads(data || []);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching threads:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchThreads();
  }, []);

  if (loading) return <div className="page"><p>Loading...</p></div>;
  if (error) return <div className="page"><p style={{ color: "red" }}>Error: {error}</p></div>;

  return (
    <div className="page">
      <h2>Discussion Forum</h2>
      <p>Browse threads, share opinions, and interact with fans.</p>
      
      {threads.length === 0 ? (
        <div style={{ textAlign: "center", padding: "2rem", backgroundColor: "#f5f5f5", borderRadius: "8px" }}>
          <p style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>No discussion threads yet. Start a new one!</p>
          <button
            onClick={() => alert("Create thread feature coming soon!")}
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
            + Start Discussion
          </button>
        </div>
      ) : (
        <div style={{ display: "grid", gap: "1.5rem" }}>
          {threads.map(t => (
            <div
              key={t.post_id}
              style={{
                padding: "1.5rem",
                border: "1px solid #ddd",
                borderRadius: "8px",
                backgroundColor: "#f9f9f9",
                transition: "all 0.3s ease",
                cursor: "pointer"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <h3 style={{ margin: "0 0 0.5rem 0" }}>{t.post_title}</h3>
              <p style={{ margin: "0.5rem 0 1rem 0", color: "#666" }}>{t.post_body}</p>
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                <button
                  onClick={() => alert("Viewing thread...")}
                  style={{
                    padding: "0.5rem 1rem",
                    backgroundColor: "#646cff",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer"
                  }}
                >
                  💬 View Thread
                </button>
                <button
                  onClick={() => alert("Replied to thread!")}
                  style={{
                    padding: "0.5rem 1rem",
                    backgroundColor: "#4ecdc4",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer"
                  }}
                >
                  ✍️ Reply
                </button>
                <button
                  onClick={() => alert("Bookmarked!")}
                  style={{
                    padding: "0.5rem 1rem",
                    backgroundColor: "#ff6b6b",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer"
                  }}
                >
                  🔖 Bookmark
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
