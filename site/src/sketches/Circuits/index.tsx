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
  const p5InstanceRef = useRef<p5Type | null>(null);

  useEffect(() => {
    const sketch = (p: p5Type) => {
      const circuits: Circuit[] = [];

      p.setup = () => {
        p.createCanvas(width || p.windowWidth, height || p.windowHeight);
        p.background(GRAY_RGB);
        // Reduce frame rate for better performance
        p.frameRate(20);

        // Stop after 15 seconds for better performance
        setTimeout(() => {
          p.noLoop();
        }, 15000);
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

    const p5 = require("p5");
    p5InstanceRef.current = new p5(sketch, circuitsEl.current);

    // Cleanup on unmount or route change
    return () => {
      if (p5InstanceRef.current) {
        p5InstanceRef.current.remove();
        p5InstanceRef.current = null;
      }
    };
  }, [width, height]);

  return <div className={className} id="circuits" ref={circuitsEl}></div>;
};

Circuits.propTypes = {
  width: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
};

export default Circuits;
