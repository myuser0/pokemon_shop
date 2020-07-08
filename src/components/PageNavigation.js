import React from 'react'

export default function PageNavigation({getNextPage, getPreviousPage}) {
  return (
    <div className="page_navigation">
      <button className="yellow_btn" onClick={getPreviousPage}>Anterior</button>
      <button className="yellow_btn" style={{marginLeft: '15px'}} onClick={getNextPage}>Próxima</button>
    </div>
  )
}
