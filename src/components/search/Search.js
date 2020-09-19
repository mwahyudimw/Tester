import { Index } from "elasticlunr"
import React, { useState, useEffect } from "react"

import Input from "./Input"
import SearchItems from "./SearchItems"

const Search = ({ searchIndex }) => {
  const index = Index.load(searchIndex)
  const [query, setQuery] = useState("")
  const [results, setResults] = useState([])
  const searchInput = React.createRef()

  useEffect(() => {
    searchResults("blog")
    searchInput.current.focus()
  }, [])

  function searchResults(searchQuery) {
    const res = index.search(searchQuery, { expand: true }).map(({ ref }) => {
      return index.documentStore.getDoc(ref)
    })
    setResults(res)
  }

  return (
    <>
      <>
        <Input
          ref={searchInput}
          className="px-2"
          label="Search"
          onChange={event => {
            const searchQuery = event.target.value
            setQuery(searchQuery)
            searchResults(searchQuery)
          }}
          placeholder="Search"
          value={query}
        />
      </>
      <SearchItems query={query} results={results} />
    </>
  )
}

export default Search;
