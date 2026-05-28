function splitPolicies(text) {
  const sections = {};

  const policies = [
    {
      key: "performance_policy",
      title: "Performance Policy",
    },
    {
      key: "wfh_policy",
      title: "Work From Office Policy",
    },
    {
      key: "leave_policy",
      title: "Leave Policy",
    },
    {
      key: "dresscode_policy",
      title: "Dress Code",
    },
    {
      key: "noticeperiod_policy",
      title: "Notice Period",
    },
  ];

  for (let i = 0; i < policies.length; i++) {
    const current = policies[i];

    const next = policies[i + 1];

    const startIndex = text.indexOf(current.title);

    const endIndex = next
      ? text.indexOf(next.title)
      : text.length;

    if (startIndex !== -1) {
      sections[current.key] = text
        .slice(startIndex, endIndex)
        .trim();
    }
  }

  return sections;
}

module.exports = splitPolicies;