import React from 'react'

import styles from "./styles.module.scss"

const TopNav = () => (
    <nav className={styles["top-nav"]}>
        <ul>
            <li><a href="/">home</a></li>
            <li><a href="/resume">resume</a></li>
        </ul>
    </nav>
)

export default TopNav