import UploadBox from "./components/UploadBox";
import ChatBox from "./components/ChatBox";
import "./App.css";

function App() {
  return (
    <div className="container">
      <h1>Intranet AI Agent</h1>

      <UploadBox />

      <ChatBox />
    </div>
  );
}

export default App;