import styles from './page.module.scss'
import AboutMe from './sections/AboutMe'
import Hero from './sections/Hero'
import Dribbble from './sections/Dribbble'

export default function Home() {
  return (
    <main className={styles.main}>
      <Hero scrollToId="one" />
      <AboutMe id="one" />
      <Dribbble showHeader />
    </main>
  )
}
