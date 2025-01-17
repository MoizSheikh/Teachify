export const getUserData = () => {
  const data = localStorage.getItem("userData");
  const _data = JSON.parse(data);
  return _data;
};
export const getUserLoggedIn = () => {
  const data = localStorage.getItem("isLoggedIn") === "true";
  return data ?? false;
};
