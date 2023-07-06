import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import Circuit from "./Circuit";

import type p5Type from "p5";

/**
 * Class below
 */

const GRAY_RGB = [255, 255, 255];

const CIRCUITS_DIVISIBLE = 200000;
const MODULO = 200;

interface CircuitsProps {
  width?: number;
  height?: number;
  className?: string;
}

const Circuits = ({ width, height, className }: CircuitsProps) => {
  const circuitsEl = useRef();

  const sketch = (p: p5Type) => {
    const circuits: Circuit[] = [];

    p.setup = () => {
      p.createCanvas(width || p.windowWidth, height || p.windowHeight);
      p.background(GRAY_RGB);

      setTimeout(() => {
        p.noLoop();
      }, 60000);
    };

    p.draw = () => {
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
  };

  useEffect(() => {
    const p5 = require("p5");
    new p5(sketch, circuitsEl.current);
  }, []);

  return <div className={className} id="circuits" ref={circuitsEl}></div>;
};

Circuits.propTypes = {
  width: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
};

export default Circuits;
