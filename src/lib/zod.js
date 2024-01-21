const formatZodIssue = (issue) => {
  const { path, message } = issue;

  return `${message}`;
};

const zodError = (error) => {
  const { issues } = error;

  if (issues.length) {
    const currentIssue = issues[0];

    return formatZodIssue(currentIssue);
  }
};

export default zodError;
