import React from 'react'
import './tile.css'


let Tile = (props) => {

   // our toggleLife onClick is passed from board so we can more simply set coordinates there.

   return (
      <td 
         onClick={ () => { props.toggleLife() } }
         className={ props.life ? "table_cell life" : "table_cell empty"}
      >
         {/* ... */}
      </td>
   )
}
 
export default Tile