import UploadBox from "./components/UploadBox";
import ChatBox from "./components/ChatBox";
import "./App.css";

function App() {
  return (
    <div className="app">
      {/* Background Glow */}
      <div className="glow glow1"></div>
      <div className="glow glow2"></div>

      <div className="container">
        <div className="hero-section">
          <h1>Intranet AI Agent</h1>

          <p>
            AI-powered assistant for company documents,
            employee support, announcements, and internal knowledge.
          </p>
        </div>

        <div className="main-grid">
          <UploadBox />

          <ChatBox />
        </div>
      </div>
    </div>
  );
}

export default App;