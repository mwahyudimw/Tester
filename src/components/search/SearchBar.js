import styled from "@emotion/styled"
import { graphql, StaticQuery } from "gatsby"
import React, { useState } from "react"

import Search from "./Search"

const SearchBar = () => {
  const [showSearch, setShowSearch] = useState(false)

  function hideSearch(event) {
    if (event.target.placeholder !== "Search") {
      setShowSearch(false)
    }
  }

  return (
    <>
      <h1
        onClick={() => setShowSearch(!showSearch)}
      >
        Search
      </h1>

      <SearchOverlay
        role="presentation"
        showSearch={showSearch}
      >
        <StaticQuery
          query={graphql`
            query SearchIndexQuery {
              siteSearchIndex {
                index
              }
            }
          `}
          render={data => (
            <>
              {showSearch && (
                <Search searchIndex={data.siteSearchIndex.index} />
              )}
            </>
          )}
        />
      </SearchOverlay>
    </>
  )
}



const SearchOverlay = styled.div`
  opacity: ${props => (props.showSearch ? 1 : 0)};
  display: ${props => (props.showSearch ? "flex" : "none")};
  transition: opacity 150ms linear 0s;
  background: rgba(255, 255, 255, 0.9);
`

export default SearchBar;
