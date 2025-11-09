import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = "http://localhost:5000";

export default function Explore() {
  const [players, setPlayers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState("players");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        console.log("Fetching from:", API_BASE_URL);
        
        const [playersRes, teamsRes] = await Promise.all([
          fetch(`${API_BASE_URL}/players`),
          fetch(`${API_BASE_URL}/teams`)
        ]);

        console.log("Players response status:", playersRes.status);
        console.log("Teams response status:", teamsRes.status);

        if (!playersRes.ok || !teamsRes.ok) {
          throw new Error(`Failed to fetch data - Players: ${playersRes.status}, Teams: ${teamsRes.status}`);
        }

        const playerData = await playersRes.json();
        const teamData = await teamsRes.json();

        console.log("Players data:", playerData);
        console.log("Teams data:", teamData);

        setPlayers(playerData || []);
        setTeams(teamData || []);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <div className="page"><p>Loading...</p></div>;
  if (error) return <div className="page"><p style={{ color: "red" }}>Error: {error}</p></div>;

  const filteredPlayers = players.filter(p =>
    `${p.player_first_name} ${p.player_last_name}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredTeams = teams.filter(t =>
    t.team_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="page">
      <h2>Explore Players & Teams</h2>

      <div style={{ marginBottom: "2rem" }}>
        <input
          type="text"
          placeholder="Search players or teams..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: "100%",
            padding: "0.75rem",
            fontSize: "1rem",
            borderRadius: "4px",
            border: "1px solid #ccc",
            boxSizing: "border-box"
          }}
        />
      </div>

      <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem" }}>
        <button
          onClick={() => setSelectedTab("players")}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: selectedTab === "players" ? "#646cff" : "#f0f0f0",
            color: selectedTab === "players" ? "white" : "black",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          Players ({filteredPlayers.length})
        </button>
        <button
          onClick={() => setSelectedTab("teams")}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: selectedTab === "teams" ? "#646cff" : "#f0f0f0",
            color: selectedTab === "teams" ? "white" : "black",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          Teams ({filteredTeams.length})
        </button>
      </div>

      {selectedTab === "players" && (
        <section>
          {filteredPlayers.length === 0 ? (
            <p>No players found.</p>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "1rem" }}>
              {filteredPlayers.map(p => (
                <div
                  key={p.player_id}
                  onClick={() => navigate(`/player/${p.player_id}`)}
                  style={{
                    padding: "1.5rem",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    backgroundColor: "#f9f9f9"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
                    e.currentTarget.style.transform = "translateY(-4px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <h3 style={{ margin: "0 0 0.5rem 0" }}>
                    {p.player_first_name} {p.player_last_name}
                  </h3>
                  {p.player_birthday && <p style={{ margin: "0.5rem 0", color: "#666" }}>Born: {p.player_birthday}</p>}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      alert("Added to favorites!");
                    }}
                    style={{
                      marginTop: "0.5rem",
                      padding: "0.5rem 1rem",
                      backgroundColor: "#ff6b6b",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer"
                    }}
                  >
                    ❤️ Add to Favorites
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {selectedTab === "teams" && (
        <section>
          {filteredTeams.length === 0 ? (
            <p>No teams found.</p>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "1rem" }}>
              {filteredTeams.map(t => (
                <div
                  key={t.team_id}
                  style={{
                    padding: "1.5rem",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    backgroundColor: "#f9f9f9"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
                    e.currentTarget.style.transform = "translateY(-4px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <h3 style={{ margin: "0 0 0.5rem 0" }}>{t.team_name}</h3>
                  {t.team_founded && <p style={{ margin: "0.5rem 0", color: "#666" }}>Founded: {t.team_founded}</p>}
                  <button
                    onClick={() => alert("Added to favorites!")}
                    style={{
                      marginTop: "0.5rem",
                      padding: "0.5rem 1rem",
                      backgroundColor: "#4ecdc4",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer"
                    }}
                  >
                    ⭐ Follow Team
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  );
}
