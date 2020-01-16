import React from 'react'
import './tile.css'
import { connect } from 'react-redux'


let Tile = (props) => {

   // our toggleLife onClick is passed from board so we can more simply set coordinates there.

   let tileStyle = {
      width: props.tileWidth + "em",
      height: props.tileHeight + "em",
   }

   let classList = "table_cell" // Watch for spaces in added classes

   if (props.life) {
      classList += " life" // SPAAACE
      
      // Only add age classes if the tile contains life
      if (props.age === 1) {
         classList += " juvenile"
      }
      if (props.age === 2) {
         classList += " adolescent"
      }
      if (props.age >= 3) {
         classList += " adult"
      }
   }
   


   return (
      <td 
         style={tileStyle}
         onClick={ () => { props.toggleLife() } }
         className={classList}
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