"use client"

import dynamic from "next/dynamic";
import type p5Type from "p5";
const Sketch = dynamic(import("react-p5"), { ssr: false });

import Circuit from "./Circuit";

const GRAY_RGB = [255, 255, 255];

const CIRCUITS_DIVISIBLE = 200000;
const MODULO = 200;

interface CircuitsProps {
  width?: number;
  height?: number;
}

const Circuits = ({ width, height }: CircuitsProps): JSX.Element => {
  const circuits: Circuit[] = [];

  const setup = (p: p5Type, canvasParentRef: Element): void => {
    p.createCanvas(width || p.windowWidth, height || p.windowHeight).parent(canvasParentRef);
    p.background(GRAY_RGB);

    setTimeout(() => {
      p.noLoop();
    }, 60000);
  };

  const draw = (p: p5Type): void => {
    const num = Math.round(p.random(MODULO));

    if (
      num % MODULO === 0 &&
      circuits.length < Math.ceil((p.width * p.height) / CIRCUITS_DIVISIBLE)
    ) {
      const circuit = new Circuit(p);
      circuits.push(circuit);
    }

    for (let i = 0; i < circuits.length; i++) {
      circuits[i].draw();
    }
  };

  return <Sketch setup={setup} draw={draw} />

};

export default Circuits;
