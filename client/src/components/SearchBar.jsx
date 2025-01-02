import React from 'react'

function SearchBar({ value, onChange }) {
  return (
    <div>
      <input
        type="text"
        placeholder="Search recipes..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}

export default SearchBar