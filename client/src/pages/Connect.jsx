import { useEffect, useState } from "react";

const API_BASE_URL = "http://localhost:5000";

export default function Connect() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ post_title: "", post_body: "" });

  useEffect(() => {
    async function fetchPosts() {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE_URL}/posts`);
        if (!res.ok) throw new Error("Failed to fetch posts");
        const data = await res.json();
        setPosts(data || []);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching posts:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!formData.post_title.trim() || !formData.post_body.trim()) {
      alert("Please fill in all fields");
      return;
    }
    
    try {
      const res = await fetch(`${API_BASE_URL}/posts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      
      if (!res.ok) throw new Error("Failed to create post");
      const newPost = await res.json();
      setPosts([newPost, ...posts]);
      setFormData({ post_title: "", post_body: "" });
      setShowForm(false);
      alert("Post created successfully!");
    } catch (err) {
      alert("Error creating post: " + err.message);
    }
  };

  if (loading) return <div className="page"><p>Loading...</p></div>;
  if (error) return <div className="page"><p style={{ color: "red" }}>Error: {error}</p></div>;

  return (
    <div className="page">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <h2 style={{ margin: 0 }}>Community Posts</h2>
        <button
          onClick={() => setShowForm(!showForm)}
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
          {showForm ? "Cancel" : "+ New Post"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleCreatePost} style={{ marginBottom: "2rem", padding: "1.5rem", backgroundColor: "#f5f5f5", borderRadius: "8px" }}>
          <input
            type="text"
            placeholder="Post Title"
            value={formData.post_title}
            onChange={(e) => setFormData({ ...formData, post_title: e.target.value })}
            style={{
              width: "100%",
              padding: "0.75rem",
              marginBottom: "1rem",
              borderRadius: "4px",
              border: "1px solid #ccc",
              boxSizing: "border-box",
              fontSize: "1rem"
            }}
          />
          <textarea
            placeholder="Post Content"
            value={formData.post_body}
            onChange={(e) => setFormData({ ...formData, post_body: e.target.value })}
            style={{
              width: "100%",
              padding: "0.75rem",
              marginBottom: "1rem",
              borderRadius: "4px",
              border: "1px solid #ccc",
              boxSizing: "border-box",
              fontSize: "1rem",
              minHeight: "120px",
              fontFamily: "inherit"
            }}
          />
          <button
            type="submit"
            style={{
              padding: "0.75rem 1.5rem",
              backgroundColor: "#4ecdc4",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            Post
          </button>
        </form>
      )}

      {posts.length === 0 ? (
        <p>No posts yet. Be the first to share!</p>
      ) : (
        <div style={{ display: "grid", gap: "1.5rem" }}>
          {posts.map(p => (
            <div
              key={p.post_id}
              style={{
                padding: "1.5rem",
                border: "1px solid #ddd",
                borderRadius: "8px",
                backgroundColor: "#f9f9f9",
                transition: "all 0.3s ease"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <h3 style={{ margin: "0 0 0.5rem 0" }}>{p.post_title}</h3>
              <p style={{ margin: "0.5rem 0", color: "#666" }}>{p.post_body}</p>
              <div style={{ marginTop: "1rem", display: "flex", gap: "0.5rem" }}>
                <button
                  onClick={() => alert("Liked!")}
                  style={{
                    padding: "0.5rem 1rem",
                    backgroundColor: "#ff6b6b",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer"
                  }}
                >
                  👍 Like
                </button>
                <button
                  onClick={() => alert("Reply feature coming soon!")}
                  style={{
                    padding: "0.5rem 1rem",
                    backgroundColor: "#4ecdc4",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer"
                  }}
                >
                  💬 Reply
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
