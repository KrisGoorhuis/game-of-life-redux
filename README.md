John Conway's Game of Life, made with React & Redux.

### Design

The board is constructed from Tile components, each generated from our data table stored in the Redux store. Clicking a tile proliferates the data change, allowing other tiles to adhere to the rules of the game with this new life in mind.

Users can tinker with parameters generate new games, pause, and reset the field.

### Skills involved

Complex state flow, including injecting references to turn times into a normally fixed setTimeout closure.

Componentization, of course.

Semantic HTML

Translation of game rules into program logic. Makes use of loops set (and legibly presented) four layers deep!