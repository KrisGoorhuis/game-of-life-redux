const initialState = {
   width: 40,
   height: 30,
   tileDataArray: null,
   lifeProliferation: 15, // percentage
   paused: false,
   turnTime: 350,
   tileWidth: '1',
   tileHeight: '1',
   generation: 0,
}

export default function mainReducer(state = initialState, action) {
   switch (action.type) {

      case ('SET_WIDTH'):
         let newWidth = action.payload

         // Safety for non-numeric values input by user.
         if (isNaN(newWidth)) {
            newWidth = state.width
         }

         return {
            ...state,
            width: newWidth
         }

      case ('SET_HEIGHT'):
         let newHeight = action.payload

         // Safety for non-numeric values input by user.
         if (isNaN(newHeight)) {
            newHeight = state.height
         }

         return {
            ...state,
            height: newHeight
         }

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
               let roll = Math.random() * 100 // We're comparing with a percentage, so bump it up two decimals
               lifeArray[x][y] = roll > state.lifeProliferation ? { life: false } : { life: true }
               lifeArray[x][y].age = 0
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
         // See 'RANDOMIZE_LIFE' above
         let nextArray = JSON.parse(JSON.stringify(state.tileDataArray))
         let nextGeneration = state.generation

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
            
            // If the examined cell is alive
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

            // If the examined cell is dead but close to others
            if (nextArray[x][y].life === false) {
               if (neighbors === 3) {
                  return true
               }
            }

            // Empty area
            return false
         }

         // If we are paused, the setTimeout is still running
         // We just aren't applying any updates.
         if (state.paused === false) {
            nextGeneration++

            for (let x = 0; x < nextArray.length; x++) {
               for (let y = 0; y < nextArray[x].length; y++) {
                  nextArray[x][y].life = decideFate(x, y)
                  if (nextArray[x][y].life === true) {
                     nextArray[x][y].age++
                  } else {
                     nextArray[x][y].age = 0
                  }
               }
            }
         }

         return {
            ...state,
            tileDataArray: nextArray,
            generation: nextGeneration
         }

      case ('TOGGLE_PAUSE'):
         return {
            ...state,
            paused: !state.paused
         }

      case ('SET_LIFE_PROLIFERATION'):
         let newProliferation = action.payload

         if (isNaN(newProliferation)) {
            newProliferation = state.lifeProliferation
         }

         return {
            ...state,
            lifeProliferation: newProliferation
         }

      case ('SET_TURN_TIME'):
         let newTurnTime = action.payload

         if (isNaN(newTurnTime)) {
            newTurnTime = state.turnTime
         }

         return {
            ...state,
            turnTime: newTurnTime
         }

      case ('SET_TILE_WIDTH'):
         let newTileWidth = action.payload
         if (isNaN(newTileWidth)) {
            newTileWidth = state.tileWidth
         }
         return {
            ...state,
            tileWidth: newTileWidth
         }

      case ('SET_TILE_HEIGHT'):
         let newTileHeight = action.payload
         if (isNaN(newTileHeight)) {
            newTileHeight = state.tileHeight
         }

         return {
            ...state,
            tileHeight: newTileHeight
         }

      case ('RESET_BOARD'):
         let newState = { ...initialState }

         if (window.screen.availWidth < 600) {
            newState.width = 25
         }

         return {
            ...newState
         }

      default:
         return state
   }
}