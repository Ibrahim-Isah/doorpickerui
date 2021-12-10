import { auth, BASE_URL } from "../../utils/constant";

export const getPosts = async (pg = 0, ct = 10) => {
  const response = await fetch(`${BASE_URL}post/all/${pg}/${ct}`, auth);
  if (!response.ok) {
    return { error: { code: response.status } };
  }
  const data = await response.json();
  return { data };
};
