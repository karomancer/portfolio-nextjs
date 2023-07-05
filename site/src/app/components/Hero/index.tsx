"use client"

import React from 'react';

import Byline from './Byline';

// import Scroll from '../Scroll';

import Circuits from '../../sketches/Circuits';

import Bust from "../../assets/svgs/Bust";

import styles from './styles.module.scss'

const Hero = ({}) => {
  return (
    <>
      <Circuits className={styles["circuits"]} />
      <section id={styles["banner"]}>
        <div className="inner">
          <div className={styles["bust-container"]}>
            <Bust colorClasses={{
              "dark": styles.darkAnimation,
              "gray": styles.grayAnimation,
              "teal": styles.tealAnimation,
              "light": styles.lightAnimation,
              "white": styles.whiteAnimation,
            }} />
          </div>
          <div className={styles["title-and-byline"]}>
            <h1>karina chow</h1>
            <Byline className={styles["byline"]} />
          </div>
          {/* <Scroll type="id" element="one">
            <a href="#one" className="more">
              Learn More
            </a>
          </Scroll> */}
        </div>
      </section>
    </>
  );
};

export default Hero;
