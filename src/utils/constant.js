let BASE_URL = "https://doorpicker.herokuapp.com/api/v1/";
// let BASE_URL = "/api/v1/";
// if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
//  BASE_URL = "http://localhost:5071/api/v1/";
// } else {
//  BASE_URL = "https://doorpicker.herokuapp.com/api/v1/";
// }
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
export { BASE_URL };
