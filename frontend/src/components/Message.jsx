function Message({ role, content, sources }) {
  return (
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
  );
}

export default Message;