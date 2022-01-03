import { auth, BASE_URL, PostSettings } from "../../utils/constant";

export const userSignup = async (obj) => {
  const response = await fetch(`${BASE_URL}user/signup`, PostSettings(obj));
  if (!response.ok) {
    return { error: { code: response.status } };
  }
  const data = await response.json();
  return { data };
};
export const userLogin = async (obj) => {
  const response = await fetch(`${BASE_URL}user/login`, PostSettings(obj));
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
export const doConfirmation = async (tk, phone) => {
  const response = await fetch(
    `${BASE_URL}user/sms/confirm/${tk}/${phone}`,
    auth
  );
  if (!response.ok) {
    return { error: { code: response.status } };
  }
  const data = await response.json();
  return { data };
};
export const userChangePwd = async (obj) => {
  const response = await fetch(`${BASE_URL}user/password`, PostSettings(obj));
  if (!response.ok) {
    return { error: { code: response.status } };
  }
  const data = await response.json();
  return { data };
};
export const userUpdate = async (obj) => {
  const response = await fetch(`${BASE_URL}user/update`, PostSettings(obj));
  if (!response.ok) {
    return { error: { code: response.status } };
  }
  const data = await response.json();
  return { data };
};
export const doPhoto = async (obj) => {
  const response = await fetch(`${BASE_URL}user/photo`, PostSettings(obj));
  if (!response.ok) {
    return { error: { code: response.status } };
  }
  const data = await response.json();
  return { data };
};
