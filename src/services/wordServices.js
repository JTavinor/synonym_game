import axios from "axios";

export function getWordData(newWord) {
  return axios.get(`https://api.datamuse.com/words?ml=${newWord}`);
}
