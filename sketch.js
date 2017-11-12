let cols, rows;
let w = 2;

let grid = [];

let current;
let stack = [];

let steps = 0;

function setup() {

  createCanvas(64 + 1, 64 + 1);

  noSmooth();
  strokeCap(PROJECT);

  cols = floor(width / w);
  rows = floor(height / w);
  //frameRate(5);

  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      let cell = new Cell(i, j);
      grid.push(cell);
    }
  }

  current = grid[0];

  makeEntrances();
}

function draw() {

  background(255);

  for (let i = 0; i < grid.length; i++) {
    grid[i].show();
  }

  current.visited = true;

  // STEP 1
  let next = current.checkNeighbors();
  if (next) {
    next.visited = true;

    // STEP 2
    stack.push(current);
    steps++;
    // STEP 3
    removeWalls(current, next);

    // STEP 4
    current = next;

  } else if (stack.length > 0) {

    current = stack.pop();
  }

}

//Magic formula that converts a 2D array to a 1D array;
function index(i, j) {
  if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1) {
    return -1;
  }
  return i + j * cols;
}

function removeWalls(a, b) {

  let x = a.i - b.i;

  if (x === 1) {
    a.walls[3] = false;
    b.walls[1] = false;
  } else if (x === -1) {
    a.walls[1] = false;
    b.walls[3] = false;
  }
  let y = a.j - b.j;

  if (y === 1) {
    a.walls[0] = false;
    b.walls[2] = false;
  } else if (y === -1) {
    a.walls[2] = false;
    b.walls[0] = false;
  }

}

function makeEntrances() {

  var r1 = floor(random(0, rows - 1));
  var r2 = floor(random(0, cols - 1));

  let entrance = grid[index(r1, 0)];
  let exit = grid[index(r2, cols - 1)];

  entrance.walls[0] = false;
  exit.walls[2] = false;

}
