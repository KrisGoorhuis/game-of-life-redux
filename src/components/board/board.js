import React, { useEffect, useRef } from 'react'
import './board.css'
import { connect } from 'react-redux'

import Tile from './tile/tile.js'


let Board = (props) => {
   // How I think this setTimeout solution goes:
   // setTimeout creates its own closure, so we can't nicely update the turn time field within.
   // useRef sticks a reference to something outside the closure in there instead of its enclosed variable.
   // The reference lets us give turn time control to users via the normal Redux store updates
   let turnTimeRef = useRef(props.turnTime)
   turnTimeRef.current = props.turnTime


   function startGame() {
      props.dispatch({ type: 'GENERATE_EMPTY_ARRAY' })
      props.dispatch({ type: 'RANDOMIZE_LIFE' })

      advanceTime()
   }

   function advanceTime() {
      props.dispatch({ type: 'ADVANCE_TIME' })

      setTimeout(() => {
         advanceTime()
      }, turnTimeRef.current)
   }

   useEffect(() => {
      // Missing dependencies warning: function name. Seems harmless. I have tried:
      // List function in dependency array. Call stack exceeded
      // Moving the function definition in here. Missing dep: props. It suggests destructuring outside.
      // Destructure outside. Missing dep: all of the destructured things.
      // So here it stays and ignored goes the warning.
      if (window.screen.availWidth < 600) {
         // If we're on a phone, start a slim board instead.
         props.dispatch({ type: 'SET_WIDTH', payload: 25 })
      }
      startGame()
   }, [])


   let toggleLife = (x, y) => {
      // This JSON hack unfortunately seems to be the easiest way to create a full copy
      // rather than an array of references. Boo.
      let newTileDataArray = JSON.parse(JSON.stringify(props.tileDataArray));

      newTileDataArray[x][y].life = !newTileDataArray[x][y].life
      newTileDataArray[x][y].age++

      console.log(`Creating life at [${x}, ${y}]`)

      props.dispatch({ type: 'TOGGLE_LIFE', payload: newTileDataArray })
   }

   return (
      <div id="board_container">
         <main id="board_main">
            <article id="info_box">
               <section id="age_info_container">
                  <h5>Age</h5>
                  <ul id="age_info_details">
                     <li>-</li>
                     <li className="age_info_listing" id="age_info_juvenile"></li>
                     <li className="age_info_listing" id="age_info_adolescent"></li>
                     <li className="age_info_listing" id="age_info_adult"></li>
                     <li>+</li>
                  </ul>
               </section>
               <section id="generation_container">
                  <h6>Generation</h6>
                  <p>{props.generation}</p>
               </section>
            </article>
            <table>
               {
                  props.tileDataArray === null ? // This will attempt to render before useEffect makes the call to generate. Give 'em a sec.
                     <tbody id="generating_message"><tr><td>Creating life...</td></tr></tbody>
                     :
                     <tbody id="table_body">
                        {props.tileDataArray.map((row, x) =>
                           <tr className="table_row" key={x}>
                              {row.map((tileData, y) =>
                                 <Tile
                                    life={tileData.life}
                                    age={tileData.age}
                                    toggleLife={() => toggleLife(x, y)}
                                    key={y}
                                 />
                              )}
                           </tr>
                        )}
                     </tbody>
               }
            </table>
         </main>

      </div>
   )
}

let mapStateToProps = (state) => {
   return {
      width: state.mainReducer.width,
      height: state.mainReducer.height,
      tileDataArray: state.mainReducer.tileDataArray,
      turnTime: state.mainReducer.turnTime,
      generation: state.mainReducer.generation,
   }
}

export default connect(mapStateToProps)(Board)