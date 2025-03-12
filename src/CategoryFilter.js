import React from 'react';

function CategoryFilter({ setCategory }) {
  const categories = ["apple", "sports", "technology", "politics", "entertainment"];

  return (
    <div className='category-filter'>
      <select onChange={(event) => setCategory(event.target.value)}>
        {categories.map((category, index) => (
          <option key={index} value={category}>{category}</option>
        ))}
      </select>
    </div>
  );
}

export default CategoryFilter;
