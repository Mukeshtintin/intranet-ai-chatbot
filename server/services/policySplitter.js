function splitPolicies(text) {
  const policies = {};

  const lowerText = text.toLowerCase();

  const sections = [
    {
      name: "performance_policy",
      start: "performance policy",
    },
    {
      name: "wfh_policy",
      start: "work from office policy",
    },
    {
      name: "leave_policy",
      start: "leave policy",
    },
    {
      name: "dresscode_policy",
      start: "dress code",
    },
    {
      name: "noticeperiod_policy",
      start: "notice period",
    },
  ];

  for (let i = 0; i < sections.length; i++) {
    const current = sections[i];

    const next = sections[i + 1];

    const startIndex = lowerText.indexOf(
      current.start
    );

    if (startIndex === -1) continue;

    let endIndex = text.length;

    if (next) {
      const nextIndex = lowerText.indexOf(
        next.start
      );

      if (nextIndex !== -1) {
        endIndex = nextIndex;
      }
    }

    policies[current.name] = text.slice(
      startIndex,
      endIndex
    );
  }

  return policies;
}

module.exports = splitPolicies;