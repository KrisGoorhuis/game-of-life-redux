import React from 'react'
import './controls.css'
import { connect } from 'react-redux'

let Controls = (props) => {

   function restartGame() {
      props.dispatch({type: 'GENERATE_EMPTY_ARRAY'})
      props.dispatch({type: 'RANDOMIZE_LIFE'})
    }
  
   function reset() {
      props.dispatch({type: 'RESET_BOARD'})
      restartGame()
   }

   let getVal = (query) => {
      console.log(document.querySelector(query).value)
      return parseInt(document.querySelector(query).value)
   }

   let generate = () => {
      console.log("Generate")
      console.log(getVal('#tiles_high'))

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

console.log(props)


   return (
      <div id="controls_container">
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

         <label> Life proliferation (%): 
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

         <label> Tile width (pixels):
            <input 
               type="number" 
               className="input_field" 
               id="tile_width" 
               placeholder={props.tileWidth} 
            />
         </label>

         <label> Tile height (pixels):
            <input 
               type="number" 
               className="input_field" 
               id="tile_height" 
               placeholder={props.tileHeight} 
            />
         </label>

         <button id="pause_button" onClick={togglePause}>
            {props.paused ? "Resume" : "Pause"}
         </button>

         <button id="generate_button" onClick={generate}>
            Generate
         </button>

         <button id="reset_button" onClick={reset}>
            Reset
         </button>

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
      tileHeight: state.mainReducer.tileHeight
   }
}

export default connect(mapStateToProps)(Controls)