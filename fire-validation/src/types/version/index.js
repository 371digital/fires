const version = (data) => {
  const regex = /^(\d+)\.(\d+)\.(\d+)$/;
  return regex.test(data);
};
export default version;
