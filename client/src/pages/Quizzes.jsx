import { useEffect, useState } from "react";

const API_BASE_URL = "http://localhost:5000";

export default function Quizzes() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [score, setScore] = useState(null);

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

  const handleStartQuiz = (quiz) => {
    setSelectedQuiz(quiz);
    setScore(null);
  };

  const handleSubmitQuiz = () => {
    const randomScore = Math.floor(Math.random() * 100) + 1;
    setScore(randomScore);
  };

  if (loading) return <div className="page"><p>Loading...</p></div>;
  if (error) return <div className="page"><p style={{ color: "red" }}>Error: {error}</p></div>;

  if (selectedQuiz && score !== null) {
    return (
      <div className="page">
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <h2>Quiz Complete!</h2>
          <div style={{
            fontSize: "3rem",
            fontWeight: "bold",
            color: score >= 70 ? "#4ecdc4" : "#ff6b6b",
            margin: "1rem 0"
          }}>
            {score}%
          </div>
          <p style={{ fontSize: "1.2rem", marginBottom: "2rem" }}>
            {score >= 70 ? "Great job! 🎉" : "Keep practicing! 💪"}
          </p>
          <button
            onClick={() => {
              setSelectedQuiz(null);
              setScore(null);
            }}
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
            Back to Quizzes
          </button>
        </div>
      </div>
    );
  }

  if (selectedQuiz) {
    return (
      <div className="page">
        <button
          onClick={() => setSelectedQuiz(null)}
          style={{
            marginBottom: "1rem",
            padding: "0.5rem 1rem",
            backgroundColor: "#f0f0f0",
            border: "1px solid #ccc",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          ← Back
        </button>
        <h2>{selectedQuiz.quiz_title}</h2>
        {selectedQuiz.quiz_category && <p style={{ color: "#666" }}>Category: {selectedQuiz.quiz_category}</p>}
        
        <div style={{ margin: "2rem 0", padding: "1.5rem", backgroundColor: "#f5f5f5", borderRadius: "8px" }}>
          <p style={{ fontSize: "1.1rem", marginBottom: "1.5rem" }}>
            {selectedQuiz.quiz_content || "Test your knowledge with this quiz!"}
          </p>
          
          <div style={{ display: "grid", gap: "0.75rem", marginBottom: "2rem" }}>
            {["Option A", "Option B", "Option C", "Option D"].map((option, idx) => (
              <label key={idx} style={{
                padding: "0.75rem",
                border: "1px solid #ddd",
                borderRadius: "4px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                transition: "all 0.3s ease"
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#f0f0f0"}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "white"}
              >
                <input type="radio" name="answer" style={{ marginRight: "0.75rem", cursor: "pointer" }} />
                {option}
              </label>
            ))}
          </div>
          
          <button
            onClick={handleSubmitQuiz}
            style={{
              padding: "0.75rem 1.5rem",
              backgroundColor: "#4ecdc4",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "1rem"
            }}
          >
            Submit Quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <h2>Quizzes</h2>
      <p>Take fun quizzes to test your football knowledge!</p>
      {quizzes.length === 0 ? (
        <p>No quizzes available yet.</p>
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
              {q.quiz_category && <p style={{ margin: "0.5rem 0", color: "#666" }}>📚 {q.quiz_category}</p>}
              <button
                onClick={() => handleStartQuiz(q)}
                style={{
                  marginTop: "1rem",
                  padding: "0.75rem 1.5rem",
                  backgroundColor: "#646cff",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  width: "100%"
                }}
              >
                Start Quiz →
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
