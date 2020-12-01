import axios from "axios";

export function getLeaderboardData() {
  return axios.get("http://localhost:5000/leaderboard");
}

export function getLeaderboard() {
  return axios.get("http://localhost:5000/leaderboard/fullLeaderboard");
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
