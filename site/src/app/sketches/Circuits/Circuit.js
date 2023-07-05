"use client"

const TEAL_RGB = [80, 191, 160];
const COMPARISON_THRESHOLD = 40;

const masterVertices = [];

const areVerticesEqualish = (v1, v2) => {
  const x1 = Math.round(v1.x);
  const y1 = Math.round(v1.y);
  const x2 = Math.round(v2.x);
  const y2 = Math.round(v2.y);

  let xAreEqual = false;
  let yAreEqual = false;

  if (
    x1 === x2 ||
    (x1 < x2 + COMPARISON_THRESHOLD && x1 > x2 - COMPARISON_THRESHOLD) ||
    (x2 < x1 + COMPARISON_THRESHOLD && x2 > x1 - COMPARISON_THRESHOLD)
  ) {
    xAreEqual = true;
  }
  if (
    y1 == y2 ||
    (y1 < y2 + COMPARISON_THRESHOLD && y1 > y2 - COMPARISON_THRESHOLD) ||
    (y2 < y1 + COMPARISON_THRESHOLD && y2 > y1 - COMPARISON_THRESHOLD)
  ) {
    yAreEqual = true;
  }
  return xAreEqual && yAreEqual;
};

const findIntersection = point =>
  masterVertices.find(v => areVerticesEqualish(point, v));

export default class Circuit {
  constructor(p) {
    this.p = p;
    this.readyToDraw = [];
    this.turningPoints = [];
    this.angles = [];
    this.vertices = [];

    this.constructTurns();
  }

  _findIntersectionInAllLines(start, end, angle, numTurn) {
    for (let i = angle.start; i < angle.end; i++) {
      const tempX = this.p.map(i, angle.start, angle.end, start.x, end.x, 1);
      const tempY = this.p.map(i, angle.start, angle.end, start.y, end.y, 1);
      const vertex = this.p.createVector(tempX, tempY);
      if (findIntersection(vertex)) {
        return true;
      }
    }
  }

  constructTurns() {
    const angle = { current: 0, start: 0, end: 100 };
    const numTurns = Math.max(3, Math.round(this.p.random(5)));
    for (let i = 0; i < numTurns; i++) {
      let point = this.constructPoint();
      while (
        findIntersection(point) ||
        (i > 0 &&
          this._findIntersectionInAllLines(
            this.turningPoints[i - 1],
            point,
            angle,
            i
          ))
      ) {
        point = this.constructPoint();
      }

      this.turningPoints.push(point);
      this.readyToDraw.push(false);
      this.angles.push({ ...angle });
    }
  }

  constructPoint() {
    return this.p.createVector(
      this.p.random(this.p.width * 2),
      this.p.random(this.p.height * 2)
    );
  }

  constructLine(startIndex, endIndex) {
    const { current, start, end } = this.angles[startIndex];
    const startPoint = this.turningPoints[startIndex];
    const endPoint = this.turningPoints[endIndex];

    const tempX = this.p.map(current, start, end, startPoint.x, endPoint.x, 1);
    const tempY = this.p.map(current, start, end, startPoint.y, endPoint.y, 1);
    const vertex = this.p.createVector(tempX, tempY);

    if (!this.vertices[startIndex]) {
      this.vertices[startIndex] = [];
    }
    this.vertices[startIndex].push(vertex);
    this.angles[startIndex].current += 0.5;

    masterVertices.push(vertex);
  }

  drawDot(point, diameter) {
    this.p.fill(...TEAL_RGB);
    //   p.stroke(...GRAY_RGB);
    this.p.strokeWeight(0);
    this.p.circle(point.x, point.y, diameter || 30);
  }

  drawLine(index) {
    const { x: turnX, y: turnY } =
      index + 1 < this.turningPoints.length
        ? this.turningPoints[index + 1]
        : {};

    this.p.stroke(...TEAL_RGB);
    this.p.strokeWeight(10);
    this.p.noFill();

    this.p.beginShape();
    for (let i = 0; i < this.vertices[index].length; i++) {
      const { x, y } = this.vertices[index][i];
      this.p.vertex(x, y);

      if (x === turnX && y === turnY) {
        this.readyToDraw[index + 1] = true;
      }
    }
    this.p.endShape();
  }

  draw() {
    this.readyToDraw[0] = true;

    this.drawDot(this.turningPoints[0]);
    for (let i = 0; i + 1 < this.turningPoints.length; i++) {
      if (this.readyToDraw[i]) {
        this.constructLine(i, i + 1);
        this.drawLine(i);
      }
    }
    if (this.readyToDraw[this.turningPoints.length - 1]) {
      this.drawDot(this.turningPoints[this.turningPoints.length - 1]);
    }
  }
}
