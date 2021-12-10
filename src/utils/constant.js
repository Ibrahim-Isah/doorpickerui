export const BASE_URL = "https://doorpicker.herokuapp.com/api/v1/";
const authKey = process.env.REACT_APP_AUTH;
export const PostSettings = (obj) => {
  return {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Basic ${authKey}`,
    },
    body: JSON.stringify(obj),
  };
};
export const auth = {
  headers: { Authorization: `Basic ${authKey}` },
};
