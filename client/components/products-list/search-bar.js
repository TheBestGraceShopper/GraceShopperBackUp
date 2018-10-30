import React from 'react'

const SearchBar = (props) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    props.searchOnChange(e.target.value);
  }
  return (
  <form onSubmit={handleSubmit} >
            <div>
              <input  name="name" type="text" placeholder="Search for.."/>
            </div>
            <button type="submit">Search</button>
  </form>
  );
}
// onChange={e => props.searchOnChange(e.target.value)}

export default SearchBar;
