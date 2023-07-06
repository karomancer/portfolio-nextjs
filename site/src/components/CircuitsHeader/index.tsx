import React from 'react';

import Circuits from '@/sketches/Circuits';

import styles from "./styles.module.scss"

interface Props {
  children: React.ReactNode;
}

const CircuitsHeader = ({ children }: Props) => (
  <div className={styles["circuits-hero"]}>
    <Circuits />
    <h1>{children}</h1>
  </div>
);

export default CircuitsHeader;
