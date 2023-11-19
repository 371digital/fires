const id = (data) => {
  const pattern = /^[0-9a-fA-F]{24}$/;
  return data.match(pattern) !== null;
};
export default id;
