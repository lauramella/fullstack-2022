import React from 'react'

const Filter = ({ sFilter, handleFilter }) => {
    return (
        <div>
            filter shown with <input value={sFilter} onChange={handleFilter} />
        </div>
    )
}

export default Filter 