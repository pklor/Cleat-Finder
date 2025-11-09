import { useEffect, useState } from "react";

const API_BASE_URL = "http://localhost:5000";

export default function Learn() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchQuizzes() {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE_URL}/quizzes`);
        if (!res.ok) throw new Error("Failed to fetch quizzes");
        const data = await res.json();
        setQuizzes(data || []);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching quizzes:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchQuizzes();
  }, []);

  if (loading) return <div className="page"><p>Loading...</p></div>;
  if (error) return <div className="page"><p style={{ color: "red" }}>Error: {error}</p></div>;

  return (
    <div className="page">
      <h2>Learn ⚽</h2>
      <p>Expand your football knowledge with our learning resources and articles.</p>
      
      {quizzes.length === 0 ? (
        <div style={{ textAlign: "center", padding: "2rem", backgroundColor: "#f5f5f5", borderRadius: "8px" }}>
          <p>No learning resources available yet.</p>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.5rem" }}>
          {quizzes.map(q => (
            <div
              key={q.quiz_id}
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
              <h3 style={{ margin: "0 0 0.5rem 0" }}>{q.quiz_title}</h3>
              {q.quiz_category && (
                <p style={{ margin: "0.5rem 0", color: "#666" }}>📚 {q.quiz_category}</p>
              )}
              <p style={{ margin: "0.5rem 0", color: "#999", fontSize: "0.9rem" }}>
                {q.quiz_content ? q.quiz_content.substring(0, 100) + "..." : "Learn more about this topic"}
              </p>
              <div style={{ marginTop: "1rem", display: "grid", gap: "0.5rem" }}>
                <button
                  onClick={() => alert("Reading article...")}
                  style={{
                    padding: "0.5rem 1rem",
                    backgroundColor: "#646cff",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer"
                  }}
                >
                  📖 Read Article
                </button>
                <button
                  onClick={() => alert("Bookmarked!")}
                  style={{
                    padding: "0.5rem 1rem",
                    backgroundColor: "#4ecdc4",
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
