import React from "react";
import SearchItem from "./SearchItem";

const SearchItems = ({ results, query }) => (
  <ul className="results" >
    {results.map(page => (
      <li key={page.id}>
        <SearchItem path={`${page.path}`} query={query} title={page.title} />
      </li>
    ))}
  </ul>
)

export default SearchItems;