"use client"

import styles from './page.module.css'
import AboutMe from './sections/AboutMe'

import Hero from './sections/Hero'

export default function Home() {
  return (
    <main className={styles.main}>
      <Hero scrollToId="one" />
      <AboutMe id="one" />
    </main>
  )
}
