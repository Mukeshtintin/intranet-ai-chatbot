import "../styles/Message.css";

function Message({ role, content, sources }) {
  return (
    <div className={`message-row ${role}`}>
      {role === "assistant" && (
        <div className="avatar">
          J
        </div>
      )}

      <div className={`message ${role}`}>
        <p>{content}</p>

        {/* {sources && sources.length > 0 && (
          <div className="sources">
            <strong>Sources:</strong>

            <ul>
              {sources.map((source, index) => (
                <li key={index}>{source}</li>
              ))}
            </ul>
          </div>
        )} */}
      </div>
    </div>
  );
}

export default Message;