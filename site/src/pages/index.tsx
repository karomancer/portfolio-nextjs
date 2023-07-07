import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import axios from "axios";

import AboutMe from "../sections/AboutMe";
import Hero from "../sections/Hero";
import Dribbble from "../sections/Dribbble";
import { ShotType } from "@/sections/Dribbble/Shot";

interface Props {
  dribbbleShots: ShotType[];
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const res = await axios(
    `https://api.dribbble.com/v2/user/shots?access_token=${process.env.DRIBBBLE_ACCESS_TOKEN}`
  );

  if (res.status != 200) {
    throw new Error(`Failed to fetch Dribbble data: ${res.status}`);
  }

  return { props: { dribbbleShots: res.data } };
};

const Home = ({
  dribbbleShots,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <main>      
      <Hero scrollToId="one" />
      <AboutMe id="one" />
      <Dribbble shots={dribbbleShots} />
    </main>
  );
};

export default Home;
