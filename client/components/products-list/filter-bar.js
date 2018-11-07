import React from 'react'

const FilterBar = ({handleChange, products}) => {
  const categories = products.map(product => product.category);
  const unique =  categories.sort().filter((prev, i, product) => !i || prev !== product[i - 1])

  return (
    <div >
      <select onChange={function(ev) { handleChange(ev.target.value)}}>
        <option>all</option>
        {unique.map((category) =>  <option key={category}>{category}</option>)}
        {/* <option>charcuterie boards</option>
        <option>cheeses</option>
        <option>meats</option>
        <option>extras</option> */}
      </select>
    </div>
  )
}

export default FilterBar

