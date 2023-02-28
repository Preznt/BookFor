export const chkReg = async (detail) => {
  const { title, authors, publisher, isbn } = detail;
  if (!title) return "REQ_TITLE";
  if (!authors) return "REQ_AUTHORS";
  if (!publisher) return "REQ_PUBLISHER";
  if (!isbn) {
    return "REQ_ISBN";
  } else if (isbn.length !== 13) {
    return "ISBN_LENGTH_NOT_MATCH";
  }
};
