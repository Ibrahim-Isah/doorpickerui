import { auth, BASE_URL, PostSettings } from "../../utils/constant";

export const getPosts = async (pg = 0, ct = 10) => {
  const response = await fetch(`${BASE_URL}post/all/${pg}/${ct}`, auth);
  if (!response.ok) {
    return { error: { code: response.status } };
  }
  const data = await response.json();
  return { data };
};
export const getLive = async (pg = 0, ct = 10) => {
  const response = await fetch(`${BASE_URL}post/live/${pg}/${ct}`, auth);
  if (!response.ok) {
    return { error: { code: response.status } };
  }
  const data = await response.json();
  return { data };
};
export const postMeta = async (pid) => {
  const response = await fetch(`${BASE_URL}post/meta/${pid}`, auth);
  if (!response.ok) {
    return { error: { code: response.status } };
  }
  const data = await response.json();
  return { data };
};
export const addMeta = async (obj) => {
  const response = await fetch(`${BASE_URL}post/meta/`, PostSettings(obj));
  if (!response.ok) {
    return { error: { code: response.status } };
  }
  const data = await response.json();
  return { data };
};
export const addPicket = async (obj) => {
  const response = await fetch(`${BASE_URL}post/add`, PostSettings(obj));
  if (!response.ok) {
    return { error: { code: response.status } };
  }
  const data = await response.json();
  return { data };
};
export const addLocation = async (obj) => {
  const response = await fetch(
    `${BASE_URL}post/add/location`,
    PostSettings(obj)
  );
  if (!response.ok) {
    return { error: { code: response.status } };
  }
  const data = await response.json();
  return { data };
};
export const addPrice = async (obj) => {
  const response = await fetch(`${BASE_URL}post/add/price`, PostSettings(obj));
  if (!response.ok) {
    return { error: { code: response.status } };
  }
  const data = await response.json();
  return { data };
};
export const userDrafts = async (usr) => {
  const response = await fetch(`${BASE_URL}post/posts/drafts/${usr}`, auth);
  if (!response.ok) {
    return { error: { code: response.status } };
  }
  const data = await response.json();
  return { data };
};
export const userPosts = async (usr) => {
  const response = await fetch(`${BASE_URL}post/posts/${usr}`, auth);
  if (!response.ok) {
    return { error: { code: response.status } };
  }
  const data = await response.json();
  return { data };
};
export const addImage = async (obj) => {
  const response = await fetch(`${BASE_URL}post/add/image`, PostSettings(obj));
  if (!response.ok) {
    return { error: { code: response.status } };
  }
  const data = await response.json();
  return { data };
};
export const findLoc = async () => {
  const response = await fetch(
    `https://extreme-ip-lookup.com/json/?key=${process.env.REACT_APP_GEO}`
  );
  if (!response.ok) {
    return { error: { code: response.status } };
  }
  const data = await response.json();
  return { data };
};
