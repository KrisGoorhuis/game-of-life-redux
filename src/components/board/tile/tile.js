import React from 'react'
import './tile.css'
import { connect } from 'react-redux'


let Tile = (props) => {

   // our toggleLife onClick is passed from board so we can more simply set coordinates there.

   let tileStyle = {
      width: props.tileWidth + "px",
      height: props.tileHeight + "px",
   }

   return (
      <td 
         style={tileStyle}
         onClick={ () => { props.toggleLife() } }
         className={ props.life ? "table_cell life" : "table_cell empty"}
      >
         {/* ... */}
      </td>
   )
}

let mapStateToProps = (state) => {
   return {
      tileWidth: state.mainReducer.tileWidth,
      tileHeight: state.mainReducer.tileHeight
   }
}
 
export default connect(mapStateToProps)(Tile)