"use client"

import React, { useEffect } from 'react';

import Circuits from '../../sketches/Circuits';
import Bust from "../../assets/svgs/Bust";

import Byline from './Byline';
import styles from './styles.module.scss'

const Hero = ({scrollToId = "one"}) => {
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
          <a href={`#${scrollToId}`} className={styles["more"]}>Learn more</a>
        </div>
      </section>
    </>
  );
};

export default Hero;
