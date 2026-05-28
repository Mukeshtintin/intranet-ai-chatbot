function getAgent(question) {
  const q = question.toLowerCase();

  const agents = {
    leave_policy: [
      "leave",
      "vacation",
      "holiday",
      "sick leave",
      "earned leave",
      "maternity",
      "paternity",
      "permission",
      "lop",
      "loss of pay",
      "absence",
    ],

    wfh_policy: [
      "work from home",
      "wfh",
      "remote",
      "home",
      "office",
      "hybrid",
      "attendance",
      "zoho",
    ],

    dresscode_policy: [
      "dress",
      "uniform",
      "formal",
      "casual",
      "clothes",
      "wear",
      "appearance",
    ],

    noticeperiod_policy: [
      "notice period",
      "resignation",
      "resign",
      "quit",
      "settlement",
      "full and final",
      "exit",
      "relieving",
    ],

    performance_policy: [
      "performance",
      "bonus",
      "pip",
      "rating",
      "review",
      "score",
      "improvement",
      "evaluation",
      "excellent",
      "breakthrough",
    ],
  };

  const scores = {};

  // initialize scores
  for (const agent in agents) {
    scores[agent] = 0;
  }

  // scoring
  for (const [agent, keywords] of Object.entries(agents)) {
    for (const keyword of keywords) {
      if (q.includes(keyword)) {
        scores[agent] += 1;
      }
    }
  }

  console.log("Agent Scores:", scores);

  // get best match
  let selectedAgent = "performance_policy";

  let highestScore = 0;

  for (const [agent, score] of Object.entries(scores)) {
    if (score > highestScore) {
      highestScore = score;
      selectedAgent = agent;
    }
  }

  console.log("Selected Agent:", selectedAgent);

  return selectedAgent;
}

module.exports = getAgent;