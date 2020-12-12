import axios from "axios";
import config from "../config.json";

export async function loginUser(userName, password) {
  const { data: jwt } = await axios.post(config.backEndUrl + "/auth", {
    userName,
    password,
  });

  localStorage.setItem("x-auth-token", jwt);
  window.location = "/";
}
