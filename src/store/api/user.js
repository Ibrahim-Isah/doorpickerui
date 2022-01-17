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
export const userToken = async (obj) => {
  const response = await fetch(`${BASE_URL}user/dotoken`, PostSettings(obj));
  if (!response.ok) {
    return { error: { code: response.status } };
  }
  const data = await response;
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
<<<<<<< HEAD
export const userIsTaken = async (obj) => {
	const response = await fetch(`${BASE_URL}user/istaken/${obj}`, auth);
	if (!response.ok) {
		return { error: { code: response.status } };
	}
	const data = await response.json();
	return data;
=======
export const userIsTaken = async (userInfo) => {
  const response = await fetch(`${BASE_URL}user/istaken/${userInfo}`, auth);
  if (!response.ok) {
    return { error: { code: response.status } };
  }
  const data = await response.json();
  return data;
};
export const getVar = async () => {
  const response = await fetch(`${BASE_URL}user/getvars`, auth);
  if (!response.ok) {
    return { error: { code: response.status } };
  }
  const data = await response.json();
  return data;
>>>>>>> 9f9a0d57e589c2b3d9912dfa95ab0972c2a8752c
};
export const contactUs = async (obj) => {
	const response = await fetch(`${BASE_URL}add/contact`, PostSettings(obj));
	if (!response.ok) {
		return { error: { code: response.status } };
	}
	const data = await response;
	return { data };
};
export const getAllUsersContactEmail = async () => {
	const response = await fetch(`${BASE_URL}user/users`, auth);
	if (!response.ok) {
		return { error: { code: response.status } };
	}
	const data = await response.json();
	return { data };
};
export const getOneUserContactEmail = async (userEmail) => {
	const response = await fetch(`${BASE_URL}user/users/${userEmail}`, auth);
	if (!response.ok) {
		return { error: { code: response.status } };
	}
	const data = await response.json();
	return { data };
};
