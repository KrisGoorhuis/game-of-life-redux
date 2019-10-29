const initialState = {
   width: 40,
   height: 30,
   tileDataArray: null,
   lifeProliferation: .10,
   paused: false,
   turnTime: 350,
}

export default function mainReducer(state = initialState, action) {
   switch (action.type) {
      case ('SET_WIDTH'):
         return {
            ...state,
            width: action.payload
         }

      case ('SET_HEIGHT'):
         return {
            ...state,
            height: action.payload
         }

      // case ('SET_TILE_DATA_ARRAY'):
      //    return {
      //       ...state,
      //       tileDataArray: action.payload
      //    }

      case ('GENERATE_EMPTY_ARRAY'):
         let emptyArray = new Array(state.width)

         for (let i = 0; i < emptyArray.length; i++) {
            emptyArray[i] = new Array(state.height)
         }

         return {
            ...state,
            tileDataArray: emptyArray
         }
      
      case ('RANDOMIZE_LIFE'):
         // This JSON hack unfortunately seems to be the easiest way to create a full copy
         // rather than an array of references. Boo.
         let lifeArray = JSON.parse(JSON.stringify(state.tileDataArray))

         for (let x = 0; x < lifeArray.length; x++) {
            for (let y = 0; y < lifeArray[x].length; y++) {
               let roll = Math.random()
               lifeArray[x][y] = roll > state.lifeProliferation ? {life: false} : {life: true}
            }
         }

         return {
            ...state,
            tileDataArray: lifeArray
         }

      case ('TOGGLE_LIFE'):
         return {
            ...state,
            tileDataArray: action.payload
         }

      case ('ADVANCE_TIME'):
         // See line 41. 
         let nextArray = JSON.parse(JSON.stringify(state.tileDataArray))

         function decideFate(x, y) {
            let neighbors = 0

            // Determine the number of neighbors
            for (let i = x - 1; i <= x + 1; i++) {
               for (let j = y - 1; j <= y + 1; j++) {
                  if (i === x && j === y) { 
                     continue // If we're examining ourselves, go to the next loop.
                  }
                  if (i < 0 || j < 0 || i >= nextArray.length || j >= nextArray[i].length) {
                     continue // If we're examing out of bounds bounds, go to the next loop
                  }
                  // These two conditionals must be based on the original, not our currently updating array.
                  if (state.tileDataArray[i][j].life === true) {
                     neighbors++
                  }
                  if (state.tileDataArray[i][j].life === false) {
                     // ...
                  }
               }
            }

            // These are the rules of Conway's game. Translated from Wikipedia.
            if (nextArray[x][y].life === true) {
               if (neighbors < 2) {
                  return false
               }
               if (neighbors === 2 || neighbors === 3) {
                  return true
               }
               if (neighbors > 3) {
                  return false
               }
            }
      
            if (nextArray[x][y].life === false) {
               if (neighbors === 3) {
                  return true
               }
            }
            
            return false
         }

         for (let x = 0; x < nextArray.length; x++) {
            for (let y = 0; y < nextArray[x].length; y++) {
               nextArray[x][y].life = decideFate(x, y)
            }
         }

         return {
            ...state,
            tileDataArray: nextArray
         }

      case ('TOGGLE_PAUSE'):
         return {
            ...state,
            paused: !state.paused
         }
         
      default:
         return state
   }
}