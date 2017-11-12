function Cell(i_, j_) {

  this.i = i_;
  this.j = j_;
  //Top, right, bottom, left
  this.walls = [true, true, true, true];
  this.visited = false;

  this.checkNeighbors = function() {

    let neighbors = [];

    let top = grid[index(i_, j_ - 1)];
    let right = grid[index(i_ + 1, j_)];
    let bottom = grid[index(i_, j_ + 1)];
    let left = grid[index(i_ - 1, j_)];

    if (top && !top.visited) {
      neighbors.push(top);
    }
    if (right && !right.visited) {
      neighbors.push(right);
    }
    if (bottom && !bottom.visited) {
      neighbors.push(bottom);
    }
    if (left && !left.visited) {
      neighbors.push(left);
    }

    if (neighbors.length > 0) {
      let r = floor(random(0, neighbors.length));
      return neighbors[r];
    } else {
      return undefined;
    }

  }

  this.show = function() {

    let x = this.i * w;
    let y = this.j * w;

    stroke(51);

    strokeWeight(1);

    //Top
    if (this.walls[0]) {
      line(x, y, x + w, y);
    } //Right
    if (this.walls[1]) {
      line(x + w, y, x + w, y + w);
    } //Left
    if (this.walls[2]) {
      line(x + w, y + w, x, y + w);
    } //Bottom
    if (this.walls[3]) {
      line(x, y + w, x, y);
    }
  }
}
