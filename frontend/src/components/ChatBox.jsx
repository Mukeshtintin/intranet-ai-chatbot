import { useState, useEffect, useRef } from "react";
import "../styles/ChatBox.css";
import API from "../services/api";
import Message from "./Message";

function ChatBox() {
  const [question, setQuestion] = useState("");

  const [messages, setMessages] = useState([]);

  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);

  // ONLY NEW STATE FOR TOGGLE
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
  messagesEndRef.current?.scrollIntoView({
    behavior: "smooth",
  });
}, [messages, loading]);

  const askQuestion = async () => {
    // YOUR ORIGINAL FUNCTION
    if (!question) return;

    const userMessage = {
      role: "user",
      content: question,
    };

    setMessages((prev) => [...prev, userMessage]);

    setQuestion("");
    try {
      setLoading(true);
console.log("Question Asked:", question);
      // YOUR ORIGINAL API
      const response = await API.post("/chat", {
        question,
      });

      // YOUR ORIGINAL MESSAGE
      const aiMessage = {
        role: "assistant",
        content: response.data.answer,
        sources: response.data.sources,
      };

      setMessages((prev) => [...prev, aiMessage]);

    } catch (error) {
      console.error(error);

      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* TOGGLE BUTTON */}
      <div
        className={`chat-toggle ${isOpen ? "active" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="pulse"></div>

        <div className="bot-face">
          <div className="eye left"></div>

          <div className="eye right"></div>

          <div className="mouth"></div>
        </div>
      </div>

      {/* CHAT WINDOW */}
      <div className={`chat-wrapper ${isOpen ? "open" : ""}`}>

        <div className="chat-box">

          {/* HEADER */}
          <div className="chat-header">

            <div className="chat-header-left">

              <div className="chat-logo">
                J
              </div>

              <div>
                <h2>Company AI Assistant</h2>

                <p>Intranet AI Assistant</p>
              </div>

            </div>

            {/* CLOSE BUTTON */}
            <button
              className="close-btn"
              onClick={() => setIsOpen(false)}
            >
              ×
            </button>

          </div>

          {/* SUGGESTIONS */}
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

          {/* MESSAGES */}
          <div className="messages">

            {messages.length === 0 && (
              <div className="welcome-message">

                <div className="welcome-icon">
                  J
                </div>

                <h3>Welcome to Intranet AI Agent</h3>

                <p>
                  Ask about company policies, projects,
                  announcements, employees, or uploaded documents.
                </p>

              </div>
            )}

            {messages.map((msg, index) => (
              <div
                key={index}
                className={`message-wrapper ${
                  msg.role === "user"
                    ? "user-wrapper"
                    : "assistant-wrapper"
                }`}
              >
                <Message
                  role={msg.role}
                  content={msg.content}
                  sources={msg.sources}
                />
              </div>
            ))}

            {/* LOADING */}
            {loading && (
              <div className="typing-container">

                <div className="avatar">
                  J
                </div>

                <div className="typing-box">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>

              </div>
            )}
            <div ref={messagesEndRef}></div>
          </div>

          {/* INPUT */}
          <div className="input-area">

            <div className="chat-input-box">

              <input
                type="text"
                placeholder="Ask something..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    askQuestion();
                  }
                }}
              />

              <button onClick={askQuestion} type="submit">
                {loading ? "..." : "➜"}
              </button>

            </div>

          </div>

        </div>

      </div>
    </>
  );
}

export default ChatBox;