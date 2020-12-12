import React from "react";
import { deleteWrongWord, getWrongWords } from "../../services/userServices";
import Table from "../common/table";

class WrongWords extends Table {
  state = {
    pageLength: 7,
    currentPage: 1,
    searchQuery: "",
    pageRange: { lowerPageNumber: 1, upperPageNumber: 5 },
    deleteButton: true,
    sortable: false,
    searchBar: true,
    title: "Wrong Words",
    headers: ["Wrong Word", "Example1", "Example2", "Example3"],
    filterColumn: "word",
    pagination: true,
  };

  componentDidMount = async () => {
    const { data: wrongWords } = await getWrongWords(this.props.user._id);
    this.setState({ data: wrongWords.wrongWords });
  };

  renderTableBody = () => {
    let { data: wrongWords, pageLength, currentPage, searchQuery } = this.state;

    // Filters the data by the search query and which page we are on
    wrongWords = wrongWords
      .filter((entry) =>
        entry.word.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .slice(pageLength * currentPage - pageLength, pageLength * currentPage);

    return wrongWords.map((element) => (
      <tr>
        <th scope="row">{element.word}</th>
        <td key={element.synonyms[0]}>{element.synonyms[0]}</td>
        <td key={element.synonyms[1]}>{element.synonyms[1]}</td>
        <td key={element.synonyms[2]}>{element.synonyms[2]}</td>
        <td key={element.word + "button"}>
          <button
            type="button"
            className="btn btn-danger btn-sm"
            onClick={() => {
              deleteWrongWord(element, this.props.user._id);
              window.location.reload();
            }}
          >
            Delete
          </button>
        </td>
      </tr>
    ));
  };

  render() {
    return (
      <React.Fragment>
        {this.state.data && <div>{this.renderTable()}</div>}
      </React.Fragment>
    );
  }
}

export default WrongWords;
