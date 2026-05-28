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


Agent Calling - Scoring-based routing