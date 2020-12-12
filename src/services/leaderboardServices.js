import axios from "axios";
import config from "../config.json";

const leaderboardUrl = config.backEndUrl + "/leaderboard";

export function getLeaderboard() {
  return axios.get(leaderboardUrl);
}

export function getUserLeaderboard(userId) {
  return axios.get(leaderboardUrl + `/${userId}`);
}

export function postAnonScore(name, score) {
  axios.post(leaderboardUrl, {
    name: name || "unknown",
    score,
  });
}

export function postUserScore(userId, score) {
  axios.post(leaderboardUrl, {
    userId,
    score,
  });
}

export function deleteScore(id) {
  axios.delete(leaderboardUrl + `/${id}`);
}
