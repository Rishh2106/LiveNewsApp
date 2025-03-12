import React from 'react';

function DateSearch({ setDate }) {
  return (
    <div className='date-search'>
      <input type='date' onChange={(event) => setDate(event.target.value)} />
    </div>
  );
}

export default DateSearch;
