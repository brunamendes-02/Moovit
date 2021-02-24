import Head from 'next/head'

import { CompletedChalanges } from "../components/CompletedChalanges";
import { CountDown } from "../components/CountDown";
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";
import { ChalangeBox } from "../components/ChalangeBox";

import styles from '../styles/pages/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Início | Moveit</title>
      </Head>
      <ExperienceBar />
      <section>
        <div >
          <Profile />
          <CompletedChalanges />
          <CountDown />
        </div>
        <div>
          <ChalangeBox />
        </div>
      </section>
    </div>
  )
}
