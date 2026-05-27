import { useState } from "react";
import API from "../services/api";
import Message from "./Message";

function ChatBox() {
  const [question, setQuestion] = useState("");

  const [messages, setMessages] = useState([]);

  const [loading, setLoading] = useState(false);

  const askQuestion = async () => {
    if (!question) return;

    const userMessage = {
      role: "user",
      content: question,
    };

    setMessages((prev) => [...prev, userMessage]);

    try {
      setLoading(true);

      const response = await API.post("/chat", {
        question,
      });

      const aiMessage = {
        role: "assistant",
        content: response.data.answer,
        sources: response.data.sources,
      };

      setMessages((prev) => [...prev, aiMessage]);

      setQuestion("");
    } catch (error) {
      console.error(error);

      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-box">
      <h2>Company AI Assistant</h2>

      {/* <div className="suggestions">
        <button onClick={() => setQuestion("India office holidays")}>
          India office holidays
        </button>

        <button onClick={() => setQuestion("Who handles payroll?")}>
          Who handles payroll?
        </button>

        <button onClick={() => setQuestion("Leave policy")}>
          Leave policy
        </button>
      </div> */}

      <div className="messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message-wrapper ${msg.role === "user" ? "user-wrapper" : "assistant-wrapper"
              }`}
          >
            <Message
              role={msg.role}
              content={msg.content}
              sources={msg.sources}
            />
          </div>
        ))}
      </div>

      <div className="input-area">
        <input
          type="text"
          placeholder="Ask something..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />

        <button onClick={askQuestion} type="submit">
          {loading ? "Thinking..." : "Send"}
        </button>
      </div>
    </div>
  );
}

export default ChatBox;