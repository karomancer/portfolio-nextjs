import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import axios from "axios";

import Head from "@/components/Head"

import About from "@/sections/About";
import Hero from "@/sections/Hero";
import Dribbble from "@/sections/Dribbble";
import { DribbbleShot } from "@/sections/Dribbble/Shot";
import Medium, { MediumPost, getMediumPosts } from "@/sections/Medium";

interface Props {
  dribbbleShots: DribbbleShot[];
  mediumPosts: MediumPost[];
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const dribbbleData = await axios(
    `https://api.dribbble.com/v2/user/shots?access_token=${process.env.DRIBBBLE_ACCESS_TOKEN}`
  );
  
  if (dribbbleData.status != 200) {
    throw new Error(`Failed to fetch Dribbble data: ${dribbbleData.status}`);
  }
  
  const mediumData: MediumPost[] = await getMediumPosts() as MediumPost[];

  return { props: { dribbbleShots: dribbbleData.data, mediumPosts: mediumData } };
};

const Home = ({
  dribbbleShots,
  mediumPosts,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <main>
      <Head
        title="Karina Chow | Home"
        description="Screw the rules, I have green hair."
        ogUrl="/"
        ogImage="/images/og_image.png"
      />      
      <Hero scrollToId="one" />
      <About id="one" />
      <Dribbble shots={dribbbleShots} />
      <Medium mediumPosts={mediumPosts} />
    </main>
  );
};

export default Home;
