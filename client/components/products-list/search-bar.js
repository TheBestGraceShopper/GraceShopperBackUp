import React from 'react'

const SearchBar = (props) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    props.searchOnChange(e.target.searchVal.value);
  }
  return (
  <form onSubmit={handleSubmit} >
            <div>
              <input onChange={e => props.searchOnChange(e.target.value)} name="searchVal" type="text" placeholder="Search for.."/>
            </div>
            <button type="submit">Search</button>
  </form>
  );
}

export default SearchBar;
