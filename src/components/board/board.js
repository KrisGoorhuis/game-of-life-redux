import React, { useEffect } from 'react'
import './board.css'
import { connect } from 'react-redux'

import Tile from './tile/tile.js'


let Board = (props) => {

   function startGame() {
      props.dispatch({type: 'GENERATE_EMPTY_ARRAY'})
      props.dispatch({type: 'RANDOMIZE_LIFE'})

      advanceTime()
   }

   function advanceTime() {
      props.dispatch({type: 'ADVANCE_TIME'})

      setTimeout( () => {
         advanceTime()
      }, props.turnTime)
   }

   useEffect( () => {
      // Missing dependencies warning: function name. Seems harmless. I have tried:
      // List function in dependency array. Call stack exceeded
      // Moving the function definition in here. Missing dep: props. It suggests destructuring outside.
      // Destructure outside. Missing dep: all of the destructured things.
      // So here it stays and ignored goes the warning.

      startGame()
   }, [])
   
   
   let toggleLife = (x, y) => {
      // This JSON hack unfortunately seems to be the easiest way to create a full copy
      // rather than an array of references. Boo.
      let newTileDataArray = JSON.parse(JSON.stringify(props.tileDataArray));
      newTileDataArray[x][y].life = !newTileDataArray[x][y].life
      
      props.dispatch({type: 'TOGGLE_LIFE', payload: newTileDataArray})
   }

   return (
      <div id="table_container">
      {
         props.tileDataArray === null ? // This will attempt to render before useEffect makes the call to generate. Give 'em a sec.
         <p>Generating...</p>
         :
         <table> 
            <tbody id="table_body">
               { props.tileDataArray.map( (row, x) =>
                     <tr className="table_row" key={x}>
                        { row.map( (tileData, y) => 
                              <Tile life={ tileData.life } toggleLife={ () => toggleLife(x, y) } key={y} />
                        ) }
                     </tr>
                  ) }
            </tbody>
         </table>
      }     
      </div>
   )
}

let mapStateToProps = (state) => {
   return {
      width: state.mainReducer.width,
      height: state.mainReducer.height,
      tileDataArray: state.mainReducer.tileDataArray,
      // lifeProliferation: state.mainReducer.lifeProliferation,
      turnTime: state.mainReducer.turnTime,
   }
}

export default connect(mapStateToProps)(Board)