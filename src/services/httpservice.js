import axios from "axios";

export function getLeaderboardData() {
  return axios.get("http://localhost:5000/leaderboard");
}

export function getLeaderboard() {
  return axios.get("http://localhost:5000/leaderboard/fullLeaderboard");
}

export function getUserLeaderboard(userId) {
  return axios.get(`http://localhost:5000/leaderboard/${userId}`);
}

export function getWordData(newWord) {
  return axios.get(`https://api.datamuse.com/words?ml=${newWord}`);
}

export function postAnonScore(name, score) {
  axios.post("http://localhost:5000/leaderboard", {
    name: name || "unknown",
    score,
  });
}

export function postUserScore(userId, score) {
  axios.post("http://localhost:5000/leaderboard", {
    userId,
    score,
  });
}

export async function loginUser(userName, password) {
  const { data: jwt } = await axios.post("http://localhost:5000/auth", {
    userName,
    password,
  });

  localStorage.setItem("x-auth-token", jwt);
  window.location = "/";
}

export async function registerUser(userName, password) {
  await axios.post("http://localhost:5000/users/", {
    userName,
    password,
  });

  loginUser(userName, password);
}

export function addWrongWord(wrongWord, userId) {
  axios.put("http://localhost:5000/users/", {
    wrongWord,
    userId,
  });
}

export function deleteWrongWord(wrongWord, userId) {
  axios.put("http://localhost:5000/users/deleteWord", {
    wrongWord,
    userId,
  });
}

export function getWrongWords(userId) {
  return axios.get(`http://localhost:5000/users/wrongWords/${userId}`);
}

export function deleteScore(id) {
  axios.delete(`http://localhost:5000/leaderboard/${id}`);
}
