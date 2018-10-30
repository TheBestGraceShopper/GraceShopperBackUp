import React from 'react'

const FilterBar = ({handleChange}) => {

  return (
    <div className="filter-bar">
      <select onChange={function(ev) { handleChange(ev.target.value)}}>
        <option>all</option>
        <option>charcuterie boards</option>
        <option>cheeses</option>
        <option>meats</option>
        <option>extras</option>
      </select>
    </div>
  )
}

export default FilterBar

