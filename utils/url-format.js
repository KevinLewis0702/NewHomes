export const formatStringToURL = (term) => {
  return term.trim().replaceAll(" ", "-").toLowerCase();
};
