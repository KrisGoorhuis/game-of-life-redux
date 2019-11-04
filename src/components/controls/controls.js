import React, { useEffect } from 'react'
import './controls.css'
import { connect } from 'react-redux'

let Controls = (props) => {

   function restartGame() {
      props.dispatch({type: 'GENERATE_EMPTY_ARRAY'})
      props.dispatch({type: 'RANDOMIZE_LIFE'})


    }
  
   function reset() {
      // Control fields will reset in useEffect. Otherwise we update with old values.
      props.dispatch({type: 'RESET_BOARD'})
      restartGame()
   }

   function resetControls() {
      document.querySelector('#tiles_wide').value = props.width
      document.querySelector('#tiles_high').value = props.height
      document.querySelector('#life_proliferation').value = props.lifeProliferation
      document.querySelector('#turn_time').value = props.turnTime
      document.querySelector('#tile_width').value = props.tileWidth
      document.querySelector('#tile_height').value = props.tileHeight
   }

   let getVal = (query) => {
      return parseInt(document.querySelector(query).value)
   }

   let generate = () => {
      reset()

      // These can pass NaN. The reducer will check for those.
      props.dispatch({type: 'SET_WIDTH', payload: getVal('#tiles_wide')})
      props.dispatch({type: 'SET_HEIGHT', payload: getVal('#tiles_high')})
      props.dispatch({type: 'SET_LIFE_PROLIFERATION', payload: getVal('#life_proliferation')})
      props.dispatch({type: 'SET_TURN_TIME', payload: getVal('#turn_time')})
      props.dispatch({type: 'SET_TILE_WIDTH', payload: getVal('#tile_width')})
      props.dispatch({type: 'SET_TILE_HEIGHT', payload: getVal('#tile_height')})

      restartGame()
   }

   let togglePause = () => {
      props.dispatch({type: 'TOGGLE_PAUSE'})
   }

   useEffect(() => {
      resetControls()
   })

   return (
      <div id="controls_container">
         <h5>Extreme values make cause weird behavior.</h5>
         <label> Tiles wide: 
            <input 
               type="number" 
               className="input_field" 
               id="tiles_wide" 
               placeholder={props.width} 
            />
         </label>

         <label> Tiles high: 
            <input 
               type="number" 
               className="input_field" 
               id="tiles_high" 
               placeholder={props.height} 
            />
         </label>

         <label> 
            Life proliferation (%):
            <input 
               type="number" 
               className="input_field" 
               id="life_proliferation" 
               placeholder={props.lifeProliferation} 
            />
         </label>

         <label> Turn time (ms): 
            <input 
               type="number" 
               className="input_field" 
               id="turn_time" 
               placeholder={props.turnTime} 
            />
         </label>

         <label> Tile width (relative units):
            <input 
               type="number" 
               className="input_field" 
               id="tile_width" 
               placeholder={props.tileWidth} 
            />
         </label>

         <label> Tile width (relative units):
            <input 
               type="number" 
               className="input_field" 
               id="tile_height" 
               placeholder={props.tileHeight} 
            />
         </label>

         <div id="buttons_container">
            <button 
               id="pause_button" 
               onClick={togglePause}
               className="controls_button"
            >
               {props.paused ? "Resume" : "Pause"}
            </button>

            <button 
               id="generate_button" 
               onClick={generate}
               className="controls_button"
            >
               Generate
            </button>

            <button 
               id="reset_button" 
               onClick={reset}
               className="controls_button"
            >
               Reset
            </button>
         </div>

          {/* Extreme values may do weird things. Not necessarily in a good way. */}
      </div>
   )
}

let mapStateToProps = (state) => {
   return {
      width: state.mainReducer.width,
      height: state.mainReducer.height,
      lifeProliferation: state.mainReducer.lifeProliferation,
      paused: state.mainReducer.paused,
      turnTime: state.mainReducer.turnTime,
      tileWidth: state.mainReducer.tileWidth,
      tileHeight: state.mainReducer.tileHeight,
   }
}

export default connect(mapStateToProps)(Controls)