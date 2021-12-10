import { auth, BASE_URL, PostSettings } from "../../utils/constant";

export const userSignup = async (obj) => {
  const response = await fetch(`${BASE_URL}user/signup`, PostSettings(obj));
  if (!response.ok) {
    return { error: { code: response.status } };
  }
  const data = await response.json();
  return { data };
};
// export const isSignedUp = async (obj) => {
//   const response = await fetch(
//     `${BASE_URL}dev/horace/findlead`,
//     PostSettings(obj)
//   );
//   if (!response.ok) {
//     return { error: { code: response.status } };
//   }
//   const data = await response.json();
//   return { data };
// };
export const getUsers = async () => {
  const response = await fetch(`${BASE_URL}user/users`, auth);
  if (!response.ok) {
    return { error: { code: response.status } };
  }
  const data = await response.json();
  return { data };
};
