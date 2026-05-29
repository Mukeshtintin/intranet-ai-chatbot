# intranet-ai-chatbot
Human vs AI conversation



                User Question
                      ↓
              Router / Classifier
                      ↓
      ┌───────────────┼───────────────┐
      ↓               ↓               ↓
 HR Agent      WFH Agent      Leave Agent
      ↓               ↓               ↓
  Chroma DB     Chroma DB      Chroma DB
      ↓               ↓               ↓
              Relevant Context
                      ↓
                    LLM
                      ↓
                 Final Answer


| Purpose       | Model            |
| ------------- | ---------------- |
| Embedding     | nomic-embed-text |
| Chat          | tinyllama        |
| Vector DB     | ChromaDB         |
| Agent Routing | keyword score    |
