John Conway's Game of Life, made with React & Redux.

## Design

The board is constructed from Tile components, each generated from our data table stored in the Redux store. Clicking a tile proliferates the data change, allowing other tiles to adhere to the rules of the game with this new life in mind.

Users can tinker with parameters, generate new games, pause, and reset the field.

### Skills involved

Complex state flow, including injecting references to turn times into a normally fixed setTimeout closure.

Componentization, of course.

Semantic HTML

Translation of game rules into program logic. Makes use of loops set (and legibly presented) four layers deep!

### What I'd do differently
Rerenders are expensive. Making each cell a React component simplified a number of things, but detecting mouse coordinates on a `<canvas>` element and translating that into the 2D array it's built on would probably be quicker. But would it be worth losing the tiles as nice, neat little elements?

### Lessons learned
`useRef()` is a wonderful friend. Using it to update things in what's normally within setTimeout's closure is such a neat trick - one I'm certain I'll find a use for again.

`parseInt()` doesn't work with decimals. In retrospect, I should have recognized this immediately. Luckily we have `parseFloat()` for decimals!