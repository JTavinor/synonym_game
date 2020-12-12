import axios from "axios";
import config from "../config.json";
import { loginUser } from "./authServices";

const userUrl = config.backEndUrl + "/users";

export function getWrongWords(userId) {
  return axios.get(userUrl + `/wrongWords/${userId}`);
}

export async function registerUser(userName, password) {
  await axios.post(userUrl, {
    userName,
    password,
  });

  loginUser(userName, password);
}

export function addWrongWordToDb(currentWord, synonyms, userId) {
  const wrongWord = {};
  wrongWord.word = currentWord;
  const filtered = synonyms.filter((synonym) => synonym.indexOf(" ") < 0);
  wrongWord.synonyms = filtered.slice(0, 3);
  console.log(wrongWord.synonyms);

  axios.put(userUrl, {
    wrongWord,
    userId,
  });
}

export function deleteWrongWord(wrongWord, userId) {
  axios.put(userUrl + "/deleteWord", {
    wrongWord,
    userId,
  });
}
