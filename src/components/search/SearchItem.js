import { Link } from "gatsby";
import React from "react";
import Highlighter from "react-highlight-words";

const SearchItem = ({ path, title, query }) => (
  <>
    <Link to={path}>
      <Highlighter
        autoEscape
        highlightStyle={{ backgroundColor: "#ffd54f" }}
        searchWords={query.split(" ")}
        textToHighlight={title}
      />
    </Link>
    <Link to={path}>Read More</Link>
  </>
);

export default SearchItem;
