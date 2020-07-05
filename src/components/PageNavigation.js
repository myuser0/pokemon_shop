import React from 'react'

export default function PageNavigation({getNextPage, getPreviousPage}) {
  return (
    <div className="page_navigation">
      <button className="yellow_btn" onClick={getPreviousPage}>Previous Page</button>
      <button className="yellow_btn" style={{marginLeft: '15px'}} onClick={getNextPage}>Next Page</button>
    </div>
  )
}
