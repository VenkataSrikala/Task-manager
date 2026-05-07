export const isOverdue = (dueDate) => {
  if (!dueDate) return false;
  return new Date(dueDate) < new Date();
};

export const formatDate = (date) => {
  return new Date(date).toISOString().split('T')[0];
};
