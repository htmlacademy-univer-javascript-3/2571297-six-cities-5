export const convertDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleString('en', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};
