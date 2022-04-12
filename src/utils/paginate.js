export default ({ page, pageSize = 50 }) => {
  const offset = +(page - 1) * parseInt(pageSize);
  const limit = parseInt(pageSize);

  return {
    offset,
    limit,
  };
};
